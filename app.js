var restify = require('restify');
var routes  = require('./routes');

var server = restify.createServer();
server.on('uncaughtException', function(request, response, route, error) {
  console.log('ERROR', error.stack);
}); 


server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/register', routes.register);
server.post('/start', routes.start);
server.post('/end', routes.end);
server.post('/tick/:player_id', routes.tick);

server.listen(8000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
