let express = require('express')
const loginHandler = require('./login.handler')
let router = express.Router()

router.post('/login', loginHandler)

module.exports = router
