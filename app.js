const express = require('express')
const dgram = require('dgram')
const controller = require('./controller/controller')
const app = express()
app.engine('html', require('ejs').renderFile).set('view engine', 'html').use(controller).listen(5000)

/*
socket.on('listening', () => {
  let addr = socket.address();
  console.log(`Listening for UDP packets at ${addr.address}:${addr.port}`);
})
socket.on('error', (err) => {
  console.error(`UDP error: ${err.stack}`)
})
socket.on('message', (msg, rinfo) => {
  console.log('Recieved UDP message')
})
socket.bind(8082)     // listen for UDP with dgra
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
app.use(controller)
app.listen(3000)
let socketApp = app.listen(serv)

const io = socket(socketApp)
var udpPort = new osc.UDPPort({
    address: HOST,
    localAddress: HOST,
    localPort: PORT,
    metadata: true
})
//OSC UDP PORT
*/