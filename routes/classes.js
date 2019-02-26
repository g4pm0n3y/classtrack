var express = require("express");
var router = express.Router();

var helper = require("../util/helper.js")
router.use(methodOverride("_method"));

// pass user to all routes
router.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// CLASSES ROUTES
// ==============
// INDEX ROUTE - get users classes
router.get("/classes", helper.checkLogin, function(req, res){
	User.findById(req.user._id).populate("posts").exec(function(err, user){
		if(err){
			console.log(err)
		} else {
			res.render("classes", {classes: user.posts})
		}
	});
});

// NEW ROUTE - get form for new classes
router.get("/classes/new", helper.checkLogin, function(req, res){
	res.render("new");
});

// CREATE ROUTE - create a new class
router.post("/classes", helper.checkLogin, function(req, res){
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
			// associate classes & users on both ends
			User.findById(req.user._id, function(err, foundUser){
				if(err){
					console.log(err)
				} else {
					// associate a class with a user
					foundUser.posts.push(createdClass)
					foundUser.save();
					// associate a user with a class
					createdClass.user.push(foundUser);
					createdClass.save();
				}
			});
			res.redirect("/classes");
		}
	});
});

// SHOW ROUTE - show information for one class
router.get("/classes/:id", helper.checkLogin, function(req, res){
	Classes.findById(req.params.id, function(err, foundClass){
		if(err){
			console.log(err)
		} else {
			res.render("show", {classitem: foundClass});
		}
	});
});

// EDIT ROUTE - get form to update a route
router.get("/classes/:id/edit", helper.checkLogin, function(req, res){
	Classes.findById(req.params.id, function(err, foundClass){
		if(err){
			console.log(err)
		} else {
			res.render("edit", {classitem: foundClass});
		}
	});
});

// UPDATE ROUTE - update information for a class
router.put("/classes/:id", helper.checkLogin, function(req, res){
	Classes.findByIdAndUpdate(req.params.id, req.body, function(err, updatedClass){
		if(err){
			console.log(err);
		} else {
			res.redirect("/classes/" + req.params.id);
		}
	});
});

// DELETE ROUTE
router.delete("/classes/:id", helper.checkLogin, function(req, res){
	Classes.findByIdAndRemove(req.params.id, function(err, deletedClass){
		if(err){
			console.log(err)
		} else {
			res.redirect("/classes");
		}
	})
});

module.exports = router;