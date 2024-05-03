const Productctg = require('../model/product_catagory')

exports.ProductCtgAdd = async (req, res) => {
  try {
      const  Produc = req.body
      const product_type = await Productctg.create(Produc)
      res.status(201).json({
        status: "Success",
        message:"Created Success",
        Data:product_type
      })
  } catch (error) {
    res.status(404).json({
        message:error.message,
        success:false
    })
  }
};
exports.GetAllData = async function(req,res){
  try {
    const GetData = await Productctg.find(req.body).populate("Product_catagory")
    res.status(202).json({
      status: "Success",
      message:"Successfully get data",
      Data:GetData
    })
  } catch (error) {
    res.status(404).json({
        message:error.message,
        success:false
    })
  }
};
exports.DeletdProductctg = async function(req,res){
  try {
     await Productctg.findByIdAndDelete(req.query.id)
     res.status(200).json({
      status: "Success",
      message:"Data Deleted",
     })
  } catch (error) {
    res.status(404).json({
        message:error.message,
        success:false
    })
  }
};
exports.UpdateProductctg = async function(req,res){
  try {
    const UpdatedData = await Productctg.findByIdAndUpdate(req.query.id,req.body)
    if (!UpdatedData) {
      throw new Error("Data Not Found")
    }else{
      res.status(201).json({
        status: "Success",
        message:"Data Updated",
        Data:UpdatedData
      })
    }
    
  } catch (error) {
    res.status(404).json({
        message:error.message,
        success:false
    })
  }
}

 
