require('./models').connect('mongodb://mongodb/users')
const User = require('./models/User')

module.exports = function user(options) {

  this.add({role: 'user', cmd: 'create'}, function create(msg, respond) {
    User.create({name: msg.username}, function (err, user) {
      if (err) {
        throw new Error('User creation error')
      }

      respond(null, {user: user, message: 'User created successfully'})
    })
  })
}