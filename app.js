
'use strict'
require('dotenv').config()
const express = require('express')
const controller = require('./controller/controller')
//APP
const app = express()
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(controller).listen(3000)
