var express 	= require("express"),
	app 		= express(),
 	bodyParser  = require("body-parser"),
	mongoose  	= require("mongoose"),
	campground 	= require("./models/campground"),
	seedDB 		= require("./seeds"),
	Comment 	= require("./models/comments"),
	passport 	= require("passport"),
	LocalStrategy = require("passport-local"),
	User 		= require("./models/user")
   
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

///////// PASSPORT CONFIG //////////
app.use(require("express-session")({
	secret: "I'm the bitch type",
	resave: false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/campgrounds", function(req, res){	
	campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds})
		}
	});
})

app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
})

app.post("/campgrounds", function(req, res){	
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

app.get("/campgrounds/:id", function(req, res){
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err){
			console.log(err);
		} else {
			console.log(foundCampground.comments);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})
	
})

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
	campground.findById(req.params.id, function(err, foundCampground) {
		if (err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: foundCampground})
		}
	});
})

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
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

////AUTH////
app.get("/register", function(req, res){
	res.render("register")
})

app.post("/register", function(req, res){
	var NewUser = new User({username: req.body.username});
	User.register(new User (NewUser), req.body.password, function(err, user){
	if (err){
		console.log(err);
		return res.render("register");
	}
	passport.authenticate("local")(req, res, function(){
		res.redirect("/login");
	});
	});
})

app.get("/login", function(req, res){
	res.render("login");
})

app.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds")
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}


app.listen(3000, function(){
	console.log("The YelpCamp Server has started")
})