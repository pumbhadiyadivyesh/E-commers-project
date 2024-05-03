const mongoose = require('mongoose')
const Product = require('./product')
const Schema = mongoose.Schema

const cartdata = new Schema({
    name:{
        type:String,
        required:true
    },
    productId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    } 
})
const CART =mongoose.model('cart',cartdata)
module.exports = CART