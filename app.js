'use strict'
require('dotenv').config()
var socket = require('socket.io')
var osc = require("osc")
const express = require('express')
//APP
const app = express()
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(controller).listen(3000)
