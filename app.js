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
const PORT = 3000
const controller = require('./controller/controller')
const io = socket(app.use(controller).listen(PORT))
//OSC SERIAL PORT


console.log("HOST", HOST)
var udpPort = new osc.UDPPort({
    address: 'https://oscweb.herokuapp.com',
    localPort: 5000
})
udpPort.open()
udpPort.on("ready", function () {
    io.sockets.setMaxListeners(1)
    console.log("UDP Host:", HOST + ", Port:", udpPort.options.localPort)
})
udpPort.on("message", function (oscMessage) {
    console.log(oscMessage)
    io.emit('message', oscMessage)
})
udpPort.on("error", function (err) { console.log("ERROR ON PORT UDP: ", err) })
console.log("udpPort: ", udpPort)