const microservicesConnections = {
  mathService: {
    roles: [
      {'role': 'math'}
    ],
    host: 'math-service',
    port: '1337'
  },
  userService: {
    roles: [
      {'role': 'user'}
    ],
    host: 'user-service',
    port: '1338'
  }
}

let service = require('seneca')()

// send any role:math patterns out over the network
// IMPORTANT: must match listening service
  .client({
    type: 'tcp',
    pin: microservicesConnections.mathService.roles[0],
    port: microservicesConnections.mathService.port
  })
  .client({
    type: 'tcp',
    pin: microservicesConnections.userService.roles[0],
    port: microservicesConnections.userService.port
  })

let count = 0
setInterval(function () {
  service
    .act('role:math,cmd:sum,left:1,right:2', console.log)
    .act({role: 'user', cmd: 'create', username: 'NewUser' + count}, function(err, result) {
      console.log(result)
    })

  count++
}, 3000)