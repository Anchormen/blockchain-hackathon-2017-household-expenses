

let processLogin = function (req, res) {
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
  res.send({ "login": true})
  res.end()
}

function loginFailed(req, res) {
  res.statusCode = 401
  console.log("Login failed!")
  res.send({ "login": false})
  res.end()
}

module.exports = processLogin
