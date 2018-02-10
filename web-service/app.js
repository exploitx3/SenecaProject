var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()
var hostile = require('hostile')

const dns = require('dns')

const {Tracer, ExplicitContext, ConsoleRecorder} = require('zipkin');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

const ctxImpl = new ExplicitContext();
const recorder = new ConsoleRecorder();
const localServiceName = 'web-service'; // name of this application
const tracer = new Tracer({ctxImpl, recorder, localServiceName});



var senecaWebConfig = {
  context: context,
  adapter: require('seneca-web-adapter-express'),
  options: {parseBody: false} // so we can use body-parser
}

var app = Express()
  .use(require('body-parser').json())
  .use(context)
  .use(zipkinMiddleware({tracer}))
  .listen(8080)

var seneca = require('seneca')()
  .use(SenecaWeb, senecaWebConfig)
  .use('api')
  .client({type: 'tcp', pin: 'role:user', port: 1338, host: 'user-service'})
  .client({type: 'tcp', pin: 'role:math', port: 1337, host: 'math-service'})