var conn=require("../common/server");
var selectSQL = 'select * from user limit 10';
search=function(){
	conn.getConnection(function (err, conn) {
	    if (err) console.log("POOL ==> " + err);
	
	    conn.query(selectSQL,function(err,rows){
	        if (err) console.log(err);
	        console.log("SELECT ==> ");
	        for (var i in rows) {
	            console.log(rows[i]);
	        }
	        conn.release();
	    });
	});

};
insert=function(username){
	conn.getConnection(function(err,conn){
		if (err) console.log("POOL ==> " + err);
	    var insertSQL= 'insert  into user(name) values ("'+username+'")';
	    conn.query(insertSQL,function(err,rows){
	        if (err) console.log(err);
	        console.log("insert ==> "+rows);
	       
	        conn.release();
	    });	
	});
};
exports.searchByname=function(username,callback){
	conn.getConnection(function (err, conn) {
		var password;
		if (err) console.log("POOL ==> " + err);
	    var ff=conn.query("select password from user where name=?",username,function(err,rows){
	        if (err) console.log(err);
	        if(rows.length!=0){
	        	password= rows[0].password;
	        }else{
	        	password= "";
	        }
	        callback(password);
	        conn.release();
	    });
    });
    
};
