const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    message:{
        type: String,
        required: [true, 'A comment must have a message'],
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A comment must have a user'],
    },
    userId:{
        type: String,
        required: [true, 'A comment must have a userId'],
    },
    post:{
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, 'A comment must have a post']
    },
    postId:{
        type: String,
        required: [true, 'A comment must have a postId'],
    },
    parent:{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    },
    children:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    like:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Like'
        }
    ]
});


const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;