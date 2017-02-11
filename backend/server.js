/**
 * Main server module.
 */
const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const housholdRouter = require('./household/routes')
app.use('/household', housholdRouter)
app.get('/', (req, res) => {
  res.statusCode = 204;
  res.end()
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
