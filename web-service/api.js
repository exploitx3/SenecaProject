module.exports = function api(options) {

  var valid_ops = {sum: 'sum', product: 'product'}
  var validUserOps = {create: 'create'}

  this.add('role:api,path:calculate', function (msg, respond) {
    var operation = msg.args.params.operation
    var left = msg.args.query.left
    var right = msg.args.query.right
    this.act('role:math', {
      cmd: valid_ops[operation],
      left: left,
      right: right
    }, respond)
  })

  this.add('role:api,path:user', function (msg, respond) {
    var operation = msg.args.params.operation

    var name = msg.args.body.name

    this.act('role:user', {
      cmd: validUserOps[operation],
      name: name
    }, respond)
  })


  this.add('init:api', function (msg, respond) {
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          calculate: {GET: true, suffix: '/:operation'},
          user: {POST: true, suffix: '/:operation'}
        }
      }
    }, respond)
  })

}