'use strict';


var kraken = require('kraken-js'),
// e_static = require('node-static'),
express = require('express'),
socketApp = express(),
port = 2013,
http = require('http'),
socketServer,

app = {};


app.configure = function configure(nconf, next) {	
	socketServer = http.createServer(socketApp);

    // Fired when an app configures itself
    next(null);
};


app.requestStart = function requestStart(server) {
	// var io = require('socket.io').listen(socketServer);
	// 	io.sockets.on('connection', function (socket){
	// 	console.info('socket server connected');
	// 		function log(){
	// 			var array = [">>> "];
	// 		  for (var i = 0; i < arguments.length; i++) {
	// 		  	array.push(arguments[i]);
	// 		  }
	// 		    socket.emit('log', array);
	// 		}

	// 		socket.on('message', function (message) {
	// 			log('Got message: ', message);
	// 			socket.broadcast.emit('message', message); // should be room only
	// 		});

	// 		socket.on('create or join', function (room) {
	// 			var numClients = io.sockets.clients(room).length;

	// 			log('Room ' + room + ' has ' + numClients + ' client(s)');
	// 			log('Request to create or join room', room);

	// 			if (numClients == 0){
	// 				socket.join(room);
	// 				socket.emit('created', room);
	// 			} else if (numClients == 1) {
	// 				io.sockets.in(room).emit('join', room);
	// 				socket.join(room);
	// 				socket.emit('joined', room);
	// 			} else { // max two clients
	// 				socket.emit('full', room);
	// 			}
	// 			socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
	// 			socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);

	// 		});
        
        
 //    });
    // Fired at the beginning of an incoming request
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
	server.use(express.methodOverride());
	// socketApp.use(express.static( __dirname + 'public/js'));


    // Fired before routing occurs
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Fired after routing occurs
};


kraken.create(app).listen(function (err, server) {
  if (err) {
    console.error(err);
  }

  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function(socket) {
    // socket.emit('news', { hello: 'world' });


	socket.on('message', function (message) {
		console.log('Got message: ', message);
		socket.broadcast.emit('message', message); // should be room only
	});

	socket.on('create or join', function (room) {
		var numClients = io.sockets.clients(room).length;

		console.log('Room ' + room + ' has ' + numClients + ' client(s)');
		console.log('Request to create or join room', room);

		if (numClients == 0){
			socket.join(room);
			socket.emit('created', room);
		} else if (numClients == 1) {
			io.sockets.in(room).emit('join', room);
			socket.join(room);
			socket.emit('joined', room);
		} else { // max two clients
			socket.emit('full', room);
		}
		socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
		socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);

	});


  });
});
