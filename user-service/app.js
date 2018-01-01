// const sleep = require('sleep')
// sleep.sleep(5)
require('seneca')()

  .use('user')

  // listen for role:math messages
  // IMPORTANT: must match client
  .listen({type: 'tcp', pin: 'role:user', port: 1338, timeout: 5000})
