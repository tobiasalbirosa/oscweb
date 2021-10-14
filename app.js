'use strict'
require('dotenv').config()
var socket = require('socket.io')
const express = require('express')
const controller = require('./controller/controller')
const app  = express()
const TCPPORT =   process.env.PORT || 3000
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(controller)
app.use("/public", express.static('./public/'))
const io = socket(app.listen(TCPPORT))
io.on("/", (message) => {
  console.log("/: ",message)
})
io.on("connection", function (socket) {
  console.log("connection ",socket)
  socket.on("message", function (message) {
   io.emit("message", message)
  })
})
io.on("disconnect", function (disconnect) {
  console.log("disconnect: ",disconnect)
})
io.on("connect", function (socket) {
  console.log("connected id: ",socket.id)
})
io.on('error',function(error) {
  console.log('error', error)
})