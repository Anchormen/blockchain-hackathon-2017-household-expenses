let express = require('express')
const loginHandler = require('./login.handler')
const accountRouter = require('./account/routes')
let router = express.Router()

router.post('/login', loginHandler)
router.use('/account', accountRouter)

module.exports = router
