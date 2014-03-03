var mysql = require('mysql');
var conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'nodeTest',
    port: 3306
});


module.exports= conn;
