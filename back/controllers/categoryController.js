const { where } = require('sequelize')
const {Sound, Category, User} = require('../models/models')
const uuid = require('uuid')
const ApiError = require('../error/ApiError')
const path = require('path')
const jwt = require('jsonwebtoken')

class categoryController {
    async addCategory(req, res, next) {
        try {      
            const {name} = req.body            

            let category;
            // if (imageId) {
            //     category = await Category.create({name: name, image: imageId})
            // } else {
            //     category = await Category.create({name: name, image: imageId})
            // }
            category = await Category.create({name})

            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUserCategories(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const categories = await Category.findAll({where: {userId: decoded.id}})

        return res.json(categories)
        
    }

    async getSoundFromCategory(req, res) {
        
    }
}

module.exports = new categoryController()