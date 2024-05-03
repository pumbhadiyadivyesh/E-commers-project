const { sign } = require("jsonwebtoken");
const { create, find } = require("../model/product_catagory");
const USER = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.SECURE = async function (req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Token not Attach" });
    }
    const checktoken = await jwt.verify(token, "user")
    const istoken = await ADMIN.findById(checktoken.id)
    if (!istoken) {
      throw new Error("User Is Not Found")
    }
    next()
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false,
    });
  }
}
//signup
exports.signup = async function (req, res) {
  try {
    const signuser = req.body;
    if (
      !signuser.username ||
      !signuser.email ||
      !signuser.MobileNumber ||
      !signuser.password
    ) {
      res.status(400).json({ message: "Fields All Data" });
    }
    signuser.password = await bcrypt.hash(signuser.password, 10);
    const userdata = await USER.create(signuser);
    const token = await jwt.sign({ id: userdata._id }, "user");
    res.status(201).json({
      status: "Success",
      message: "User SignUp Successfuly",
      Data: userdata,
      Token: token,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};

//Login

exports.Login = async function (req, res) {
  try {
    const Login = req.body;
    let CheckMail = await USER.findOne({ email: req.body.email });
    if (!CheckMail) {
      CheckMail = await USER.findOne({ username: req.body.email });
    }
    if (!CheckMail) {
      CheckMail = await USER.findOne({ MobileNumber: Login.email });
    }
    if (!CheckMail) {
      throw new Error("Email or Username or Number Not Found");
    }
    Checkpass = await bcrypt.compare(Login.password, CheckMail.password);
    if (!Checkpass) {
      throw new Error("Password Or Email Wrong");
    }
    res.status(201).json({
      status: "success",
      message: "Login Successfuly",
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
};
