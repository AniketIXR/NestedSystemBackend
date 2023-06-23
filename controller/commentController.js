const Comment = require('../model/CommentModel');
const {catchAsync} = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const User= require('../model/UserModel');
const POST = require('../model/postModel');

exports.createComment=catchAsync( async(req,res,next)=>{
    if(req.body.message === "" || req.body.message == null){
       return next(new AppError('Comment cannot be empty',400));
    }

    // console.log("Backend: ",req.body);
    const newComment=await Comment.create({
        postId:req.params.id,
        userId:req.cookies.userId,
        user:req.cookies.userId,
        post:req.params.id,
        message:req.body.message,
        parent:req.body.parent
    });

    await Comment.findByIdAndUpdate(req.body.parent,{
        $push:{
            children:newComment._id
        }
    })

     await User.findByIdAndUpdate(req.cookies.userId,{
        $push:{
            comments:newComment._id
        }
    });

    await POST.findByIdAndUpdate(req.params.id,{
        $push:{
            comments:newComment._id
        }
    });

    res.status(201).json({
        status:'success',
        data:newComment
    });
});

exports.updateComment=catchAsync( async(req,res,next)=>{
    if(req.body.message === "" || req.body.message == null){
        return next(new AppError('Comment cannot be empty',400));
     }

     console.log("Backend: ",req.body,"  ",req.params.commentId);
     const {userId} = await Comment.findById(req.params.commentId);

     if(userId != req.cookies.userId){
        return next(new AppError('You are not authorized to update this comment',400));
     } 

    
 
    const comment = await Comment.findByIdAndUpdate(req.params.commentId,req.body,{
        new: true,
        runValidators : true,
    });
    res.status(200).json({
        status:'success',
        data:comment
    });
});