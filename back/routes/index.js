const Router = require('express')
const router = new Router()
const soundRouter = require('./soundRouter')
const userRouter = require('./userRouter')
const countryRouter = require('./countryRouter')
const hotKeyRouter = require('./hotKeyRouter')
const soundTypeRouter = require('./soundTypeRouter')
const categoryRouter = require('./categoryRouter')

router.use('/sound', soundRouter)
router.use('/user', userRouter)
router.use('/country', countryRouter)
router.use('/hotkey', hotKeyRouter)
router.use('/soundtype', soundTypeRouter)
router.use('/category', categoryRouter)

module.exports = router