var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('p3Main.html', { root: __dirname});
});

router.get('/p3Main.html', function(req, res, next) {
	res.sendFile('p3Main.html', { root: __dirname});
});

router.get('/p3Create.html', function(req, res, next) {
	res.sendFile('p3Create.html', { root: __dirname});
});

router.get('/p3About.html', function(req, res, next) {
	res.sendFile('p3About.html', { root: __dirname});
});

router.get('/p3Login.html', function(req, res, next) {
	res.sendFile('p3Login.html', { root: __dirname});
});

router.post('/p3Login.html', function(req,res, next) {
	res.sendFile('placeholder.html', {root: __dirname});
})

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
