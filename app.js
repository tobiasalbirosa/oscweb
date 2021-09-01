'use strict'
require('dotenv').config()
var socket = require('socket.io')
var osc = require("osc")
const express = require('express')
//APP
const app = express()
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
const HOST = "192.168.0.13"
const PORT = process.env.PORT || 3000
const controller = require('./controller/controller')
const connection = app.use(controller).listen(PORT, HOST)
const io = socket(connection)
console.log("app:", app)
//OSC SERIAL PORT
var serialPort = new osc.SerialPort({
    devicePath:  "/message"
})
serialPort.on("message", function (oscMessage) { console.log(oscMessage) })
serialPort.open()
var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = []
        console.log("Interfaces",interfaces)
    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName]
        console.log("Addresses on get IP",addresses)
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i]
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address)
            }
        }
    }
    return ipAddresses
}
//UDP PORT
console.log("HOST",HOST)
var udpPort = new osc.UDPPort({
    address :  "oscweb.herokuapp.com",
    localPort : 6000
})
udpPort.open()
udpPort.on("ready", function () {
    io.sockets.setMaxListeners(1)
    var ipAddresses = getIPAddresses()
    console.log("Listening for OSC over UDP.")
    ipAddresses.forEach(function (address) {
        console.log("UDP Host:", address + ", Port:", udpPort.options.localPort)
    })
})
udpPort.on("message", function (oscMessage) {
    io.emit('message', oscMessage)
})
udpPort.on("error", function (err) { console.log("error ON PORT UDP: ",err) })
console.log("udpPort: ",udpPort)