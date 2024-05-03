const Product = require("../model/product");

exports.ProductAdd = async (req, res) => {
  try {
    let product = req.body;
    req.body.image = req.file.filename
     if (!req.body.image) {
      throw new Error('Please Enter Image')
     } 
    const productData = await Product.create(product);
    res.status(201).json({
      success: true,
      message: "Created Success",
      Data:productData,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.GetAllData = async function (req, res) {
  try {
    const GetData = await Product.find(req.body);
    res.status(202).json({
      success: true,
      message: "Successfully get data",
      Data: GetData,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.DeletdProduct = async function (req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Data Deleted",
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
exports.UpdateProduct = async function (req, res) {
  try {
    const UpdatedData = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!UpdatedData) {
      throw new Error("Data Not Found");
    } else {
      res.status(201).json({
        success: true,
        message: "Data Updated",
        Data: UpdatedData,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
