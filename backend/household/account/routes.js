var express = require('express')
const accountHandler = require('./handler')
let router = express.Router()

router.get('/:id', accountHandler.getAccount)

module.exports = router
