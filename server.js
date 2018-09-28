const express = require('express')
var expbhs = require('handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cheerio = require('cheerio')
const axios = require('axios')
//require database models
const db = require("./models")
const PORT = 3300

//initialize express
const app = express()

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view-engine','handlebars')

//connect to MongoDB
mongoose.connect("mongodb://localhost/arbysScraper",{useNewUrlParser: true});


//routes

//a get route for scraping the website

app.get('/scrape', function(req, ers){

	//use axios to grab body of html with request
	axios.get('https://arbys.com/press-center/news').then(function(response){
		const $ = cheerio.load(response.data)

		$("li").each(function(i, element){
			//empty result object to be populated by headlines
			const result = {}
			
			//add text and href of every link, save as properties of result object

			result.title = $(this)
			.children('a')
			.text()
			result.link = $(this)
			.children('a')
			.attr("href")

			db.article.create(result)
			.then(function(dbArticle){
				console.log(dbArticle)
			}).catch(function(err){
				return res.json(err)
			})
		})
		res.send("Scrape Complete")
		console.log(`result: ${result}`)
	})
})

//route articles from the db to front-end

app.get("/articles", function(req, res){
	db.article.find({})
	.then(function(dbArticle){
		res.json(dbArticle)
	}).catch(function(err){
		res.json(err)
	})
})
