var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// schema lets us put custom methods
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,// makes sure email isnt the same as other emails in the user collection
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// This method is used so that we only get back the user id and email when we post a user in postman
// this will block the token object and password when we post a uesr
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Instance Methods
// we use a function bc we need a this key word bc this stores the individual document and arrow functions dont have a this function
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  //user.tokens.push({access, token});
  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

// everything we add on to it turns into a model method
UserSchema.statics.findByToken = function (token) {
  // model methods get called with the model
  var User = this;
  var decoded; // stores decoded jwt values

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token, // lets us query the value passed in by findByToken
    'tokens.access': 'auth'
  });
};

// User
var User = mongoose.model('User', UserSchema);

module.exports = {User};

// var user = new User({
//   email: 'ramankooner@example.com'
// });
//
// user.save().then((doc) => {
//   console.log('User saved', doc)
// }, (e) => {
//   console.log('Unable to save user', e)
// });
