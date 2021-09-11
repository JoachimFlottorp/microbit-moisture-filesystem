/** 
----------------------------
# Microbit Moisture Sensor
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
Bluetooth
-----------------------------
## Controls
[A] Start measuring moisture using the moisture meter

## Bluetooth
Data can be sent over to a bluetooth uart supported device such as a your phone. for easier reading and so on.

 */
//  Erklær en global array
let moisture = [0.00]
_py.py_array_clear(moisture)
let bluetoothIsConnected = false
function init() {
    //  Aktiver OLED
    OLED.init(128, 64)
    //  Aktiver Blåtann.
    bluetooth.startUartService()
    bluetooth.onBluetoothConnected(function on_bluetooth_connected() {
        
        led.plot(0, 0)
        bluetoothIsConnected = true
        
    })
    bluetooth.onBluetoothDisconnected(function on_bluetooth_disconnected() {
        
        bluetoothIsConnected = false
        
    })
    //  Fjern buffer fra forrige bruk
    OLED.clear()
    //  Skriv navnet og UUID til enheten
    OLED.writeStringNewLine(control.deviceName() + " ")
    OLED.writeNum(control.deviceSerialNumber())
    OLED.writeStringNewLine("")
    //  Skriv at systemet er klart, og instrukjsoner
    OLED.writeStringNewLine("Systemet er klart!")
    OLED.writeStringNewLine("Trykk A, for aa starte Sensor.")
    //  Sjekk om Fuktighet sensor er plugget inn.
    if (tinkercademy.MoistureSensor(AnalogPin.P0) == 0) {
        OLED.clear()
        OLED.writeStringNewLine("Sensor er 0, har du husket å koble den til i PIN_0?")
        while (true) {
            led.plot(0, 0)
        }
    } else {
        //  Om den er plugget inn fortsetter vi koden
        input.onButtonPressed(Button.A, function on_button_pressed_a() {
            //  Fjern instruksjoner.
            OLED.clear()
            basic.forever(function background_moisture() {
                let measure: string;
                
                
                //  Finn fuktigheten til sensoren
                measure = "" + tinkercademy.MoistureSensor(AnalogPin.P0)
                //  Skriv ut fuktighet til OLED og lar bare 6 tall gå igjennom, gjør det lettere å lese.
                OLED.writeStringNewLine(measure.slice(0, 6))
                if (bluetoothIsConnected) {
                    bluetooth.uartWriteLine(measure.slice(0, 6))
                }
                
                
            })
        })
    }
    
}

init()
