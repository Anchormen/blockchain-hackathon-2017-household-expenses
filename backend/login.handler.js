

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
  res.status(200).json({ "login": true})
}

function loginFailed(req, res) {
  res.status(401).json({ "login": false})
}

module.exports = processLogin
