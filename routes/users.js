var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

User = require('../modals/User')
var config = require('../config')
var middleware = require('../middleware')

router.get('/',middleware.checkToken, async function(req, res, next) {
  var result = null;
  result = await User.getUsers();
  res.json(result)
});

router.get('/project-manager',middleware.checkToken, async function(req, res, next) {
  var result = null;
  result = await User.getProjectManagers(req.params._id);
  res.json(result)
});

router.get('/:_id', middleware.checkToken, async function(req, res, next) {
	var result = null;
  result = await User.getUserById(req.params._id);
  res.json(result)
});

router.post('/',  middleware.checkToken,async function(req, res, next) {
	var result = null;
	var user =req.body;
  result = await User.addUser(user);
  res.json(result)
});

router.post('/login', async function(req, res, next) {
  var result = null;
  var user =req.body;
  result = await User.loginAndUpdate(user);
  jwt.sign({user:result},config.secret, (err, token) => {
   res.json({
    user:result,
    token
   })
  })
  //res.json(result)
});

router.put('/:_id', middleware.checkToken, async function(req, res, next) {
	var result = null;
	var id = req.params._id;
	var user =req.body;
  result = await User.updateUser(id, user, {});
  res.json(result)
});

router.delete('/:_id', middleware.checkToken, async function(req, res, next) {
	var result = null;
	var id = req.params._id;
  result = await User.deleteUser(id)
  	res.json(result)
});
module.exports = router;
