var mysql = require('mysql');
var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'xxx',
	database	: 'p3_database'
});

connection.connect(function(err){
	if (err) throw err;
});

module.exports = connection;