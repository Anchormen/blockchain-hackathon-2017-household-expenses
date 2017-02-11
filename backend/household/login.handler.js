

var processLogin = function (req, res) {
  if(req.body.username === 'anchormen' && req.body.password === 'anchormen') {
    loginOk(req, res)
  }
  else {
    loginFailed(req, res)
  }
}

function loginOk(req, res) {
  res.statusCode = 200;
  console.log("Login succesful")
}

function loginFailed(req, res) {
  res.statusCode = 401
  console.log("Login failed!")
}

module.exports = processLogin
