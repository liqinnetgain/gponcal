var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      console.log('users');
      if(users.indexOf(data) > -1) {
         console.log('userExists!');
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         console.log('add a user and emit event userSet');
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

http.listen(3003, function() {
   console.log('listening on localhost:3003');
});