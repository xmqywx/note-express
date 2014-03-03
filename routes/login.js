/**
 * @author Kris-wx
 */
var userService=require("./service/userService");
module.exports=function(app){
	app.post('/login.action', function(req,res){
		userService.searchByname(req.body.name,function(password){
			if(password==req.body.password){
				req.session.name=req.body.name;
				res.render('register',{title:"sss"});
				
			}else{
				res.render('login');
			}
		});
	});
};
