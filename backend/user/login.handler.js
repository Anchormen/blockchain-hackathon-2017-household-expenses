const jwtSecretKey = require('../config/config');
const jwtHandler = require('jsonwebtoken');
const User = require('./user_model');
const crypto = require('crypto');

LoginHandler = {}

LoginHandler.processLogin = (req, res) => {
  User.findOne({
    where: {
      userName: req.body.username
    }
  }).then( (user) => {
    console.log("User: " + user)
    if(LoginHandler.hashPassword(req.body.password) === user.password) {
      LoginHandler.loginOk(req, res)
    }
    else {
      LoginHandler.loginFailed(req, res)
    }
  });
}

LoginHandler.hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('base64')
}

LoginHandler.loginOk = (req, res) => {
  console.log("Login succesful")
  var jwtToken = LoginHandler.createJwtToken(req.body.username);
  res.status(200).json({ "login": true, "token": jwtToken})
}

LoginHandler.loginFailed = (req, res) => {
  res.status(401).json({ "login": false})
}

LoginHandler.createJwtToken = (username) => {
  var token = jwtHandler.sign({ data: username }, jwtSecretKey.secret, { expiresIn: 60 * 10 });
  return token;
}


module.exports = LoginHandler
