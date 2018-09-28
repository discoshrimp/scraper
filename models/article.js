const mongoose = require('mongoose')

//requires mongoose
const mongoose = require('mongoose')

//save a ref to schema constructor

const Schema = mongoose.Schema
//constructs a new schema for articles pulled from website

const articleSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	link:{
		type: String,
		requred: true
	},
	summary:{
		type: String,
		required: true
	}
})

//create a model from the schema
var Article = mongoose.model('Article', articleSchema)

//export Article model

module.exports = Article
