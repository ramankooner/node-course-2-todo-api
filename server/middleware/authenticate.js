var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      // this will stop the code and send back the 401 error code
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next(); // next will alow us to run the get /users/me route below
  }).catch((e) => {
    // sends back 401 status (authentication is required)
    res.status(401).send();
  });
};

module.exports = {authenticate};
