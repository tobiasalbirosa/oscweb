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
const controller = require('./controller/controller')
const io = socket(server.use(controller).listen(5000))
//OSC SERIAL PORTvar 
udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
})
// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg)
    console.log("Remote info is: ", info)
})
// Open the socket.
udpPort.open()
