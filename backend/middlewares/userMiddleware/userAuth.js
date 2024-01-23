// Header - Authorization: Bearer <actual token>
const express = require("express");

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../../config");

const userAuth = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message:"authentication header is not correct"
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decode = jwt.verify(token,JWT_SECRET)
        // const userId =decode.userId
        //console.log(decode)
        next()
    } catch (error) {
        return res.status(411).json({
            msg:"User is not authenticated"
        })
    }
        
}

module.exports = userAuth;