"""
Receive and detect packets from TopTronic 23S
"""

import serial
from datetime import datetime
import json
import crc
import struct

packet_state = "wait-start"
packet = bytearray()
packet_prev = bytearray()
packet_len = 0
packet_cmd = 0

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

# Note: there seems to be some kind of parity on the line.  Not sure which one though
# 
with (
    serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=0.001, bytesize=serial.EIGHTBITS,
                  stopbits=serial.STOPBITS_ONE, parity=serial.PARITY_SPACE, 
                  xonxoff=False, rtscts=False, dsrdtr=False) as s
):
    prev_t = datetime.now()
    while True:
        data = s.read(100)
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
                        line = {"time": now_t.astimezone().isoformat(), 
                                "dt_ms": int(10000 * (now_t - prev_t).total_seconds()) / 10.0,
                                "addr1": packet[1],
                                "addr2": packet[2],
                                "cmd": packet_cmd,
                                "len": packet_len,
                                "data": packet[5:-2].hex(),
                                "crc": calcsum}
                        print(line)
                        prev_t = now_t
                        packet_prev = packet
