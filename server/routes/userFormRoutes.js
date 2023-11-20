// userFormRoutes.js
const express = require('express');
const router = express.Router();
const userFormController = require('../controller/userFormController');

router.post('/userform', userFormController.createUserFrom);

module.exports = router;
