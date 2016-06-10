var express = require('express');
var router = express.Router();
var Users = require('models/users').User;
var HttpError = require('error').HttpError;
var ObjectID = require('mongodb').ObjectID;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {body: '<b>Hello<b>', title: 'Хуяка'});
});

router.get('/users', function (req, res, next) {
  Users.find({}, (err, users)=> {
    if (err) next(err);
    res.json(users);
  });
});
router.get('/users/:id', function (req, res, next) {
  try {
    var id = new ObjectID(req.params.id);
  }
  catch (e) {
    return next(404)
  }

  Users.findById(id, (err, user)=> {
    if (err) next(err);
    if (!user) {
      next(new HttpError(404, 'User not found'));
    }
    else res.json(user);
  });
});
module.exports = router;
