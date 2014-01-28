var selectSQL = 'select * from user limit 10';
var search=function(){
	pool.getConnection(function (err, conn) {
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
var insert=function(username){
	pool.getConnection(function(err,conn){
		if (err) console.log("POOL ==> " + err);
	    var insertSQL= 'insert  into user(name) values ("'+username+'")';
	    conn.query(insertSQL,function(err,rows){
	        if (err) console.log(err);
	        console.log("insert ==> "+rows);
	       
	        conn.release();
	    });	
	});
};