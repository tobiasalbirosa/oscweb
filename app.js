'use strict'
require('dotenv').config()
var socket = require('socket.io')
var osc = require("osc")
const express = require('express')
const controller = require('./controller/controller')
var HOST = 'oscweb.herokuapp.com'
var PORT = 3000 
const dgram = require('dgram');

const udpServer = dgram.createSocket('udp4');

udpServer.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udpServer.close();
});
udpServer.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udpServer.bind(5000);

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
