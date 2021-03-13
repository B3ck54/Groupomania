const express = require('express');

const router = express.Router();

const userCtrl = require ('../controllers/user');


router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/users',userCtrl.getAllUsers);
router.get('/user/:userId', userCtrl.getUser);
router.put('/user/:userId', userCtrl.editProfile);
router.delete('/user/:userId', userCtrl.deleteUser);


module.exports = router;