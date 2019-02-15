var Classes = require("./models/classes")

function seedDB(){
	Classes.remove({}, function(err){
		if(err){
			console.log(err)
		}
	})
}

module.exports = seedDB;