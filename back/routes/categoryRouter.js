const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.post('/add', categoryController.addCategory)
router.get('/getAllUserCategory', categoryController.getUserCategories)
router.post('/getCategorySound', categoryController.getSoundFromCategory)


module.exports = router