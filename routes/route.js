
var index = require('./index');
var user = require('./user');
var config=require('./config');

exports.route = function(app){
	
	app.get('/', function(req,res){
		res.render('login');
	});
	app.post('/',function(req,res){
		res.send(req.body);
	});
	user.action(app);
	config(app);
};