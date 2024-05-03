const mongoose = require('mongoose')
const { schema } = require('./AdminModel')
const Schema = mongoose.Schema

const ProductData = new Schema({
    productname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    Reviews:{
        type:String,
        required:true
    }
},{timestamps:true});

const Product = mongoose.model('product',ProductData)
module.exports = Product