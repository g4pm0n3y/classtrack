var mongoose = require("mongoose");

var planSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model("Item", planSchema);