const User = require('./user')
const Corpse = require('./corpse')
const Assignment = require('./assignments')
const Like = require('./likes')
const Photo = require('./photos')

Photo.belongsTo(Corpse)
Photo.belongsTo(User)

Assignment.belongsTo(Corpse)
Assignment.belongsTo(User, {as: 'assignorId'})
Assignment.belongsTo(User, {as: 'assigneeId'})

Corpse.hasMany(Photo, {onDelete: 'CASCADE'})
Corpse.hasMany(Likes, {onDelete: 'CASCADE'})

Like.belongsTo(User)
Like.belongsTo(Corpse)

User.hasMany(Photo, {onDelete: 'CASCADE'})
User.hasMany(Corpse, {onDelete: 'CASCADE'})
User.hasMany(Like, {onDelete: 'CASCADE'})

User.hasMany(Users, {as: 'friends'})

module.exports = {
  User,
  Corpse,
  Assignment,
  Like,
  Photo
}
