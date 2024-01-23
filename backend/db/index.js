const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONOGOOS_USER}:${process.env.MONOGOOS_PASSWORD}@cluster0.ufffkaf.mongodb.net/${process.env.MONOGOOS_DATABASE}`)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    balance:{
        type:Number,
        require:true
    },
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports = {
	User,
    Account
};