const express = require("express");
const {User} = require("../db")

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

const userAuth = require("../middlewares/userMiddleware/userAuth")

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
                const userId = userExist._id ;
                var token = jwt.sign({ userId }, JWT_SECRET);
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
                const userId = user._id ;
                var token = jwt.sign({ userId }, JWT_SECRET);
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

const updatePassword = z.object({
	password:z.string().min(5,{message:"password must be more than 5 length"}),
})

router.put("/changePassword",userAuth,async (req,res)=>{
    
    try {
        const newPassword=req.body.password
        updatePassword.parse({password:newPassword})
    } catch (error) {
        return res.status(411).json({
            message: "Invalid input",
            errors: error.errors.map(err => err.message),
        });
    }
   
    const password =await bcrypt.hash(req.body.password,saltRounds);
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token,JWT_SECRET)
    const newUser = decode.newUser;

    try {
        await User.updateOne({_id:newUser},password)
        return res.status(200).json({
            msg:"changePassword is okey"
        })
    } catch (error) {
        return res.status(411).json({
            msg:"not updated"
        })
    }
    
})


const updateDetails = z.object({
    firstName:z.string().max(50, { message: "firstName must be 50 or less characters long" }),
    lastName:z.string().max(50, { message: "lastName must be 50 or less characters long" })
})
router.put("/updateDetail",userAuth,async (req,res)=>{
   
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        updateDetails.parse({firstName,lastName})
    } catch (error) {
        return res.status(411).json({
            message: "Invalid input",
            errors: error.errors.map(err => err.message),
        });
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token,JWT_SECRET)
    const newUser = decode.newUser;
    
    try {
        if(firstName )
        await User.updateOne({_id:newUser},{firstName,lastName})
        return res.status(200).json({
            msg:"Details changed successfully"
        })
    } catch (error) {
        return res.status(411).json({
            msg:"Details not updated"
        })
    }
    
})



// /api/v1/user/bulk => to send all the user after filtering
// Query Parameter: ?filter=harkirat

router.get("/bulk",userAuth,async (req,res)=>{
    const filterValue = req.query.filter||"";
    const regex = new RegExp(filterValue, 'i');

    const allUsers = await User.find({$or: [
        {"firstName": regex},
        {"lastName": regex}]
    });
    
    return res.status(200).json({
        users : allUsers.map((user)=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;