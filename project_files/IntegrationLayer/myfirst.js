var http = require('http');
var fs = require('fs');
var htmlFile;
var cssFile;

fs.readFile('./../Front-End/p3Main.html', function(err, data) {
	if (err){
		throw err;
	}
	htmlFile = data;
});

fs.readFile('./../Front-End/p3Main.css', function(err,data) {
	if (err){
		throw err;
	}
	cssFile = data;
});

var server = http.createServer(function(request, response) {
	switch (request.url) {
		case "/p3Main.css" :
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(cssFile);
			break;
		default :
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(htmlFile);
	};
	response.end();
});
server.listen(8080);

console.log('Server running at http://localhost:8080');