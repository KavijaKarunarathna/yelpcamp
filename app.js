var express 	= require("express"),
	app 		= express(),
 	bodyParser  = require("body-parser"),
	mongoose  	= require("mongoose"),
	
	seedDB 		= require("./seeds"),
	Comment 	= require("./models/comments"),
	passport 	= require("passport"),
	LocalStrategy = require("passport-local"),
	User 		= require("./models/user")
   
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	authRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( __dirname + "/public"));
app.set("view engine", "ejs");

/////SEEDING///////
// seedDB();

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

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);

app.listen(3000, function(){
	console.log("The YelpCamp Server has started")
})