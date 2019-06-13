var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
	fname:{
		type:String,
		required:true
	},
	lname:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	role:{
		type:String,
		required:true
	},
	image:{
		type:String
	},
	createAt:{
		type:Date,
		default:Date.now
	}
})

var User = module.exports = mongoose.model('User',userSchema);

//Get Users

module.exports.getUsers = async function(limit){
	var result = await User.find().limit(limit);
	if(result){
		return result
	}else{
		return null
	}
}

module.exports.getProjectManagers = async function(){
	var result = await User.find({ $or: [ { role: "admin" }, { role: "manager" } ] });
	if(result){
		return result
	}else{
		return null
	}
}
//Get by Id
module.exports.getUserById = async function(id){
	var result = await User.findById(id);
	if(result){
		return result
	}else{
		return null
	}

}
//Add User
module.exports.addUser = async function(user){
	var result = await User.create(user);
	if(result){
		return result
	}else{
		return null
	}
}
module.exports.loginAndUpdate = async function(user){
	var count = await User.find({
		email:user.email
	})
	if(count && user.image ){
		var query = {_id:count[0]._id}
		var update = {
		fname:count[0].fname,
		lname:count[0].lname,
		email:count[0].email,
		role:count[0].role,
		image:user.image,
	}
		result = await User.findOneAndUpdate(query,update,{});
	}else{
		result = {
			error:true,
			message:"You are not registered."
		}
	}
	
	if(result){
		return result
	}else{
		return null
	}
}
//Update User
module.exports.updateUser = async function(id,user,options){
	var query = {_id:id}
	var update = {
		fname:user.fname,
		lname:user.lname,
		role:user.role,
		email:user.email
	}
	result = await User.findOneAndUpdate(query,update,options);
	if(result){
		return result
	}else{
		return null
	}

}
module.exports.deleteUser = async function(id,callback){
	var query = {_id:id}
	var result = await User.remove(query);
	if(result){
		return result
	}else{
		return null
	}

}