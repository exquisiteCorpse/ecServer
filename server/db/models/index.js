const User = require('./user')
const Corpse = require('./corpse')
const Assignment = require('./assignment')
const Like = require('./like')
const Photo = require('./photo')

Photo.belongsTo(Corpse)
Photo.belongsTo(User)

Assignment.belongsTo(Corpse)
Assignment.belongsTo(User, {as: 'assignor'})
Assignment.belongsTo(User, {as: 'assignee'})
Assignment.belongsTo(Photo)

Corpse.hasMany(Photo, {onDelete: 'CASCADE'})
Corpse.hasMany(Like, {onDelete: 'CASCADE'})
Corpse.hasMany(Assignment, {onDelete: 'CASCADE'})
Corpse.belongsTo(User, {onDelete: 'CASCADE'})

Like.belongsTo(User)
Like.belongsTo(Corpse)

User.hasMany(Photo, {onDelete: 'CASCADE'})
User.hasMany(Corpse, {onDelete: 'CASCADE'})
User.hasMany(Like, {onDelete: 'CASCADE'})

User.belongsToMany(User, {through: 'Friend', as: 'friend'})

module.exports = {
  User,
  Corpse,
  Assignment,
  Like,
  Photo
}
