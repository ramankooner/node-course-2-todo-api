var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.methods.removeToken = function (token) {
  // $pull lets us remove items from an array that matches a certain criteria
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}

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

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  // find the user that matches the email we pass in
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// we run this function before we ever save
// we have to call next on the function else our program will crash
UserSchema.pre('save', function (next) {
  var user = this;

  // isModified will return true if password was modified and false if it wasnt
  // checks if password was modified
  if (user.isModified('password')) {
    // hashing the password
     bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(user.password, salt, (err, hash) => {
         user.password = hash;
         next();
       });
     });
  } else {
    next();
  }
});

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
