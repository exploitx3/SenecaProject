var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()

var senecaWebConfig = {
  context: context,
  adapter: require('seneca-web-adapter-express'),
  options: { parseBody: false } // so we can use body-parser
}

var app = Express()
  .use( require('body-parser').json() )
  .use( context )
  .listen(8080)

var seneca = require('seneca')()
  .use(SenecaWeb, senecaWebConfig )
  .use('api')
  .client( { type:'tcp', pin:'role:user', port: 1338, host: 'user_service' } )
  .client( { type:'tcp', pin:'role:math', port: 1337, host: 'math_service' } )