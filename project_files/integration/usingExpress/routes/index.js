var express = require('express');
var https = require('https');
var request = require('request');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./../db')

var client_id = '21bb8d7e10ae46d29026cb125ef768e2';
var client_secret = '133121bfe6234ef2879f5793e3fc1b54';
var redirect_uri = 'http://localhost:8080/p3Submit.html';
var scopes = 'user-read-private user-read-email';

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
	var sql = mysql.format("SELECT * FROM user_login WHERE username=?",[Nombre]);
	connection.query(sql, function(err,rows) {
		if ( err ) throw err;
		if (!rows.length) {
			sql = mysql.format("INSERT INTO user_login (username, password) VALUES (?,?)",[Nombre,ShallPass]);
			connection.query(sql, function(err,rows2) {
				if ( err ) throw err;
				res.redirect('p3Login.html')
			});
		}
		else{res.end("Username already exists.");}
	}) 

});

router.get('/p3About.html', function(req, res, next) {
	res.sendFile('p3About.html', { root: __dirname});
});

router.get('/p3Login.html', function(req, res, next) {
	res.sendFile('p3Login.html', { root: __dirname});
});

router.post('/p3Login.html', function(req, res, next) {
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

router.post('/p3Submit.html', function(req, res, next) {
	var url = "https://accounts.spotify.com/authorize/?client_id=21bb8d7e10ae46d29026cb125ef768e2&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fp3Submit.html&scope=user-read-private%20user-read-email&state=34fFs29kd09"
	res.redirect(url);
	/*request(url, function(error, res, body){
		if (!error && res.statusCode == 200){
			console.log(body)
		}
	});*/
});
module.exports = router;
