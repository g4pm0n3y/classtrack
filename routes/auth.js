var express 				= require("express"),
		bodyParser  		= require("body-parser"),
		passport				= require("passport"),
		LocalStrategy 	= require("passport-local")
		methodOverride 	= require("method-override"),
		app 						= express();

var router 		= express.Router();
router.use(bodyParser.urlencoded({ extended: false}));

// pass user to all routes
router.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

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

// AUTH ROUTES
// ===========
// show register form
router.get("/register", function(req, res){
	res.render("register");
});

// create new user
router.post("/register", function(req, res){
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

// show login form
router.get("/login", function(req, res){
	res.render("login");
});

// handle login 
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/classes",
		failureRedirect: "/login"
	}), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

module.exports = router;