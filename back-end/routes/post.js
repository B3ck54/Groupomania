const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require ('../controllers/posts');


router.post('/',auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.editPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/answers',auth, multer, postCtrl.createAnswer);
router.delete('/answers/:id', auth, postCtrl.deleteAnswer);

module.exports = router;