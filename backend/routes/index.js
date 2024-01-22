const express = require("express");
const userRoutre = require("./userRoute")
const accountRoute = require("./accountRoute")

const router = express.Router();

router.use("/user",userRoutre)
router.use("/account",accountRoute)

module.exports = router;