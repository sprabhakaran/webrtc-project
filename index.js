
// Required Modules
var express = require('express');
var http = require('http');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var io = require('socket.io')(http);

// Create Express App
var app = express();
app.set('port', 8181);

app.use(logger('dev'));

app.use(express.static('public'));
app.use("/static", express.static('node_modules'));

var server = http.createServer(app);
io.listen(server);

io.sockets.on('connection', function (socket) {

  socket.on('messageChange', function (data) {
    console.log(data);
    socket.emit('receive', data.message.split('').reverse().join(''));
  });

  socket.on('message', function (message) {
    console.log('S --> Got message: ', message);
    socket.broadcast.to(message.channel).emit('message', message.message);
  });

  socket.on('create or join', function (channel) {
    console.log("create or join invoked: ", channel)
    var numClients = io.engine.clientsCount;
    // var numClients = io.sockets.clients(channel).length;
    console.log("active client count: ", numClients)
    if (numClients == 1) {
      socket.join(channel);
      socket.emit('created', channel);
    } else if (numClients == 2) {
      io.sockets.in(channel).emit('remotePeerJoining', channel);
      socket.join(channel);
      socket.broadcast.to(channel).emit('broadcast: joined', 'S --> broadcast(): client ' + socket.id + ' joined channel ' + channel);
    } else {
      console.log("Channel full!");
      socket.emit('full', channel);
    }
  });

  socket.on('response', function (response) {
    console.log('S --> Got response: ', response);
    socket.broadcast.to(response.channel).emit('response', response.message);
  });

  socket.on('Bye', function (channel) {
    socket.broadcast.to(channel).emit('Bye');
    socket.disconnect();
  });

  socket.on('Ack', function () {
    console.log('Got an Ack!');
    socket.disconnect();
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

