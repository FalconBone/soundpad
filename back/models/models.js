const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
    phone: {type: DataTypes.STRING(20), unique: true},
    avatar: {type: DataTypes.STRING},
})

const Sound = sequelize.define('sound', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    filePath: {type: DataTypes.STRING, allowNull: false},
    weight: {type: DataTypes.INTEGER, allowNull: false},
    access: {type: DataTypes.STRING, allowNull: false, defaultValue: 'PRIVATE'},
    // duration: {type: DataTypes.INTEGER, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const SoundCategory = sequelize.define('sound_category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const HotKey = sequelize.define('hot_key', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const SoundType = sequelize.define('sound_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const SoundTag = sequelize.define('sound_tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Tag = sequelize.define('tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tag: {type: DataTypes.STRING, allowNull: false}
})

const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    path: {type: DataTypes.STRING, allowNull: false}
})

Country.hasMany(User)
User.belongsTo(Country)

User.hasMany(Category)
Category.belongsTo(User)

HotKey.hasMany(Sound)
Sound.belongsTo(HotKey)

SoundType.hasMany(Sound)
Sound.belongsTo(SoundType)

Sound.belongsToMany(Tag, {through: SoundTag})
Tag.belongsToMany(Sound, {through: SoundTag})

Sound.belongsToMany(Category, {through: SoundCategory})
Category.belongsToMany(Sound, {through: SoundCategory})


module.exports = {
    User,
    Sound,
    HotKey,
    Country,
    SoundType,
    SoundTag,
    Tag,
    Category,
    SoundCategory
}