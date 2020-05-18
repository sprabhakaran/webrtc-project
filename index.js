
var express = require('express');
var http = require('http');
var logger = require('morgan');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var app = express();

app.set('port', 8181);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use("/static", express.static('node_modules'));

require("./route.v1")(app)
require("./socketio.handler")(io)

var server = http.createServer(app);
io.listen(server);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(err, req, resp, next){
  if (!err) {
    return next()
  }
  resp.send(err)
  // return next(err)
})

module.exports = app;

