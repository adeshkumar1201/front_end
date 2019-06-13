var express = require('express');
var router = express.Router();
Project = require('../modals/Project')
var jwt = require('jsonwebtoken')
var config = require('../config')
var middleware = require('../middleware')


router.get('/', middleware.checkToken, async function(req, res, next) {
  var result = null;
  result = await Project.getProjects();
  res.json({
    result:result,
    success:true
  })
});

router.get('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  result = await Project.getProjectById(req.params._id);
  res.json(result)
});

router.post('/',middleware.checkToken, async function(req, res, next) {
  var result = null;
  var project =req.body;
  result = await Project.addProject(project);
  res.json(result)
});

router.put('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var id = req.params._id;
  var project =req.body;
  result = await Project.updateProject(id, project, {});
  res.json(result)
});

router.delete('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var id = req.params._id;
  result = await Project.deleteProject(id)
    res.json(result)
});
module.exports = router;
