const express = require('express');
const router = express.Router();
/*const {registerUser} = require('../controllers/userController');*/
const userController = require('../controllers/userController');



router.post('/register', userController.registerUser);
router.get('/login', userController.loginUser);

module.exports = router;
