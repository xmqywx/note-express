var loginAction=require("./action/loginAction/loginAction");

exports.action=function(app){
	loginAction.login(app);
	//userAction.userAction(app);
};
