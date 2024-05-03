const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserData = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    MobileNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   
})  
const USER = mongoose.model('usermodel',UserData)
module.exports = USER