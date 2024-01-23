const express = require("express");
const {User} = require("../db")

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

const {z} = require("zod")

const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

const userSignin =z.object({
    username:z.string().email().min(3, { message: "username must be 3 or more characters long" })
    .max(30,{message:"username must be 30 or less characters long"}),
    password:z.string().min(5,{message:"password must be more than 5 length"})
})
const userSignup =z.object({
    username:z.string().email().min(3, { message: "username must be 3 or more characters long" })
    .max(30,{message:"username must be 30 or less characters long"}),
    password:z.string().min(5,{message:"password must be more than 5 length"}),
    firstName:z.string().max(50, { message: "firstName must be 50 or less characters long" }),
    lastName:z.string().max(50, { message: "lastName must be 50 or less characters long" })
})

router.post("/signin",async (req,res)=>{
    const username =req.body.username
    const password =req.body.password
    
    try {
        userSignin.parse({username,password})
        const userExist = await User.findOne({username});

        if(userExist){
            const result = await bcrypt.compare(password,userExist.password)
            if(result){
                const newUser = userExist._id ;
                var token = jwt.sign({ newUser }, JWT_SECRET);
                res.status(200).json({
                    message: "successfully login",
                    token
                })
            }else{
                res.status(411).json({
                    message: "Password is incorrect"
                })
            }
            

        }else{
            res.status(411).json({
                message: "User does not exist"
            })
        }
    } catch (error) {
        res.status(411).json({
            message: "Invalid input",
            errors: error.errors.map(err => err.message),
        });
    }

})


router.post("/signup",async (req,res)=>{
    
    const username =req.body.username
    const password =req.body.password
    const firstName =req.body.firstName
    const lastName =req.body.lastName

    try {
        userSignup.parse({ username, password, firstName, lastName });
        
        const userExist = await User.findOne({username});

        if(userExist){
            res.status(411).json({
                message: "Email already taken"
            })

        }else{
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({
                username,
                password:hashedPassword,
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
    } catch (error) {
        res.status(411).json({
            message: "Invalid input",
            errors: error.errors.map(err => err.message),
        });
    }

    
    
        
    
})
router.post("/changePassword",(req,res)=>{
    res.status(200).json({
        msg:"changePassword is okey"
    })
})

module.exports = router;