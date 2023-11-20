const express = require('express');
const router = express.Router();

// loginRoutes
const loginController = require('../loginController');

router.post('/login', loginController.login);

module.exports = router;




