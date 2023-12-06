const Router = require('express')
const router = new Router()
const soundController = require('../controllers/soundController')

router.post('/add', soundController.addSound)
router.get('/public', soundController.getPublicSounds)
router.get('/getCategorySound', soundController.getCategorySounds)
router.post('/get', soundController.getSound)
router.post('/getInfo', soundController.getSoundInfo)

module.exports = router