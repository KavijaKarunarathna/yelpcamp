var express = require("express");
var router = express.Router();
var campground 	= require("../models/campground");

router.get("/campgrounds", function(req, res){	
	campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds})
		}
	});
})

router.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
})

router.post("/campgrounds", function(req, res){	
	campground.create(
	{
		name: req.body.name,
	 	image: req.body.image,
	 	description: req.body.description 
	},
	function(err , campground){
		if (err){
			res.redirect("campgrounds/new");
		}
		else {
			res.redirect("/campgrounds")
		}
	})	
})

router.get("/campgrounds/:id", function(req, res){
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err){
			console.log(err);
		} else {
			console.log(foundCampground.comments);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})
	
})

module.exports = router;