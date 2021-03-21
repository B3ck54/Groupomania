const express = require('express');

const router = express.Router();

const userCtrl = require ('../controllers/user');
const auth = require('../middleware/auth');


router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/me', userCtrl.getProfile);
router.put('/user/:userId', userCtrl.editProfile);
router.delete('/user/:userId', userCtrl.deleteUser);


module.exports = router;