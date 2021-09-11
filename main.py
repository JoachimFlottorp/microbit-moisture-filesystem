"""
----------------------------
Microbit Moisture Sensor
MIT License
Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Required extension
Tinkercadmy
[https://github.com/Tinkertanker/pxt-tinkercademy-tinker-kit]
[https://makecode.microbit.org/pkg/Tinkertanker/pxt-tinkercademy-tinker-kit]
-----------------------------
Controls
[A] Start measuring moisture using the moisture meter
"""




from microbit import *

# Erklær en global array
moisture = [0.00]
moisture.clear()

def background_moisture() -> void:
    global moisture
    # Finn fuktigheten til sensoren
    measure = str(tinkercademy.moisture_sensor(AnalogPin.P0))
    # Skriv ut fuktighet til OLED og lar bare 6 tall gå igjennom, gjør det lettere å lese.
    OLED.write_string_new_line(measure[0:6])
    pass

def on_button_pressed_a() -> void:
    # Fjern instruksjoner.
    OLED.clear()
    basic.forever(background_moisture)

# Aktiver OLED
OLED.init(128, 64)

# Fjern buffer fra forrige bruk
OLED.clear()
# Skriv navnet og UUID til enheten
OLED.write_string_new_line(control.device_name() + " ")
OLED.write_num(control.device_serial_number())
OLED.write_string_new_line("")

# Skriv at systemet er klart, og instrukjsoner
OLED.write_string_new_line("Systemet er klart!")
OLED.write_string_new_line("Trykk A, for aa starte Sensor.")

# Sjekk om Fuktighet sensor er plugget inn.
if(tinkercademy.moisture_sensor(AnalogPin.P0) == 0):
    OLED.clear()
    OLED.write_string_new_line("Sensor er 0, har du husket å koble den til i PIN_0?")
    while True:
        led.plot(0, 0)
# Om den er plugget inn fortsetter vi koden
else:
    input.on_button_pressed(Button.A, on_button_pressed_a)