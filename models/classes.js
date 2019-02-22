var mongoose = require("mongoose");

var classSchema = new mongoose.Schema({
	name: String,
	institution: String,
	date: String,
	topic: String, 
	description: String,
	user: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	]
});

module.exports = mongoose.model("Class", classSchema);