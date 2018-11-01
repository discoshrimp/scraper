//requires mongoose
const mongoose = require('mongoose')

//save a ref to schema constructor

const Schema = mongoose.Schema
//constructs a new schema for articles pulled from website

const ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},

	link: {
		type: String,
		requred: true
	},

	summary: {
		type: String,
		required: true
	},
	saved: {
		type: Boolean,
		default: false
	}
})

//create a model from the schema
var Article = mongoose.model('Article', ArticleSchema)

//export Article model

module.exports = Article
