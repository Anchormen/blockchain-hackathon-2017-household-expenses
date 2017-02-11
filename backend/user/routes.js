let express = require('express')
const loginHandler = require('./login.handler')
let router = express.Router()

router.post('/login', loginHandler.processLogin)

module.exports = router
