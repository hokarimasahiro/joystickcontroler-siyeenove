radio.onReceivedString(function (receivedString) {
    serial.writeLine("" + radio.receivedPacket(RadioPacketProperty.SignalStrength) + ":" + receivedString)
    if (radio.receivedPacket(RadioPacketProperty.SignalStrength) >= -70) {
        受信文字 = receivedString.split(",")
        if (受信文字[0] == "CQ") {
            radio.sendString("" + 受信文字[1] + "," + control.deviceName() + "," + convertToText(無線グループ))
        }
    }
})
let V = 0
let Z = 0
let Y = 0
let X = 0
let 受信文字: string[] = []
let 無線グループ = 0
let TYPE = 0
pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
if (pins.digitalReadPin(DigitalPin.P16) == 0) {
    TYPE = 0
} else {
    TYPE = 1
}
無線グループ = Math.abs(control.deviceSerialNumber()) % 98 + 1
watchfont.showNumber2(無線グループ)
radio.setTransmitPower(7)
serial.redirectToUSB()
basic.forever(function () {
    radio.setGroup(無線グループ)
    X = pins.analogReadPin(AnalogReadWritePin.P1) * 1 - 512
    Y = pins.analogReadPin(AnalogReadWritePin.P2) * 1 - 512
    Z = input.rotation(Rotation.Roll) * 1
    V = input.rotation(Rotation.Pitch) * 1
    radio.sendString("$," + convertToText(X) + "," + convertToText(Y) + "," + convertToText(Z) + "," + convertToText(V))
    if (TYPE == 0) {
        if (pins.digitalReadPin(DigitalPin.P12) == 0) {
            radio.sendNumber(1)
        } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
            radio.sendNumber(2)
        } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
            radio.sendNumber(3)
        } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
            radio.sendNumber(4)
        } else if (pins.digitalReadPin(DigitalPin.P5) == 0) {
            radio.sendNumber(5)
        } else if (pins.digitalReadPin(DigitalPin.P11) == 0) {
            radio.sendNumber(6)
        } else {
            radio.sendNumber(0)
        }
    } else {
        if (pins.digitalReadPin(DigitalPin.P15) == 0) {
            radio.sendNumber(1)
        } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
            radio.sendNumber(2)
        } else if (pins.digitalReadPin(DigitalPin.P8) == 0) {
            radio.sendNumber(3)
        } else if (pins.digitalReadPin(DigitalPin.P12) == 0) {
            radio.sendNumber(4)
        } else if (pins.digitalReadPin(DigitalPin.P5) == 0) {
            radio.sendNumber(5)
        } else if (pins.digitalReadPin(DigitalPin.P11) == 0) {
            radio.sendNumber(6)
        } else {
            radio.sendNumber(0)
        }
    }
    radio.setGroup(0)
    basic.pause(50)
})
