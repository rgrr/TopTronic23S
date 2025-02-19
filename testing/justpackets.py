"""
Receive and detect packets from TopTronic 23S
"""

import serial
from datetime import datetime
import json
import crc
import struct
import sys
import paho.mqtt.client as mqtt
import signal
import functools


mqttc = None

# always flush immediately
print = functools.partial(print, flush=True)



def ignoreHandler(signum = None, frame = None):
    pass



def signalHandler(signum = None, frame = None):
    print('Signal handler called with signal ' + str(signum))
    mqttc.disconnect()
    print('Deamon stop')
    sys.exit(0)



# ready for command line parameters
g_mask = True
g_print_time = False
g_if = "/dev/ttyUSB0"
g_if_parity = serial.PARITY_SPACE     # Note: there seems to be some kind of parity on the line.  Not sure which one though
g_mqtt_server = "127.0.0.1:1883"
g_mqtt_topic = "ds"
g_show_unknown = True
g_show_changed_only = True

packet_state = "wait-start"
packet = bytearray()
packet_prev = bytearray()
packet_len = 0
packet_cmd = 0
data_prev = ""

crccalc = crc.Calculator(
    crc.Configuration(
        width=16,
        polynomial=0x1021,
        init_value=0x0000,
        final_xor_value=0x0000,
        reverse_input=True,
        reverse_output=True,
    )
)

signal.signal(signal.SIGPIPE, ignoreHandler)
for sig in [signal.SIGTERM, signal.SIGINT, signal.SIGHUP, signal.SIGQUIT]:
    signal.signal(sig, signalHandler)

if g_mqtt_server != "":
    try:
        mqtt_server = (g_mqtt_server + ":1883").split(":")
        mqttc = mqtt.Client()
        mqttc.connect(mqtt_server[0], int(mqtt_server[1]))
        mqttc.loop_start()
    except Exception as e:
        print("   mqtt exception: %s" % e)
        sys.exit(2)
else:
    mqttc = None

with (
    serial.Serial(g_if, baudrate=9600, timeout=0.001, bytesize=serial.EIGHTBITS,
                  stopbits=serial.STOPBITS_ONE, parity=g_if_parity, 
                  xonxoff=False, rtscts=False, dsrdtr=False) as s
):
    prev_t = datetime.now()
    while True:
        try:
            data = s.read(100)
        except Exception as e:
            print("   Exception reading data: %s" % e)
            data = b""

        for b in data:
            if packet_state == 'wait-start':
                if b == 0x82:
                    packet = bytearray()
                    packet.append(b)
                    packet_state = "wait-addr1"
            elif packet_state == 'wait-addr1':
                packet.append(b)
                packet_state = "wait-addr2"
            elif packet_state == 'wait-addr2':
                packet.append(b)
                packet_state = "wait-len"
            elif packet_state == "wait-len":
                packet.append(b)
                packet_len = b
                packet_state = "wait-cmd"
            elif packet_state == "wait-cmd":
                packet.append(b)
                packet_cmd = b
                if packet_len == 0:
                    packet_state = "wait-crc1"
                else:
                    packet_state = "wait-data"
                packet_cnt = 0
            elif packet_state == "wait-data":
                packet.append(b)
                packet_cnt += 1
                if packet_cnt >= packet_len:
                    packet_state = "wait-crc1"
            elif packet_state == "wait-crc1":
                packet.append(b)
                packet_state = "wait-crc2"
            elif packet_state == "wait-crc2":
                packet.append(b)
                packet_state = "wait-start"
            
                if packet != packet_prev:
                    (checksum,) = struct.unpack("<H", packet[-2:])
                    calcsum = crccalc.checksum(packet[1:-2])

                    if checksum == calcsum:
                        now_t = datetime.now()
                        data = packet[5:-2].hex()
                        line = {"time": now_t.astimezone().isoformat(), 
                                # "dt_ms": int(10000 * (now_t - prev_t).total_seconds()) / 10.0,
                                "addr1": packet[1],
                                "addr2": packet[2],
                                "cmd": packet_cmd,
                                "len": packet_len,
                                "data": data,
                                "crc": calcsum}
                        
                        if packet_cmd == 4:
                            #
                            # current state
                            #
                            try:
                                # outised temperature
                                t = packet[5] / 2.0 - 52.0
                                line["temp-out"] = t
                                if mqttc is not None:
                                    mqttc.publish("%s/%s" % (g_mqtt_topic, "temp-out"), t, qos=0)
                                if g_mask:
                                    data = "__" + data[2:]
                                
                                # unknown temperature (Rücklauf I?)
                                t = packet[11] / 2.0
                                line["tempy"] = t
                                if mqttc is not None:
                                    mqttc.publish("%s/%s" % (g_mqtt_topic, "tempy"), t, qos=0)
                                if g_mask:
                                    data = data[:12] + "__" + data[14:]

                                # unknown temperature (Rücklauf II?), seems to be the same value as Rücklauf I
                                t = packet[20] / 2.0
                                line["tempx"] = t
                                if mqttc is not None:
                                    mqttc.publish("%s/%s" % (g_mqtt_topic, "tempx"), t, qos=0)
                                if g_mask:
                                    data = data[:30] + "__" + data[32:]

                                # kessel(?) temperature
                                t = packet[35] / 2.0
                                line["temp-kessel"] = t
                                if mqttc is not None:
                                    mqttc.publish("%s/%s" % (g_mqtt_topic, "temp-kessel"), t, qos=0)
                                if g_mask:
                                    data = data[:60] + "__" + data[62:]
                                
                                if not g_show_unknown:
                                    #
                                    # all of this happens, if temp-kessel goes up until ~85°C
                                    # unknown: values seen are 0x00, 0x02, 0xff
                                    if g_mask:
                                        data = data[:4] + ".." + data[6:]

                                    # unknown: values seen are 0x00, 0x10
                                    if g_mask:
                                        data = data[:6] + ".." + data[8:]

                                line["data"] = data
                                if g_mask  and  data != data_prev:
                                    if data_prev != ""  or  g_show_changed_only:    # show also start line if g_show_changed_only
                                        line["changed"] = 1
                                        if mqttc is not None:
                                            mqttc.publish("%s/%s" % (g_mqtt_topic, "cmd4-changed"), str(line), qos=0)
                                    data_prev = data

                                if "changed" in line  or  not g_show_changed_only:
                                    print(line)
                                    prev_t = now_t
                            except Exception as e:
                                print("   Exception with cmd4: %s" % e)
                        elif packet_cmd == 5:
                            #
                            # time packet, ignore
                            #
                            try:
                                if g_print_time:
                                    print(line)
                                    prev_t = now_t
                                if mqttc is not None:
                                    datetime_s = f"{data[10:14]}-{data[16:18]}-{data[8:10]} {data[6:8]}:{data[4:6]}:{data[2:4]}"
                                    mqttc.publish("%s/%s" % (g_mqtt_topic, "datetime"), datetime_s, qos=0)
                            except Exception as e:
                                print("   Exception with cmd5: %s" % e)
                        else:
                            #
                            # unknown packet
                            #
                            try:
                                if mqttc is not None:
                                    mqttc.publish("%s/%s" % (g_mqtt_topic, "cmd-unknown"), str(line), qos=0)
                                line["unknown"] = 1
                                print(line)
                                prev_t = now_t
                            except Exception as e:
                                print("   Exception with cmd-unknown: %s" % e)

                        packet_prev = packet

