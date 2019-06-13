var express = require('express');
var router = express.Router();
Task = require('../modals/Task')
var jwt = require('jsonwebtoken')
var config = require('../config')
var middleware = require('../middleware')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  var result = null;
  result = await Task.getTasks();
  res.json(result)
});

router.get('/active', middleware.checkToken, async function(req, res, next) {
  var result = null;
  result = await Task.getActiveTasks();
  res.json(result)
});

router.get('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  result = await Task.getTaskById(req.params._id);
  res.json(result)
});

router.post('/', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var task =req.body;
  result = await Task.addTask(task);
  res.json(result)
});

router.post('/approve', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var id = req.body._id;
  var task =req.body;
  result = await Task.updateTask(id, task, {});
  res.json(result)
});

router.put('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var id = req.params._id;
  var task =req.body;
  result = await Task.updateTask(id, task, {});
  res.json(result)
});

router.delete('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var id = req.params._id;
  result = await Task.deleteTask(id)
    res.json(result)
});
module.exports = router;
