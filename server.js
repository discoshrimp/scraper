var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
//scraping tools
var cheerio = require('cheerio')
var axios = require('axios')
//require database models
var db = require('./models')

var PORT = 3000

//initialize express
var app = express()


app.use(bodyParser.urlencoded({extended: true}))
//serves public server as a static directory
app.use(express.static('public'))

//connect to MongoDB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scrape")


//routes

//a get route for scraping the website

app.get('/scrape', function (req, res) {

	//use axios to grab body of html with request
	axios.get('https://coolmaterial.com').then(function (response) {

		//load response data into cheerio and save as $ for shorthand
		var $ = cheerio.load(response.data)

		$("article").each(function (i, element) {
			//empty result object to be populated by headlines
			var result = {}
			var currentArticle= $(this)
			//add text and href of every link, save as properties of result object

			result.title = $(this)
				.find('header')
				.text()
			result.link = $(this)
				.find('a.thumb-link')
				.attr("href")
			result.summary = $(this)
				.find('.post-content p')
				.text()

				console.log(result)
				//send data to the database
			db.Article.create(result)
				.then(function (dbArticle) {
					console.log(dbArticle)
				}).catch(function (err) {
					console.log(`ERROR: ${err}`)
					// return res.json(err)
				})
		})
		res.send(result)
		console.log(`scrape complete: ${result}`)
	})
})

//route articles from the db to front-end

app.get("/articles", function (req, res) {
	db.Article.find({})
		.then(function (dbArticle) {
			// console.log(`server /articles: ${dbArticle}`)
			res.send(dbArticle)
		}).catch(function (err) {
			res.send(err)
		})
})
app.post('/save', (req,res)=>{
	db.Article.findOneAndUpdate({title: req.body.title},{saved: true})
	.then( response=>{
		console.log(`article saved: ${response}`)
	}).catch(err=>{
		console.log(`server 81: ${err}`)
	})
})


app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
  });
  
