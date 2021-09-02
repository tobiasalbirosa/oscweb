'use strict'
require('dotenv').config()
var socket = require('socket.io')
var osc = require("osc")
const express = require('express')
//APP
const app = express()
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
const HOST = process.env.HOST
const PORT = process.env.PORT || 3000
const controller = require('./controller/controller')
const io = socket(app.use(controller).listen(PORT))
//OSC SERIAL PORT

var UDPPort = new osc.UDPPort({
    localAddress: HOST,
    localPort: 5000,
    metadata: true
})
UDPPort.on("message", function (oscMessage) { console.log(oscMessage) })
UDPPort.open()

var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = []
    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName]
        console.log(addresses)
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
console.log("HOST", HOST)
var udpPort = new osc.UDPPort({
    address: HOST,
    localPort: PORT
})

udpPort.open()
udpPort.on("ready", function () {
    io.sockets.setMaxListeners(1)
    var ipAddresses = getIPAddresses()
    ipAddresses.forEach(function (address) {
        console.log("UDP Host:", address + ", Port:", udpPort.options.localPort)
    })
})
udpPort.on("message", function (oscMessage) {
    io.emit('message', oscMessage)
})
udpPort.on("error", function (err) { console.log("ERROR ON PORT UDP: ", err) })
console.log("udpPort: ", udpPort)