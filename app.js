var express 		= require("express"),
		mongoose 		= require("mongoose"),
		ejs 				= require("ejs"),
		bodyParser  = require("body-parser"),
		Classes 		= require("./models/classes"),
		seedDB			= require("./seeds.js")
 		app 				= express();

// app configuration
mongoose.connect("mongodb://localhost:27017/classtrack", {useNewUrlParser: true});
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));

// empty database each time app runs
//seedDB();
// fake seed data for app
/*
var data = [
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
*/

// ROUTES
// landing route
app.get("/", function(req, res){
	res.render("landing")
});

// INDEX ROUTE - get all classes
app.get("/classes", function(req, res){
	Classes.find({}, function(err, foundClasses){
		if(err){
			console.log(err);
		} else {
			res.render("classes", {classes: foundClasses});
		}
	})
});

// NEW ROUTE - get form for new classes
app.get("/classes/new", function(req, res){
	res.render("new");
});

// CREATE ROUTE - create a new class
app.post("/classes", function(req, res){
	var name = req.body.name;
	var newClass = {name: name};
	Classes.create(newClass, function(err, createdClass){
		if(err){
			console.log(err);
		} else {
			res.redirect("/classes");
		}
	});
});

// server setup
app.listen(3000, function(){
	console.log("server is started")
});
