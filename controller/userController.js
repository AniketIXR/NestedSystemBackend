const User = require('../model/UserModel');
const {catchAsync} = require('../Utils/catchAsync');

exports.createUser=catchAsync( async(req,res)=>{
    const newUser=await User.create(req.body);
    res.status(201).json({
        status:'success',
        data:newUser
    });
});

exports.updateUser=catchAsync( async(req,res)=>{
    //code to find the user by id then update the user
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators : true,
    });
    res.status(200).json({
        status:'success',
        data:user
    });
});