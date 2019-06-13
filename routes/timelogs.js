var express = require('express');
var router = express.Router();
Timelog = require('../modals/Timesheet')
var jwt = require('jsonwebtoken')
var config = require('../config')
var middleware = require('../middleware')
/* GET users listing. */
router.get('/', middleware.checkToken, async function(req, res, next) {
  var result = null;
  result = await Timelog.getTimelogs();
  res.json(result)
});

router.get('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  result = await Timelog.getTimelogByUserId(req.params._id);
  res.json(result)
});

router.post('/', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var timelog =req.body;
  result = await Timelog.addTimelog(timelog);
  res.json(result)
});

router.post('/current-timesheet', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var timelog =req.body;
  result = await Timelog.findTimesheet(timelog);
  res.json(result)
});

router.put('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var id = req.params._id;
  var timelog =req.body;
  result = await Timelog.updateTimelog(id, timelog, {});
  res.json(result)
});

router.delete('/:_id', middleware.checkToken, async function(req, res, next) {
  var result = null;
  var id = req.params._id;
  result = await Timelog.deleteTimelog(id)
    res.json(result)
});
module.exports = router;
