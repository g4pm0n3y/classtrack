var express 	= require("express"),
		mongoose 	= require("mongoose"),
		ejs 			= require("ejs"),
		Classes 	= require("./models/classes"),
		seedDB		= require("./seeds.js")
 		app 			= express();

// App Configuration
mongoose.connect("mongodb://localhost:27017/syllabus", {useNewUrlParser: true});
app.set("view engine", "ejs")
app.use(express.static("public"));

// Empty Database
seedDB();
// Fake Data
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







app.listen(3000, function(){
	console.log("server is started")
});
