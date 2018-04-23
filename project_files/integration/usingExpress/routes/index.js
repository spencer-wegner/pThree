var express = require('express');
var https = require('https');
var request = require('request');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./../db');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '21bb8d7e10ae46d29026cb125ef768e2';
var client_secret = '133121bfe6234ef2879f5793e3fc1b54';
var redirect_uriSub = 'http://localhost:8080/callbackSub/';
var redirect_uriGen = 'http://localhost:8080/callbackGen/';
var scopes = 'user-read-private user-read-email';
var stateKey = 'spotify_auth_state';

var generateRandomString = function(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};


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
			res.redirect('/p3Generate.html');
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

router.get('/p3Generate.html', function(req, res, next) {
	res.sendFile('p3Generate.html', {root: __dirname});
})

router.post('/p3Generate.html', function(req, res, next) {
	var state = generateRandomString(16);
	res.cookie(stateKey, state);
	res.redirect("https://accounts.spotify.com/authorize/?" +
		querystring.stringify({
			response_type: 'code',
			client_id: client_id,
			scope: scopes,
			redirect_uri: redirect_uriGen,
			state: state
		}));
})

router.post('/p3Submit.html', function(req, res, next) {
	var state = generateRandomString(16);
	res.cookie(stateKey, state);
	res.redirect("https://accounts.spotify.com/authorize/?" +
		querystring.stringify({
			response_type: 'code',
			client_id: client_id,
			scope: scopes,
			redirect_uri: redirect_uriSub,
			state: state
		}));

	/*var userID = req.body.userID;	//THESE WILL DEPEND ON CHAD's forms, change once he makes
	var url = req.body.url; 

	//if userID not there, make the entry and add.
	//if userID IS there, just add the url


	connection.query(sql, function(err,rows) {
		if ( err ) throw err;
		if (!rows.length) {
			sql = mysql.format("INSERT INTO playlist (userID, url) VALUES (?,?)",[]);
			connection.query(sql, function(err,rows2) {
				if ( err ) throw err;
				res.redirect('p3Login.html')
			});
		}
		else{res.end("Username already exists.");}
	})*/
});

//Handles submitting a playlist
router.get('/callbackSub', function(req, res) {
	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect('/#' +
			querystring.stringify({
				error: 'state_mismatch'
			}));
	} else {
		res.clearCookie(stateKey);
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: redirect_uriSub,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
			},
			json: true
		};

		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token;
				console.log('before');
				var options = {
//CRISTOPH!!! Change this url to change what the api returns.
					url: 'https://api.spotify.com/v1/me',
					headers: { 'Authorization': 'Bearer ' + access_token },
					json: true
				};

//CRISTOPH!!! Inside this function just use "var playlist = body.{whatever they use as a key name}" to make a variable
				request.get(options, function(error, response, body) {
					body.access_token = access_token;
					console.log(body);
				});
//Add code to add whatever we have to the sql table here.


				res.redirect('/#' +
					querystring.stringify({
						access_token: access_token,
						refresh_token: refresh_token
					}));
			} else {
				res.redirect('/#' +
					querystring.stringify({
					error: 'invalid_token'
				}));
			}
		});
	}
});

//handles generating a playlist
router.get('/callbackGen', function(req, res) {
	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect('/#' +
			querystring.stringify({
				error: 'state_mismatch'
			}));
	} else {
		res.clearCookie(stateKey);
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: redirect_uriGen,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
			},
			json: true
		};

		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token;
				console.log('before');
				var options = {
					url: 'https://api.spotify.com/v1/me',
					headers: { 'Authorization': 'Bearer ' + access_token },
					json: true
				};

				request.get(options, function(error, response, body) {
					body.access_token = access_token;
					console.log(body);
				});


				var spawn = require("child_process").spawn,
					py = spawn('python',["createPlaylist.py"],access_token);
				py.stdout.on('end', function(){
				console.log('Python Script createPlaylist.py finished');
				});
			}
		});
	}
});

router.get('/refresh_token', function(req, res) {
	//requesting access token from refresh token
	var refresh_token = req.query.refresh_token;
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: { 'Authrorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
		form: {
		grant_type: 'refresh_token',
		refresh_token: refresh_token
	},
		json: true
	};

	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var access_token = body.access_token;
			res.send({
				'access_token': access_token
			});
		}
	});	
});

module.exports = router;
