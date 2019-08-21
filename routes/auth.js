var express = require('express');
var router = express.Router();
var AuthController = require('../app/Controllers/AuthController');

/* GET users listing. */
router.post('/login', AuthController.login);

module.exports = router;