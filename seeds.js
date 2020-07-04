var mongoose = require("mongoose")
var campground  = require("./models/campground")
var Comment = require("./models/comments")

function seedDB(){
	campground.remove({}, function(err){
		if (err){
			console.log(err);
		}
		else {
			console.log("campgrounds removed")
		}
	})
	Comment.remove({}, function(err){
		if (err){
			console.log(err);
		}
		else {
			console.log("all comments removed")
		}
	})

	data = 
	[{
		name:"Rusty",
		image: "data:image/jpeg;base64,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",
		description: "Im seeding lel"
	},
	{ 	
		name:"Rusic",
		image: "data:image/jpeg;base64,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",
		description: "Blah blah Blah"
	},
	{	
		name:"Proho",
		image: "data:image/jpeg;base64,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",
		description: "I love iphones"
	}]
	data.forEach(function(seed){
		campground.create(seed, function(err, campground){
			if (err){
				console.log(err);
			}
			else {
				console.log("camground added")
				Comment.create(
				{
					text:"This is a nice comment huh no hate lol",
					author: "Some bitch"
				}, function(err, comment){
					if (err){
						console.log(err);
					}
					else {
						campground.comments.push(comment);
						campground.save();
						console.log("comment created and added")
					}
				})
			}
		})
	})

}
module.exports = seedDB;