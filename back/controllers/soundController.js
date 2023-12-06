const { Sound, Category, SoundCategory } = require('../models/models')
const uuid = require('uuid')
const ApiError = require('../error/ApiError')
const path = require('path')
const jwt = require('jsonwebtoken')

class SoundController {
    async addSound(req, res, next) {
        try {

            console.log(req.files);
            const { categoryId } = req.body
            const fileArrayObject = req.files

            for (let file in fileArrayObject) {
                const soundFile = fileArrayObject[file]
                const type = soundFile.name
                    .split('.')
                    .filter(Boolean)
                    .slice(1)
                    .join('.')

                let fileName = uuid.v4() + `.${type}`
                console.log(path.resolve(__dirname, '..', 'static'));
                soundFile.mv(path.resolve(__dirname, '..', 'static', fileName))

                // let dur
                // getAudioDurationInSeconds(path.resolve(__dirname, '..', 'static', fileName)).then((duration) => {
                //     dur = duration
                // })

                let sound;
                sound = await Sound.create({ name: soundFile.name, filePath: fileName, weight: soundFile.size})
                await SoundCategory.create({ soundId: sound.id, categoryId: categoryId });

            }
            return res.json({ message: "Звук(и) добавлен(ы)" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getCategorySounds(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        console.log(decoded);
        const category = await Category.findOne({where: {id: req.query.id, userId: decoded.id}})
        const soundCategory = await SoundCategory.findAndCountAll({where: {categoryId: category.id}})
        const sounds = []

        for (let i = 0; i < soundCategory.count; i++) {
            const sound = await Sound.findByPk(soundCategory.rows[i].dataValues.soundId)
            sounds.push(sound)
        }

        return res.json(sounds)
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
        let id = req.body.id;
        const sound = await Sound.findByPk(id)

        res.sendFile(path.resolve(__dirname, '..', 'static', sound.dataValues.filePath))
    }
    async getSoundInfo(req, res) {
        let id = req.body.id;
        const sound = await Sound.findByPk(id)

        res.send(sound)
    }
}

module.exports = new SoundController()