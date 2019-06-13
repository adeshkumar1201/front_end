var mongoose = require('mongoose');


var taskSchema = mongoose.Schema({
	taskname:{
		type:String,
	},
	description:{
		type:String,
	},
	status:{
		type:String,
	}
})

var Task = module.exports = mongoose.model('Task',taskSchema);

//Get Users
module.exports.getTasks = async function(){
	var result = await Task.find();
	if(result){
		return result
	}else{
		return null
	}
}

module.exports.getActiveTasks = async function(){
	var result = await Task.find({
		status:'active'
	});
	if(result){
		return result
	}else{
		return null
	}
}
//Get by Id
module.exports.getTaskById = async function(id){
	var result = await Task.findById(id);
	if(result){
		return result
	}else{
		return null
	}

}
//Add User
module.exports.addTask = async function(task){
	var result = await Task.create(task);
	if(result){
		return result
	}else{
		return null
	}
}
//Update User
module.exports.updateTask = async function(id,task,options){
	var query = {_id:id}
	var update = {
		taskname:task.taskname,
		description:task.description,
		status:task.status
	}
	result = await Task.findOneAndUpdate(query,update,options);
	if(result){
		return result
	}else{
		return null
	}

}
module.exports.deleteTask = async function(id,callback){
	var query = {_id:id}
	var result = await Task.remove(query);
	if(result){
		return result
	}else{
		return null
	}

}
