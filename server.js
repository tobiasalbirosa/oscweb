'use strict'
require('dotenv').config()
var socket = require('socket.io')
var osc = require("osc")
const express = require('express')
//SERVER
const server = express()
server.engine('html', require('ejs').renderFile)
server.set('view engine', 'html')
const HOST = process.env.HOST
const PORT = process.env.PORT

const controller = require('./controller/controller')
const io = socket(server.use(controller).listen(PORT))

console.log("SERVER", server)
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
    localAddress: "oscweb.herokuapp.com",
    localPort: 5000
})
udpPort.on("ready", function () {
    io.sockets.setMaxListeners(1)
    var ipAddresses = getIPAddresses();
    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log("UDP Host:", address + ", Port:", udpPort.options.localPort)
    })
})
udpPort.on("message", function (oscMessage) {
    io.emit('message', oscMessage)
})
udpPort.on("error", function (err) { console.log("error: ",err) })
console.log("udpPort: ",udpPort)
udpPort.open()
