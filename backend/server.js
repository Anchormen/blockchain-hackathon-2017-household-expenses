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

const loginHandler = require('./user/routes')
app.use('/user', loginHandler)

app.get('/', (req, res) => {
  res.status(204).end()
});

// Setup models
const User = require("./user/models")
User.sync({force: true})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
