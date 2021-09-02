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
app.listen(TCPPORT)
//MONTAMOS UN PUERTO UDP PARA LOS MENSAJES OSC
const osc = require('osc')
const io = socket(app.listen(30,"::1"))
//getIPAddresses
var getIPAddresses = function () {
     let interfaces = os.networkInterfaces(),
      ipAddresses = []
  for (var deviceName in interfaces) {
      var addresses = interfaces[deviceName]
      console.log(addresses)
      console.log(addresses.length)
      for (var i = 0; i < addresses.length; i++) {
          var addressInfo = addresses[i]
          ipAddresses.push(addressInfo.address) 
      }
  }
}


getIPAddresses()

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