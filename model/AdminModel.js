const { strict } = require('assert')
const mongoose = require('mongoose')
const { type } = require('os')
const Schema = mongoose.Schema

const AdminData = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
});
const ADMIN = mongoose.model("AdminModel",AdminData);
module.exports = ADMIN