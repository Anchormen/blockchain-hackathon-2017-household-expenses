var jwtSecretKey = require('../config/config');
var jwtHandler = require('jsonwebtoken');

let processLogin = function (req, res) {
  if(req.body.username === 'anchormen' && req.body.password === 'anchormen') {
    loginOk(req, res)
  }
  else {
    loginFailed(req, res)
  }
}

function loginOk(req, res) {
  console.log("Login succesful")
  var jwtToken = createJwtToken(req.body.username);
  res.status(200).json({ "login": true, "jwtToken": jwtToken})
}

function loginFailed(req, res) {
  res.status(401).json({ "login": false})
}

function createJwtToken(username){
	var token = jwtHandler.sign({ data: username }, jwtSecretKey.secret, { expiresIn: 60 * 10 });
	return token;
}

module.exports = processLogin
