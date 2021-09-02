'use strict'
require('dotenv').config()
var os = require("os")
var socket = require('socket.io')
const express = require('express')
const controller = require('./controller/controller')
//APP
const app  = express()
const HOST = process.env.HOST
const TCPPORT =   process.env.PORT || 3000
const UDPPORT = 5000

//MONTAMOS UN PUERTO TCP PARA LOS USUARIOS WEB
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(controller)

//MONTAMOS UN PUERTO UDP PARA LOS MENSAJES OSC
const osc = require('osc')
const { pbkdf2Sync } = require('crypto')
const io = socket(app.listen(3000))
//getIPAddresses

const UDPPort = new osc.UDPPort ({
  socket : io
})
console.log(UDPPort)
io.on("message", function (message) {
  console.log("message: ",message)
})
io.on("connect", function (socket) {
  console.log("connected id: ",socket.id)
})
io.on('error',function(error) {
  console.log('error', error);
})
//OSC SERIAL PORTvar 
/*
io.on("connect", function (socket) {
    console.log("connected id: ",socket.id)
})
io.on('message',function(socket) {
    console.log('message', socket.name);

  })
  io.on('error',function(error) {
    console.log('error', error);

  })
io.on('connection',function(socket) {
    console.log('made socket connection', socket.name);
    socket.on('error', (error) => { 
        console.log("error: ",error)

    })
    socket.on('message', (message) => { 
        console.log("message: ",message)

    })
  })
  */