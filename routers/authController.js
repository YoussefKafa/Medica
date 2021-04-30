var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const verifyToken = require('../routers/verifyToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const {User}=require('../models/User');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register',  (req,res)=>{
  let user = new User({
     firstName: req.body.firstName,
     lastName:req.body.lastName,
     email:req.body.email,
     password:req.body.password,
     mobileNumber:req.body.mobileNumber,
     gender:req.body.gender,
     birthDay:req.body.birthDay,
     image:req.body.image,
     isAdmin:req.body.isAdmin,
     isDoctor:req.body.isDoctor
  })
  user =  user.save().then(user => res.json(user)).catch(err=> res.json(err));
});


router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});

module.exports = router;