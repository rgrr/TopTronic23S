import serial
from datetime import datetime
import json

nowstamp = datetime.now().astimezone().isoformat(timespec="seconds")
with (
    serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=0.001, bytesize=serial.EIGHTBITS,
                  stopbits=serial.STOPBITS_ONE, parity=serial.PARITY_SPACE, 
                  xonxoff=False, rtscts=False, dsrdtr=False) as s
):
    prev_t = datetime.now()
    while True:
        data = s.read(100)
        if len(data) != 0:
            now_t = datetime.now()
            line = {"time": datetime.now().astimezone().isoformat(), 
                    "dt_ms": (now_t - prev_t).microseconds / 1000.0, 
                    "data": data.hex()}
            print(line)
            prev_t = now_t
