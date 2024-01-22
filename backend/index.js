const express = require("express");
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
const PORT = 3000;

bodyParser.json()

const mainRouter = require("./routes/index")

app.use(cors())
app.use("/api/v1",mainRouter)


// /api/v1/user/signin
// /api/v1/user/signup
// /api/v1/user/changepassword


// /api/v1/account/transferMoney
// /api/v1/account/balance

app.listen(PORT,()=>{
    console.log("Backend is connected to the port number",PORT)
})

