'use strict'
require('dotenv').config()
var socket = require('socket.io')
var osc = require("osc")
const express = require('express')
const controller = require('./controller/controller')
var HOST = 'oscweb.herokuapp.com'
var PORT = 3000 
//APP
const app = express()
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
let socketApp = app.listen(PORT)
app.use(controller)
console.log(" PORT: ", PORT)
const io = socket(socketApp)
//OSC UDP PORT
var udpPort = new osc.UDPPort({
    localAddress: HOST,
    address: HOST,
    localPort: 3030,
    metadata: true
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