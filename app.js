var express = require("express"),
		ejs 		= require("ejs"),
 		app 		= express();

// App Configuration
app.set("view engine", "ejs")

// Routes
app.get("/", function(req, res){
	res.render("landing")
});









app.listen(3000, function(){
	console.log("server is started")
});
