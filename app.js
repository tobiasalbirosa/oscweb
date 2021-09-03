'use strict'
require('dotenv').config()
var os = require("os")
var socket = require('socket.io')
const express = require('express')
const controller = require('./controller/controller')
//APP
const app  = express()
const TCPPORT =   process.env.PORT || 3000
//MONTAMOS UN PUERTO TCP PARA LOS USUARIOS WEB
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(controller)
console.log("THE PORT", TCPPORT)
//MONTAMOS UN PUERTO UDP PARA LOS MENSAJES OSC
const osc = require('osc')
const io = socket(app.listen(TCPPORT))
//getIPAddresses
io.on("/", (message) => {
  console.log("/: ",message)
})
io.on("connection", function (socket) {
  console.log("connection ",socket)
  socket.on("message", function (message) {
    console.log(message)
  })
})
io.on("disconnect", function (disconnect) {
  console.log("disconnect: ",disconnect)
})
io.on("connect", function (socket) {
  console.log("connected id: ",socket.id)
})
io.on('error',function(error) {
  console.log('error', error);
})