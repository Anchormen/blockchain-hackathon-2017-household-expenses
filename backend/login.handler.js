

var processLogin = function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<strong>Hello World</strong>');
}

module.exports = processLogin
