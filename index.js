
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

var server = http.createServer(app);
io.listen(server);

io.sockets.on('connection', function (socket) {
  
  socket.on('message', function (message) {
    log('S --> got message: ', message);
    
    console.log("message & channel", message, message.channel)

    /*hack:: harcoded name - sending broadcast to alpha*/
    socket.broadcast.to("alpha").emit('message', message);
    // socket.broadcast.to(message.channel).emit('message', message);

    console.log("after message broadcast")
  });

  socket.on('create or join', function (room) {
    var numClients = io.engine.clientsCount;
    log('S --> Room ' + room + ' has ' + numClients + ' client(s)');
    log('S --> Request to create or join room', room);
  
    // First client joining...
    if (numClients == 1) {
      socket.join(room);
      socket.emit('created', room);
    } else if (numClients == 2) {
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room);
    } else { 
      // max two clients
      socket.emit('full', room);
    }
  });

  function log() {
    var array = [];
    for (var i = 0; i < arguments.length; i++) {
      array.push(arguments[i]);
    }
    socket.emit('log', array);
  }

});


server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(err, req, resp, next){
  
  return next(err)
})

module.exports = app;

