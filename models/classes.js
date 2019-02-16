var mongoose = require("mongoose");

var planSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model("Class", planSchema);