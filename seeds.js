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
		image: "https://images.unsplash.com/photo-1541423408854-5df732b6f6d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMzk2fQ&w=1000&q=80",
		description: "Im seeding lel"
	},
	{ 	
		name:"Rusic",
		image: "https://wallpaperaccess.com/full/30100.jpg",
		description: "Blah blah Blah"
	},
	{	
		name:"Proho",
		image: "https://lh3.googleusercontent.com/proxy/R_K8mvEmkAlY2tRbBfJAxEgDMCO85X4WXO2rgR0ZKgqBTcL-t1t2qT8bbgUvoOocSh3-4cPm49a_mrPs_oLOg2azNmpuEu1Ys6p10dVb1SlDMNHmX3O8",
		description: "I love iphones"
	}]
	// data.forEach(function(seed){
	// 	campground.create(seed, function(err, campground){
	// 		if (err){
	// 			console.log(err);
	// 		}
	// 		else {
	// 			console.log("camground added")
	// 			Comment.create(
	// 			{
	// 				text:"This is a nice comment huh no hate lol",
	// 				author: "Some bitch"
	// 			}, function(err, comment){
	// 				if (err){
	// 					console.log(err);
	// 				}
	// 				else {
	// 					campground.comments.push(comment);
	// 					campground.save();
	// 					console.log("comment created and added")
	// 				}
	// 			})
	// 		}
	// 	})
	// })

}
module.exports = seedDB;