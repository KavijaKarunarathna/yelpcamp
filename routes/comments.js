var express = require("express");
var router = express.Router();
var campground 	= require("../models/campground");
var Comment 	= require("../models/comments");

router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
	campground.findById(req.params.id, function(err, foundCampground) {
		if (err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: foundCampground})
		}
	});
})

router.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
	campground.findById(req.params.id, function(err, foundCampground) {
		if (err){
			console.log(err)
		} else {
			Comment.create(req.body.comment , function(err, comment){
				if (err){
					console.log(err);
				}
				else {
					foundCampground.comments.push(comment);
					foundCampground.save();
					res.redirect("/campgrounds/"+foundCampground._id)
				}
			})
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}


module.exports = router;