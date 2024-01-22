const express = require("express");


const router = express.Router();

router.post("/signin",(req,res)=>{
    res.status(200).json({
        msg:"signin is okey"
    })
})
router.post("/signup",(req,res)=>{
    res.status(200).json({
        msg:"signup is okey"
    })
})
router.post("/changePassword",(req,res)=>{
    res.status(200).json({
        msg:"changePassword is okey"
    })
})

module.exports = router;