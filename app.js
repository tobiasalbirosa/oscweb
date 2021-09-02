
'use strict'
require('dotenv').config()
var socket = require('socket.io')
var osc = require("osc")
const dgram = require('dgram');
const UDPSocket = dgram.createSocket('udp4');
const express = require('express')
const controller = require('./controller/controller')
//APP
const app = express()
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(controller).listen(3000)
