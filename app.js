'use strict'
require('dotenv').config()
var socket = require('socket.io')
const express = require('express')
const controller = require('./controller/controller')

//APP
const app  = express()
const HOST = process.env.HOST
const PORT = process.env.PORT || 5000
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(controller)
console.log(HOST,PORT)
const server = app.listen(PORT)
const io = socket(server)

var fp = require("find-free-port")
for(let i = 0; i < 50000; i++){
  fp(i).then(([freep]) => {
    console.log('found ' + freep)
}).catch((err)=>{
    console.error(err);
});
}


//OSC SERIAL PORTvar 
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