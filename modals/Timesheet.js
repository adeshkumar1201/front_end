var mongoose = require('mongoose');


var timelogShema = mongoose.Schema({
	timesheet:{
		type:Array,
	},
	user_id:{

	},
	status:{
		type:String
	},
	startOfWeek:{

	},
	identifier:{

	},
	username:{
		type:String
	},
	updated_at:{
		type:Date,
		default:Date.now
	}
})

var Timelog = module.exports = mongoose.model('Timelog',timelogShema);

//Get Timelog
module.exports.getTimelogs = async function(){
	var result = await Timelog.find();
	if(result){
		return result
	}else{
		return null
	}
}

//Get by Id
module.exports.getTimelogByUserId = async function(id){
	var result = await Timelog.find({
		user_id:id
	});
	if(result){
		return result
	}else{
		return null
	}

}

module.exports.findTimesheet = async function(data){
	var result = await Timelog.find({
		identifier:data.startofweek,
		user_id:data.user_id
	})
	if(result){
		return result
	}else{
		return null
	}

}
//Add Timelog
module.exports.addTimelog = async function(timelog){
	var result = await Timelog.create(timelog);
	if(result){
		return result
	}else{
		return null
	}
}
//Update User
module.exports.updateTimelog = async function(id,timelog,options){
	var query = {_id:id}
	console.log(timelog)
	var update = {
		user_id:timelog.user_id,
		status:timelog.status,
		timesheet:timelog.timesheet,
		identifier:timelog.identifier,
		username:timelog.username
	}
	console.log(update)
	result = await Timelog.findOneAndUpdate(query,update,options);
	if(result){
		return result
	}else{
		return null
	}

}
module.exports.deleteTimelog = async function(id,callback){
	var query = {_id:id}
	var result = await Timelog.remove(query);
	if(result){
		return result
	}else{
		return null
	}

}
