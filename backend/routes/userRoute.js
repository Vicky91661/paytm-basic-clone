const express = require("express");
const {User} = require("../db")

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");


const router = express.Router();

router.post("/signin",(req,res)=>{
    const username =req.body.username
    const password =req.body.password

    var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

    res.status(200).json({  
	token: "jwt"
    })

    res.status(411).json({  
        message: "Error while logging in"
    })
})


router.post("/signup",async (req,res)=>{
    
    const username =req.body.username
    const password =req.body.password
    const firstName =req.body.firstName
    const lastName =req.body.lastName

    const userExist = await User.findOne({username});

    if(userExist){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })

    }else{
        const user = await User.create({
            username,
            password,
            firstName,
            lastName,
        })
        if(user){
            const newUser = user._id ;
            var token = jwt.sign({ newUser }, JWT_SECRET);
            res.status(200).json({
                message: "User created successfully",
                token
            })
        }else{
            res.status(411).json({
                message: "not inserted into database"
            })
        }
       
    }
    
})
router.post("/changePassword",(req,res)=>{
    res.status(200).json({
        msg:"changePassword is okey"
    })
})

module.exports = router;