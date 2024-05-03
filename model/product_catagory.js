const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Productcatagory = new Schema({
    Product_catagory:{
        type:Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    description:{
        type:String,
        required:true
    },
})
const Product_catagory = mongoose.model('product_catagory',Productcatagory)
module.exports = Product_catagory