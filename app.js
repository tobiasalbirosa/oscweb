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
const serv = app.listen(3000)
let socketApp = app.listen(serv)

const io = socket(socketApp)
var udpPort = new osc.UDPPort({
    address: HOST,
    localAddress: HOST,
    localPort: PORT,
    metadata: true
})
//OSC UDP PORT
