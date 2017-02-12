/**
 * Main server module.
 */
const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const loginHandler = require('./user/routes')
app.use('/user', loginHandler)

const tokenHandler = require('./user/token.verifier')
app.use('/', tokenHandler)

const housholdRouter = require('./household/routes')
app.use('/household', housholdRouter)

const creditordRouter = require('./creditor/routes')
app.use('/creditor', creditordRouter)

app.get('/', (req, res) => {
  res.status(204).end()
});

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port)
});

exports.closeServer = function(){
    server.close();
};
