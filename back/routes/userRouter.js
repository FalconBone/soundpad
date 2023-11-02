const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.registration)
router.post('/login', userController.login)
router.get('/checkauth', authMiddleware, userController.checkAuthorization)


module.exports = router