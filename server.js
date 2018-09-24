const express = require('express')
var expbhs = require('handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cheerio = require('cheerio')
//require database models
const db =require("./models")
const PORT = 3300

//initialize express
const app = express()

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view-engine','handlebars')

