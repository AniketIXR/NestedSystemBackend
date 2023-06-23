const POST = require('../model/postModel');
const {catchAsync} = require('../Utils/catchAsync');

exports.getPosts = catchAsync(async (req,res)=>{

    const posts = await POST.find({},'title id');
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: posts
    });

});

exports.getPost = catchAsync(async (req,res)=>{

    const post = await POST.findById(req.params.id,'body title comments').populate({
        path: 'comments',
        select: 'id message parent createdAt user',
        options: { sort: { createdAt: -1 } },
        populate:{
            path: 'user',
            select: 'id name'
        }
    });
    res.status(200).json({
        status: 'success',
        data: post
    });

});

exports.createPost = catchAsync(async (req,res)=>{
    const newPost = await POST.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            post: newPost
        }
    });
});

exports.updatePost = catchAsync(async (req,res)=>{
    const post = await POST.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators : true,
    });
    res.status(200).json({
        status:'success',
        data:post
    });
});

