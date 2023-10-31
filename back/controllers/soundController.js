const { where } = require('sequelize')
const {Sound} = require('../models/models')
const uuid = require('uuid')
const ApiError = require('../error/ApiError')
const path = require('path')

class SoundController {
    async addSound(req, res, next) {
        try {
            
            const { name, soundTypeId } = req.body
            const { soundFile } = req.files

            const type = soundFile.name
                .split('.')
                .filter(Boolean)
                .slice(1)
                .join('.')

            let fileName = uuid.v4() + `.${type}`
            console.log(path.resolve(__dirname, '..', 'static'));
            soundFile.mv(path.resolve(__dirname, '..', 'static', fileName))
            

            let sound;
            if (name) {
                sound = await Sound.create({name: name, filePath: fileName, weight: soundFile.size})
            } else {
                sound = await Sound.create({name: soundFile.name, filePath: fileName, weight: soundFile.size})
            }

            return res.json(sound)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getUserSounds(req, res) {
        res.json({message: 'А я работаю'})
    }
    async getPublicSounds(req, res) {

        let {soundTypeId, limit, page} = req.query || {}
        console.log(req.body);
        page = page || 1
        limit = limit || 24
        let offset = page * limit - limit

        let sounds
        if (soundTypeId) {
            sounds = await Sound.findAndCountAll({where:{soundTypeId}, limit, offset})
        } else {
            sounds = await Sound.findAndCountAll({limit, offset})
        }

        res.json(sounds)

    }
    async getSound(req, res) {

    }
}

module.exports = new SoundController()