var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./../db')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('p3Main.html', { root: __dirname});
});

router.get('/p3Main.html', function(req, res, next) {
	res.sendFile('p3Main.html', { root: __dirname});
});

router.get('/p3Submit.html', function(req, res, next) {
	res.sendFile('p3Submit.html', {root: __dirname});
});

router.get('/p3Create.html', function(req, res, next) {
	res.sendFile('p3Create.html', { root: __dirname});
});

router.post('/p3Create.html', function(req, res, next) {
	var Nombre = req.body.username;
	var ShallPass = req.body.password;
	var sql = mysql.format("INSERT INTO user_login (username, password) VALUES (?,?)",[Nombre,ShallPass]);
	connection.query(sql, function(err,rows) {
		if ( err ) throw err;
		res.redirect('p3Login.html')
	});
});

router.get('/p3About.html', function(req, res, next) {
	res.sendFile('p3About.html', { root: __dirname});
});

router.get('/p3Login.html', function(req, res, next) {
	res.sendFile('p3Login.html', { root: __dirname});
});

router.post('/p3Login.html', function(req,res, next) {
	var Nombre = req.body.username;
	var ShallPass = req.body.password;
	var sql = mysql.format("SELECT * FROM user_login WHERE username=?",[Nombre]);
	var pswd = 'NULL';
	connection.query(sql, function (err, rows) {
		if ( err ) throw err;
		if (!rows.length) {
			res.sendFile('p3Login.html', {root: __dirname});
		}
		else {pswd = rows[0].password;}
		if (pswd == ShallPass) {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end("You're in! Booya!");	
		}
		else {
			res.sendFile('p3Login.html', {root: __dirname});
		}
	});
});

router.get('/p3LogoColored.png', function(req, res, next) {
	res.sendFile('p3LogoColored.png', { root: __dirname});
});

router.get('/p3LogoNOCOLOR.png', function(req, res, next) {
	res.sendFile('p3NOCOLOR.png', { root: __dirname});
});

router.get('/pThreeBack.png', function(req, res, next) {
	res.sendFile('pThreeBack.png', { root: __dirname});
});

router.get('/pThreeBackPressedDark.png', function(req, res, next) {
	res.sendFile('pThreeBackPressedDark.png', { root: __dirname});
});

module.exports = router;
