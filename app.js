var express 				= require("express"),
		mongoose 				= require("mongoose"),
		ejs 						= require("ejs"),
		bodyParser  		= require("body-parser"),
		passport				= require("passport"),
		LocalStrategy 	= require("passport-local")
		methodOverride 	= require("method-override"),
		Classes 				= require("./models/classes"),
		User 						= require("./models/user"),
		app 						= express();

// app routes
var classesRoutes = require("./routes/classes"),
		authRoutes    = require("./routes/auth");

// app configuration
mongoose.connect("mongodb://localhost:27017/classtrack", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(classesRoutes);
app.use(authRoutes);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false}));

// LANDING PAGE
app.get("/", function(req, res){
	res.render("landing")
});

// server setup
app.listen(3000, function(){
	console.log("server is started")
});
