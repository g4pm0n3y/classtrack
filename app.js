var express 	= require("express"),
		mongoose 	= require("mongoose"),
		ejs 			= require("ejs"),
		Classes 	= require("./models/classes"),
		seedDB		= require("./seeds.js")
 		app 			= express();

// app configuration
mongoose.connect("mongodb://localhost:27017/syllabus", {useNewUrlParser: true});
app.set("view engine", "ejs")
app.use(express.static("public"));

// empty database each time app runs
seedDB();
// fake seed data for app
var classes = [
	{
		name: "linux"
	},
	{
		name: "programming"
	},
	{
		name: "database"
	},
	{
		name: "networking"
	},
]

// ROUTES
// landing route
app.get("/", function(req, res){
	res.render("landing")
});

// plan route
app.get("/plan", function(req, res){
	res.render("classes", {classes: classes});
});

// server setup
app.listen(3000, function(){
	console.log("server is started")
});
