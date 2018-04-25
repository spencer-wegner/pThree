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
//var redirect_uriSub = 'http://localhost:8080/callbackSub/';
var redirect_uriGen = 'http://localhost:8080/callbackGen/';
var scopes = 'user-read-private playlist-modify-public';
var stateKey = 'spotify_auth_state';

//example playlist uri -> spotify:user:fatpanda970:playlist:7A6fgzMDaYYfvhxU2s0lwv

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
	var userID = req.body.username;
	var url = req.body.playlistName;
	var parsedURL = url.split('/');
	var use_id = parsedURL[4];
	var playlist_id = parsedURL[6]; 
	
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
		},
		form: {
			grant_type: 'client_credentials'
		},
		json: true
	};

	request.post(authOptions, function(error, response, body1) {
		if (!error && response.statusCode === 200) {
			var token = body1.access_token;
			var theURL = `https://api.spotify.com/v1/users/${use_id}/playlists/${playlist_id}/tracks?` +
				querystring.stringify({
					fields: 'items(track(uri))'
				});
			var options = {
				url: theURL,
				headers: {
					'Authorization': 'Bearer ' + token
				},
				json: true
			};
			request.get(options, function(error, response, body2) {
				var body3 = JSON.stringify(body2);
				parsedBody = body3.split(',')
				console.log(parsedBody[0]);
				for (var track_uri in parsedBody) {
					var insertJSON = mysql.format("INSERT INTO playlist (username, trackURI) VALUES (?,?)",[userID,parsedBody[track_uri]]);
					console.log(insertJSON);
					connection.query(insertJSON, function(err, rows) {
						if ( err ) throw err;
					})
				}
				res.redirect('/p3Submit.html')
			});
		}
	});


// move into function?
	/*connection.query(selectUsernames, function(err, rows) {
		if ( err ) throw err;
		if (!rows.length) {
			// CHAD THIS IS WHAT EXECUTES IF THAT NAME DOESN"T EXIST
			res.redirect('/p3Login.html');
			//Delete this ^^ just testing.
		}
		else{
			connection.query(insertURL, function(err, blank) {
				if (err ) throw err;
				else { res.redirect('/p3Submit.html')}
			});

		}
	})*/

	//This was authentication. Leaving it just in case but ignore it!

	/*var state = generateRandomString(16);
	res.cookie(stateKey, state);
	res.redirect("https://accounts.spotify.com/authorize/?" +
		querystring.stringify({
			response_type: 'code',
			client_id: client_id,
			scope: scopes,
			redirect_uri: redirect_uriSub,
			state: state
		}));*/

	// END IGNORE
});

//Handles submitting a playlist. SHOULD no longer need this but leaving it just in case.
/*router.get('/callbackSub', function(req, res) {
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
					url: 'https://api.spotify.com/v1/me',
					headers: { 'Authorization': 'Bearer ' + access_token },
					json: true
				};
				request.get(options, function(error, response, body) {
					body.access_token = access_token;
					console.log(body);
				});

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
});*/

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
				var options = {
					url: 'https://api.spotify.com/v1/me',
					headers: { 'Authorization': 'Bearer ' + access_token },
					json: true
				};

				request.get(options, function(error, response, body) {
					body.access_token = access_token;
					console.log(body);
					console.log(body.id);
					console.log(access_token);
					var PythonShell = require('python-shell');
					//var pyshell = new PythonShell('createPlaylist.py');
					var options = {
					  //Mike's below
					  //scriptPath: '/home/user/CSCI3308/Project/pThree/project_files/integration/usingExpress/routes/',
					  //Garrison's below
					  scriptPath: '/home/glee/Dropbox/curClasses/softwareDevAndTools/pThree/project_files/integration/usingExpress/routes/',
					  
					  args: [access_token, body.id]
					};
					 
					PythonShell.run('createPlaylist.py', options, function (err, results) {
					  	if (err) throw err;
					  	// results is an array consisting of messages collected during execution

						var playlistOptions = {
							url: 'https://api.spotify.com/v1/users/' + results[0] + '/playlists',
							body: JSON.stringify({'name': 'p3Playlist', 'public': true}),
							dataType: 'json',
							headers: { 'Authorization': 'Bearer ' + results[1],
							'Content-Type': 'application/json'
							}
						};

						request.post(playlistOptions, function(error, response, body5) {
							jsonBody5 = JSON.stringify(body5)

							console.log('\n' + jsonBody5 + '\n')
							parsedBody5 = jsonBody5.split(':')
							doubleParse = parsedBody5[11].split('"')
							tripleParse = doubleParse[1].substring(0,doubleParse[1].length-1)
							var populateOptions = {
								url: 'https://api.spotify.com/v1/users/' + results[0] + '/playlists/' + tripleParse +'/tracks?uris=' + results[2],
								headers: {'Authorization': 'Bearer ' + results[1],
								'Accept': 'application/json'}
							}
							request.post(populateOptions, function(error, response, body6) {
								console.log(JSON.stringify(response))
							})

						})
					});
				
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
