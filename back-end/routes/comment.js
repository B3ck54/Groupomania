const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentCtrl = require ('../controllers/comments');


router.post('/',auth, multer, commentCtrl.createComment);
router.get('/', auth, commentCtrl.getAllComments);
router.get('/:id', auth, commentCtrl.getComment);
router.put('/:id', auth, multer, commentCtrl.editComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;