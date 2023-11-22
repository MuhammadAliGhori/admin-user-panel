const express = require('express');
const router = express.Router();

// loginRoutes
const loginController = require('../loginController');

router.post('/adminlogin', loginController.login);

module.exports = router;




