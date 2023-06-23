const express = require('express');
const app = express();
const router = express.Router();
const {createComment,updateComment} = require('../controller/commentController');

app.use(express.json());

// router.route('/').post(createComment);

// router.route('/:id').patch(updateComment);

module.exports = router;