const express = require('express');
const app = express();
const router = express.Router();
const { getPosts, createPost,getPost,updatePost } = require('../controller/postController');
const {createComment,updateComment} = require('../controller/commentController');

app.use(express.json());

router.route('/').get(getPosts).post(createPost);

router.route('/:id').get(getPost).patch(updatePost);

router.route('/:id/comments').post(createComment);  

router.route('/:id/comments/:commentId').put(updateComment);

module.exports = router;

