// userFormRoutes.js
const express = require('express');
const router = express.Router();
const userFormController = require('../controller/userFormController');

router.post('/createuser', userFormController.createUserFrom);

router.post('/userlogin', userFormController.userLogin);

router.get('/getallusers', userFormController.getAllUsers); 


router.get('/getallusers/:userId', userFormController.getSingleUser); 

module.exports = router;
