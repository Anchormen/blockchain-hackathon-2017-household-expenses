var express = require('express')
const accountHandler = require('./handler')
let router = express.Router()

router.post('/:id', accountHandler)

module.exports = router
