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
let socketApp = app.listen(3030)
app.listen(3000)
const io = socket(socketApp)
var udpPort = new osc.UDPPort({
    address: HOST,
    localAddress: HOST,
    localPort: PORT,
    metadata: true
})
//OSC UDP PORT
