var mongoose = require('mongoose');


var projectSchema = mongoose.Schema({
	projectname:{
		type:String,
	},
	client:{
		type:String,
	},
	status:{
		type:String,
	},
	teammember:{
		type:Array,
	},
	startdate:{
		type:String,
	},
	type:{
		type:String,
	},
	projectmanagerrole:{
		type:String,
	},
	projectmanager:{
		type:String,
	},
	enddate:{
		type:String,
	},
	pm_role:{
		type:String,
	},
	pm_name:{
		type:String,
	}
})

var Project = module.exports = mongoose.model('Project',projectSchema);

//Get Users
module.exports.getProjects = async function(){
	var result = await Project.find();
	if(result){
		return result
	}else{
		return null
	}
}

//Get by Id
module.exports.getProjectById = async function(id){
	var result = await Project.findById(id);
	if(result){
		return result
	}else{
		return null
	}

}


//Add Projects
module.exports.addProject = async function(project){
	var result = await Project.create(project);
	if(result){
		return result
	}else{
		return null
	}
}
//Update Project
module.exports.updateProject = async function(id,project,options){
	var query = {_id:id}
	var update = {
		projectname:project.projectname,
		client:project.client,
		status:project.status,
		teammember:project.teammember,
		startdate:project.startdate,
		enddate:project.enddate,
		type:project.type,
		projectmanagerrole:project.projectmanagerrole,
		projectmanager:project.projectmanager,
	}
	result = await Project.findOneAndUpdate(query,update,options);
	if(result){
		return result
	}else{
		return null
	}

}
module.exports.deleteProject = async function(id,callback){
	var query = {_id:id}
	var result = await Project.remove(query);
	if(result){
		return result
	}else{
		return null
	}

}
