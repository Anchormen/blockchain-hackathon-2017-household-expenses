let express = require('express')
const creditorHandler = require('./handler')
let router = express.Router()

router.post('/send_transaction', creditorHandler)

module.exports = router
