const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.createUser = (req,res,next)=>{
    bcrypt.hash(req.body.password,10).then(hash=>{
        const user = new User({
            email:req.body.email,
            password:hash,
            shopName:req.body.shopName,
            address:req.body.address
        });

        user.save().then(result=>{
            res.status(201).json({
                message:'User created!',
                result:result
            })
        }).catch(err=>{

            res.status(500).json({
                message: "Invalid authentication credentials!"
            })
        })
    });
    
}

exports.loginUser = (req,res,next)=>{
    let fetchedUser;
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password,user.password);
    }).then(result=>{
        if(!result){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        const token = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},"secret_this_should_be_longer");
        res.status(200).json({
            token:token,
            userId: fetchedUser._id,
            shopName: fetchedUser.shopName,
            address:fetchedUser.address
        })
        
    }).catch(err=>{
        return res.status(401).json({
            message: "Invalid authentication credentials!"
        });
    })
}