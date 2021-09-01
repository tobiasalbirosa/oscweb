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
const path = require('path')
const connection = app.use(controller).listen(3000)
const io = socket(connection)
console.log("Connectado:", HOST, ':', PORT)
//OSC SERIAL PORT

var SerialPort = require("serialport");


//var virtualSerialPort = new SerialPort("message")

virtualSerialPort.on("open", function () {
    console.log("-- Connection opened --");
   
    virtualSerialPort.on("data", function (data) {
        console.log("Data received: " + data);
    })
})



var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = []
    //   console.log("Interfaces",interfaces)
    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName]
        //     console.log("Addresses on get IP",addresses)
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i]

            if (addressInfo.family === "eth0" && !addressInfo.internal) {
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
    localPort: 5000
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