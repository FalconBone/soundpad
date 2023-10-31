const Router = require('express')
const router = new Router()
const soundRouter = require('./soundRouter')
const userRouter = require('./userRouter')
const countryRouter = require('./countryRouter')
const hotKeyRouter = require('./hotKeyRouter')
const soundTypeRouter = require('./soundTypeRouter')

router.use('/sound', soundRouter)
router.use('/user', userRouter)
router.use('/country', countryRouter)
router.use('/hotkey', hotKeyRouter)
router.use('/soundtype', soundTypeRouter)

module.exports = router