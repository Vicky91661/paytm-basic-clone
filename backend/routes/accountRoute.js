const express = require("express");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

const userAuth = require("../middlewares/userMiddleware/userAuth")

const router = express.Router();

const {Account} = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance",userAuth,async (req,res)=>{
    const headerToken = req.headers.authorization;
    const token=headerToken.split(' ')[1]
   
    const decode = jwt.verify(token,JWT_SECRET)
    const userId = decode.userId;
   
    try {
        const accountDetails = await Account.findOne({userId})
     
        res.status(200).json({
            balance:`Rs ${accountDetails.balance}`
        })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            msg:"error while fetching balanced"
        })
    }
  
})

router.post("/transferMoney",userAuth,async (req,res)=>{
    

    const to = req.body.to;
    const amount = req.body.amount ;
    console.log("receiver is ",to);
    console.log("amount to send is",amount)

    try {

        const session = await mongoose.startSession();
        session.startTransaction();

        const headerToken = req.headers.authorization;
        const token=headerToken.split(' ')[1]
        
        const decode = jwt.verify(token,JWT_SECRET)
        const userId = decode.userId;
        console.log("sender id is =>",userId)
        const SenderAccount = await Account.findOne({userId}).session(session)
        console.log("sender Account is =>",SenderAccount)

        if(!SenderAccount){
            await session.abortTransaction();
            return  res.status(400).json({
                message:"Invalid User's Account"
            })
        }
        if(SenderAccount.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Not sufficient money to send"
            })
        }

        const ReceiverAccount = await Account.findOne({userId:to}).session(session);
        console.log("Receiver Acccount is => ",ReceiverAccount)
        if(!ReceiverAccount){
            await session.abortTransaction();
            return  res.status(400).json({
                message:"reveiver has not created an balance account"
            })
        }

        //perform the Transaction

        await Account.updateOne({userId},{$inc:{balance:-amount}}).session(session)
        await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

        //Commit the transaction

        await session.commitTransaction();

        return res.status(200).json({
            message:"transction done"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"transaction fails"
        })
    }
    
})

module.exports = router;