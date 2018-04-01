var http = require('http');
var fs = require('fs');
var url = require('url');
var home_html, home_css;
var about_html, about_css;
var create_html, create_css;
var login_html, login_css;
var logoCol, logoNoCol;
var back, backDark;

fs.readFile('./../frontEnd/p3Main.html', function(err, data) {
	if (err){
		throw err;
	}
	home_html = data;
});
fs.readFile('./../frontEnd/p3Main.css', function(err,data) {
	if (err){
		throw err;
	}
	home_css = data;
});
fs.readFile('./../frontEnd/p3About.html',function(err,data) {
	if (err){
		throw err;
	}
	about_html = data;
})
fs.readFile('./../frontEnd/p3About.css',function(err,data) {
	if (err){
		throw err;
	}
	about_css = data;
})
fs.readFile('./../frontEnd/p3Create.html',function(err,data) {
	if (err){
		throw err;
	}
	create_html = data;
})
fs.readFile('./../frontEnd/p3Create.css',function(err,data) {
	if (err){
		throw err;
	}
	create_css = data;
})
fs.readFile('./../frontEnd/p3Login.html',function(err,data) {
	if (err){
		throw err;
	}
	login_html = data;
})
fs.readFile('./../frontEnd/p3Login.css',function(err,data) {
	if (err){
		throw err;
	}
	login_css = data;
})
fs.readFile('./../frontEnd/p3LogoColored.png',function(err,data) {
	if (err){
		throw err;
	}
	logoCol = data;
})
fs.readFile('./../frontEnd/p3LogoNOCOLOR.png',function(err,data) {
	if (err){
		throw err;
	}
	logoNoCol = data;
})
fs.readFile('./../frontEnd/pThreeBack.png',function(err,data) {
	if (err){
		throw err;
	}
	back = data;
})
fs.readFile('./../frontEnd/pThreeBackPressedDark.png',function(err,data) {
	if (err){
		throw err;
	}
	backDark = data;
})

var server = http.createServer(function(request, response) {
	switch (request.url) {
		case "/p3Main.css" :
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(home_css);
			break;

		case "/p3LogoColored.png" :
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(logoCol);
			break;
		case "/p3LogoNOCOLOR.png" :
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(logoNoCol);
			break;

		case "/pThreeBack.png" :
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(back);
			break;
		case "/pThreeBackPressedDark.png" :
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(backDark);
			break;

		case "/p3About.css" :
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(about_css)
			break;
		case "/p3About.html" :
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(about_html)
			break;

		case "/p3Create.html" :
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(create_html)
			break;
		case "/p3Create.html" :
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(create_css)
			break;

		case "/p3Login.html" :
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(login_html)
			break;
		case "/p3Login.html" :
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(login_css)
			break;

		default :
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(home_html);
	};
	response.end();
});
server.listen(8080);

console.log('Server running at http://localhost:8080');