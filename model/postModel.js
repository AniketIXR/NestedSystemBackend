const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'A post must have a title'],
    }
    ,body:{
        type: String,
        required: [true, 'A post must have a body'],
    },
    comments:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
        }
    ]
});

const POST = mongoose.model("Post",postSchema);
module.exports = POST;