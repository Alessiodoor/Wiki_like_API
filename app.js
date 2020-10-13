const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useUnifiedTopology: true, useNewUrlParser: true});

const articleSchema = {
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
}

const Article = mongoose.model("Article", articleSchema);

// API for all articles

app.route("/articles")
	.get(function(req, res) {
		Article.find({}, function(err, articles) {
			if(!err){
				res.send(articles);
			}else{
				res.send(err);
			}
		})
	})
	.post(function(req, res) {
		const newArticle = new Article({
			title: req.body.title,
			content: req.body.content
		});

		newArticle.save(function(err) {
			if(err){
				res.send(err);
			}else {
				res.send("Successfully added");
			}
		});
	})
	.delete(function(req, res) {
		Article.deleteMany({}, function(err) {
			if(err){
				res.send(err);
			}else {
				res.send("Successfully deleted")
			}
		});
	});

// API for specific article

app.route("/articles/:articleTitle")
	.get(function(req, res) {
		Article.findOne({title: req.params.articleTitle}, function(err, article) {
			if(!err){
				res.send(article);
			}else {
				res.send(err);
			}
		});
	})
	.put(function(req, res) {
		Article.update(
			{title: req.params.articleTitle}, 
			{title: req.body.title, content: req.body.content}, 
			{overwrite: true}, 
			function(err, result) {
				if(!err){
					res.send("Successfully updated");
				}else {
					res.send(err);
				}
		});	
	})
	.patch(function(req, res) {
		Article.updateOne(
			{title: req.params.articleTitle}, 
			{$set: req.body}, 
			function(err, result) {
				if(!err){
					res.send("Successfully updated");
				}else {
					res.send(err);
				}
		});	
	})
	.delete(function(req, res) {
		Article.deleteOne({title: req.params.articleTitle}, function(err, result) {
			if(err){
				res.send(err);
			}else {
				res.send(result);
			}
		});
	});

const port = 3000;

app.listen(port, function() {
	console.log('Running...')
})