const CART=require('../model/cart')

exports.AddCart = async function(req,res){
    try {
        if (!req.body.name || !req.body.address) {
            throw new Error("Please Provide Name And Address")
        }
        const CartData = await CART.create(req.body)
        res.status(201).json({
            status:"Success",
            message:"Your Order Has Been Place Success",
            data:CartData
        })
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            message:error.message
        })
    }
}
exports.GetAllData = async function(req,res){
    try {
        const GetData = await CART.find().populate(['productId','userId'])
        res.status(200).json({
            status:"Success",
            message:"All Data Find",
            data:GetData
        })
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            message:error.message
        })
    }
}
exports.UpdateCart = async function(req,res){
    try {
       const UpdateData =  await CART.findByIdAndUpdate(req.params.id , req.body)
       res.status(202).json({
        status:"Success",
        message:"Data Update",
        data:UpdateData 
       }) 
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            message:error.message
        })
    }
}
exports.DeleteCart = async function(req,res){
    try {
        await CART.findByIdAndDelete(req.params.id)
        res.status(202).json({
            status:"Success",
            message:"Data Deleted"
        })
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            message:error.message
        })
    }
}