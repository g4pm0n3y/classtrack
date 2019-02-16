var mongoose = require("mongoose");

var planSchema = new mongoose.Schema({
	name: String,
	institution: String,
	date: String,
	topic: String, 
	description: String
});

module.exports = mongoose.model("Class", planSchema);