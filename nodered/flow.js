[
    {
        "id": "4c02c71da8a715b0",
        "type": "tab",
        "label": "Därstetten",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "5e07258da65a2702",
        "type": "ui_chart",
        "z": "4c02c71da8a715b0",
        "name": "Chart Außentemperatur",
        "group": "2f2748c54f2293d6",
        "order": 2,
        "width": "16",
        "height": "4",
        "label": "Außentemperatur [°C]",
        "chartType": "line",
        "legend": "false",
        "xformat": "dd HH:mm",
        "interpolate": "linear",
        "nodata": "",
        "dot": false,
        "ymin": "",
        "ymax": "",
        "removeOlder": "48",
        "removeOlderPoints": "4000",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 750,
        "y": 280,
        "wires": [
            []
        ]
    },
    {
        "id": "0ca119658195eb3e",
        "type": "mqtt in",
        "z": "4c02c71da8a715b0",
        "name": "",
        "topic": "ds/temp-out",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "70b043ec.cc0754",
        "nl": false,
        "rap": false,
        "inputs": 0,
        "x": 170,
        "y": 280,
        "wires": [
            [
                "4d3fe02e952d4908"
            ]
        ]
    },
    {
        "id": "a5417c42dfbf6e2f",
        "type": "delay",
        "z": "4c02c71da8a715b0",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "120",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": true,
        "allowrate": false,
        "outputs": 1,
        "x": 520,
        "y": 280,
        "wires": [
            [
                "5e07258da65a2702"
            ]
        ]
    },
    {
        "id": "e8379814698b425f",
        "type": "ui_chart",
        "z": "4c02c71da8a715b0",
        "name": "Chart Kesseltemperatur",
        "group": "2f2748c54f2293d6",
        "order": 3,
        "width": "16",
        "height": "4",
        "label": "Kesseltemperatur [°C]",
        "chartType": "line",
        "legend": "false",
        "xformat": "dd HH:mm",
        "interpolate": "linear",
        "nodata": "",
        "dot": false,
        "ymin": "",
        "ymax": "",
        "removeOlder": "48",
        "removeOlderPoints": "4000",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#1f77b4",
            "#e01b24",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 750,
        "y": 480,
        "wires": [
            []
        ]
    },
    {
        "id": "960e874669c64a4b",
        "type": "mqtt in",
        "z": "4c02c71da8a715b0",
        "name": "",
        "topic": "ds/temp-kessel",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "70b043ec.cc0754",
        "nl": false,
        "rap": false,
        "inputs": 0,
        "x": 180,
        "y": 400,
        "wires": [
            [
                "abcc5641d65855f0",
                "726bd617212111b9"
            ]
        ]
    },
    {
        "id": "abcc5641d65855f0",
        "type": "delay",
        "z": "4c02c71da8a715b0",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "120",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": true,
        "allowrate": false,
        "outputs": 1,
        "x": 460,
        "y": 440,
        "wires": [
            [
                "e8379814698b425f"
            ]
        ]
    },
    {
        "id": "c09dd78e0abb3e14",
        "type": "mqtt in",
        "z": "4c02c71da8a715b0",
        "name": "",
        "topic": "ds/tempx",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "70b043ec.cc0754",
        "nl": false,
        "rap": false,
        "inputs": 0,
        "x": 160,
        "y": 480,
        "wires": [
            [
                "627f3de99eb68099"
            ]
        ]
    },
    {
        "id": "627f3de99eb68099",
        "type": "delay",
        "z": "4c02c71da8a715b0",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "120",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": true,
        "allowrate": false,
        "outputs": 1,
        "x": 460,
        "y": 480,
        "wires": [
            [
                "e8379814698b425f"
            ]
        ]
    },
    {
        "id": "496a4d89d09b96b7",
        "type": "mqtt in",
        "z": "4c02c71da8a715b0",
        "name": "",
        "topic": "ds/cmd4-changed",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "70b043ec.cc0754",
        "nl": false,
        "rap": false,
        "inputs": 0,
        "x": 190,
        "y": 580,
        "wires": [
            [
                "3dc2ed0e93a23c16"
            ]
        ]
    },
    {
        "id": "3dc2ed0e93a23c16",
        "type": "ui_text",
        "z": "4c02c71da8a715b0",
        "group": "2f2748c54f2293d6",
        "order": 6,
        "width": "16",
        "height": "2",
        "name": "cmd4-change",
        "label": "cmd4 unbekannte Änderung:",
        "format": "{{msg.payload}}",
        "layout": "row-left",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 720,
        "y": 580,
        "wires": []
    },
    {
        "id": "dc60c441e1d498bc",
        "type": "mqtt in",
        "z": "4c02c71da8a715b0",
        "name": "",
        "topic": "ds/cmd-unknown",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "70b043ec.cc0754",
        "nl": false,
        "rap": false,
        "inputs": 0,
        "x": 180,
        "y": 660,
        "wires": [
            [
                "bb9bb4e03df9fa9d"
            ]
        ]
    },
    {
        "id": "bb9bb4e03df9fa9d",
        "type": "ui_text",
        "z": "4c02c71da8a715b0",
        "group": "2f2748c54f2293d6",
        "order": 7,
        "width": "16",
        "height": "2",
        "name": "cmd-unknown",
        "label": "Unbekanntes cmd:",
        "format": "{{msg.payload}}",
        "layout": "row-left",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 720,
        "y": 660,
        "wires": []
    },
    {
        "id": "e8adcda07ee5c5de",
        "type": "mqtt in",
        "z": "4c02c71da8a715b0",
        "name": "",
        "topic": "ds/datetime",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "70b043ec.cc0754",
        "nl": false,
        "rap": false,
        "inputs": 0,
        "x": 170,
        "y": 740,
        "wires": [
            [
                "79a94e7f52283fd8"
            ]
        ]
    },
    {
        "id": "79a94e7f52283fd8",
        "type": "ui_text",
        "z": "4c02c71da8a715b0",
        "group": "2f2748c54f2293d6",
        "order": 1,
        "width": "16",
        "height": "1",
        "name": "datetime",
        "label": "Uhrzeit:",
        "format": "{{msg.payload}}",
        "layout": "row-right",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 700,
        "y": 740,
        "wires": []
    },
    {
        "id": "fd278fdd7b5c8bc3",
        "type": "ui_chart",
        "z": "4c02c71da8a715b0",
        "name": "Brenndauer",
        "group": "2f2748c54f2293d6",
        "order": 4,
        "width": "16",
        "height": "5",
        "label": "Brenndauer [%(t)]",
        "chartType": "line",
        "legend": "false",
        "xformat": "dd HH:mm",
        "interpolate": "linear",
        "nodata": "",
        "dot": false,
        "ymin": "0",
        "ymax": "40",
        "removeOlder": "48",
        "removeOlderPoints": "4000",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 710,
        "y": 360,
        "wires": [
            []
        ]
    },
    {
        "id": "3876b839a87b172c",
        "type": "debug",
        "z": "4c02c71da8a715b0",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 700,
        "y": 160,
        "wires": []
    },
    {
        "id": "726bd617212111b9",
        "type": "function",
        "z": "4c02c71da8a715b0",
        "name": "sumup heater time",
        "func": "// Sum up heater times.  Heating is detected via\n// increasing temperature.  Heating time is reset\n// on midnight.\n//\n// The function has four outputs\n// - daily heating time in minutes (every ~60s)\n// - 5 * hourly heating time in minutes (every ~60s)\n// - daily heating time in minutes once a day\n// - 5 * hourly heating time in minutes once an hour\n//\n// times are in local epoch seconds\nvar now = new Date();\nvar curr_time = Math.floor(Date.now() / 1000 - 60 * now.getTimezoneOffset());\nvar curr_temp = msg.payload;\nvar prev_time = flow.get(\"heater_prev_time\");\nvar prev_temp = flow.get(\"heater_prev_temp\");\nvar heater_daily_sum = flow.get(\"heater_daily_sum\");\nvar heater_hourly_sum = flow.get(\"heater_hourly_sum\");\nvar heater_cnt = flow.get(\"heater_cnt\");\n\n// heuristic for detection of increasing heater temperature\nif (curr_temp == prev_temp) {\n    heater_cnt = Math.max(0, heater_cnt - 1);\n}\nelse if (curr_temp > prev_temp) {\n    heater_cnt = Math.max(1, heater_cnt + 1);\n    heater_cnt = Math.min(8, heater_cnt);\n}\nelse {\n    heater_cnt = -1;\n}\nflow.set(\"heater_cnt\", heater_cnt);\n\nif (heater_cnt >= 2) {\n    heater_daily_sum += curr_time - prev_time;\n    flow.set(\"heater_daily_sum\", heater_daily_sum);    \n    heater_hourly_sum += curr_time - prev_time;\n    flow.set(\"heater_hourly_sum\", heater_hourly_sum);\n}\nflow.set(\"heater_prev_time\", curr_time);\nflow.set(\"heater_prev_temp\", curr_temp);\n\n// build result\nvar msg1 = null;\nvar msg2 = null\nif (curr_time % 60 < prev_time % 60) {\n    msg1 = { topic:\"heater_daily_sum_percent\", payload:Math.round((heater_daily_sum / 60) * (100 / 144)) / 10 };\n    msg2 = { topic:\"heater_hourly_sum_percent\", payload:Math.round((heater_hourly_sum / 60) * (100 / 6)) / 10 };\n    node.warn(\"sum_s:\" + heater_daily_sum + \"  hourly_sum:\" + msg2.payload.toFixed(1) + \"  daily_sum:\" + msg1.payload.toFixed(1));\n}\nvar msg3 = null;\nif (curr_time % 86400 < prev_time % 86400) {\n    msg3 = { topic:\"heater_daily_sum_percent_once\", payload:msg1.payload };\n    flow.set(\"heater_daily_sum\", 0);\n}\nvar msg4 = null;\n// debugging\nif (curr_time % 3600 < prev_time % 3600) {\n    msg4 = { topic:\"heater_hourly_sum_percent_once\", payload:msg2.payload };\n    flow.set(\"heater_hourly_sum\", 0);\n}\n\n// debugging\nnode.warn(\"T:\" + curr_temp.toFixed(1) + \"  dT:\" + (curr_temp - prev_temp).toFixed(1) + \"  cnt:\" + heater_cnt + \"  sum_s:\" + heater_daily_sum + \" \" + heater_hourly_sum);\n\nreturn [msg1, msg2, msg3, msg4];\n",
        "outputs": 4,
        "timeout": 0,
        "noerr": 0,
        "initialize": "if (flow.get(\"heater_daily_sum\") == null) {\n    flow.set(\"heater_daily_sum\", 0);\n    flow.set(\"heater_hourly_sum\", 0);\n    flow.set(\"heater_prev_time\", 0);\n    flow.set(\"heater_prev_temp\", 1000);\n    flow.set(\"heater_cnt\", 0);\n}\n",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 380,
        "wires": [
            [
                "fd278fdd7b5c8bc3"
            ],
            [
                "fd278fdd7b5c8bc3"
            ],
            [
                "d7d2b0c12b0433ce"
            ],
            [
                "d7d2b0c12b0433ce"
            ]
        ]
    },
    {
        "id": "4d3fe02e952d4908",
        "type": "smooth",
        "z": "4c02c71da8a715b0",
        "name": "",
        "property": "payload",
        "action": "mean",
        "count": "20",
        "round": "",
        "mult": "single",
        "reduce": false,
        "x": 340,
        "y": 280,
        "wires": [
            [
                "a5417c42dfbf6e2f"
            ]
        ]
    },
    {
        "id": "d7d2b0c12b0433ce",
        "type": "ui_chart",
        "z": "4c02c71da8a715b0",
        "name": "Brenndauer longterm",
        "group": "2f2748c54f2293d6",
        "order": 5,
        "width": "16",
        "height": "4",
        "label": "Langzeitbrenndauer [%(t)]",
        "chartType": "line",
        "legend": "false",
        "xformat": "YYYY-MM-DD HH:mm",
        "interpolate": "linear",
        "nodata": "",
        "dot": true,
        "ymin": "0",
        "ymax": "40",
        "removeOlder": "100",
        "removeOlderPoints": "4000",
        "removeOlderUnit": "604800",
        "cutout": 0,
        "useOneColor": false,
        "useUTC": false,
        "colors": [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "outputs": 1,
        "useDifferentColor": false,
        "className": "",
        "x": 740,
        "y": 400,
        "wires": [
            []
        ]
    },
    {
        "id": "2f2748c54f2293d6",
        "type": "ui_group",
        "name": "Group 1",
        "tab": "aeb18b5b9a91f1e8",
        "order": 1,
        "disp": false,
        "width": "16",
        "collapse": false,
        "className": ""
    },
    {
        "id": "70b043ec.cc0754",
        "type": "mqtt-broker",
        "broker": "127.0.0.1",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": false,
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "online",
        "birthQos": "1",
        "birthRetain": "true",
        "birthPayload": "1",
        "willTopic": "online",
        "willQos": "0",
        "willRetain": "true",
        "willPayload": "0"
    },
    {
        "id": "aeb18b5b9a91f1e8",
        "type": "ui_tab",
        "name": "Därstetten",
        "icon": "dashboard",
        "order": 5,
        "disabled": false,
        "hidden": false
    }
]