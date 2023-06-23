const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    userId:{
        type: String,
        required: [true, 'A like must have a userId'],
    },
    comment:{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    },
    commentId:{
        type: String,
        required: [true, 'A like must have a commentId'],
    },
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;