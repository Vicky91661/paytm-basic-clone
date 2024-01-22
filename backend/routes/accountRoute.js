const express = require("express");


const router = express.Router();

router.get("/balance",(req,res)=>{
    res.status(200).json({
        msg:"balance is okey"
    })
})

router.post("/transferMoney",(req,res)=>{
    res.status(200).json({
        msg:"transferMoney is okey"
    })
})

module.exports = router;