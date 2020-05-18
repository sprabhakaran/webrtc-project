
exports = module.exports = function(io){
    io.use((socket, next) => {
        //middleware
    })

    io.use((socket, next) => {
        //authentication middleware
    })

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
}