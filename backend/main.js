const loginHandler = require('./login.handler')

const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/login', loginHandler);

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
