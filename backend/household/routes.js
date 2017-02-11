let express = require('express')
const accountRouter = require('./account/routes')
let router = express.Router()

router.use('/account', accountRouter)

module.exports = router
