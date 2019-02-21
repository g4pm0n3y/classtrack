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


// app configuration
mongoose.connect("mongodb://localhost:27017/classtrack", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride("_method"));

// passport configuration
app.use(require("express-session")({
	secret: "go leafs go",
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// LANDING PAGE
app.get("/", function(req, res){
	res.render("landing")
});

// ROUTES
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
	var institution = req.body.institution;
	var date = req.body.date;
	var topic = req.body.topic;
	var description = req.body.description;
	var newClass = {
		name: name, 
		institution: institution, 
		date: date,
		topic: topic,
		description: description
	};
	Classes.create(newClass, function(err, createdClass){
		if(err){
			console.log(err);
		} else {
			res.redirect("/classes");
		}
	});
});

// SHOW ROUTE - show information for one class
app.get("/classes/:id", function(req, res){
	Classes.findById(req.params.id, function(err, foundClass){
		if(err){
			console.log(err)
		} else {
			res.render("show", {classitem: foundClass});
		}
	});
});

// EDIT ROUTE - get form to update a route
app.get("/classes/:id/edit", function(req, res){
	Classes.findById(req.params.id, function(err, foundClass){
		if(err){
			console.log(err)
		} else {
			res.render("edit", {classitem: foundClass});
		}
	});
});

// UPDATE ROUTE - update information for a class
app.put("/classes/:id", function(req, res){
	Classes.findByIdAndUpdate(req.params.id, req.body, function(err, updatedClass){
		if(err){
			console.log(err);
		} else {
			res.redirect("/classes/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/classes/:id", function(req, res){
	Classes.findByIdAndRemove(req.params.id, function(err, deletedClass){
		if(err){
			console.log(err)
		} else {
			res.redirect("/classes");
		}
	})
});

// AUTH ROUTES
// ===========

// show register form
app.get("/register", function(req, res){
	res.render("register");
});

// create new user
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err)
			res.render("register")
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("classes")
		});
	});
});

// server setup
app.listen(3000, function(){
	console.log("server is started")
});
