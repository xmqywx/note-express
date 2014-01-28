
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http'),
    path = require('path'),
	nicknames=[],
	routes=require('./routes/route');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes.route(app);

var server=http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var io=require('socket.io').listen(server),count=0;
io.sockets.on('connection',function(socket){
	socket.on('nickname',function(data,callback){
		if(nicknames.indexOf(data)>-1){
			callback(false);
		}else{
			callback(true);
			nicknames.push(data);
			socket.nickname=data;
			io.sockets.emit("nicknames",nicknames);
		}
	});
	socket.on('user message',function(data){
		
		io.sockets.emit('user message',{
			nick:socket.nickname,
			message:data
		});
	});
	socket.on('disconnection',function(data){
		if(!socket.nickname)return;
		if(nicknames.indexof(socket.nickname)>-1){
			nicknames.splice(nicknames.indexof(socket.nickname),1);
		}
		io.sockets.emit('nicknames',nicknames);
	});

});
