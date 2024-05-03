const ADMIN = require("../model/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
 
exports.SECURE = async function (req,res,next){
    try {
        const token = req.headers.authorization;
        if (!token) {
      res.status(401).json({ message: "Token not Attach"});
        }
        const checktoken = await jwt.verify(token , "admin")
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
exports.SignAdmin = async function (req, res) {
  try {
    const signup = req.body;
    if (!signup.name || !signup.email || !signup.password) {
      res.status(401).json({ message: "Please Enter All Data" });
    }
    signup.password = await bcrypt.hash(signup.password, 10);
    const userdata = await ADMIN.create(req.body);
    const token = jwt.sign ({id:userdata._id},'admin')
    res.status(201).json({
      message: "Created Success",
      success: true,
      Data: userdata,
      Token:token
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false,
    });
  }
};
exports.LoginAdmin = async function (req, res) {
  try {
    const Login = req.body;
    if (!Login.email || !Login.password) {
      res.status(401).json({ message: "Please Enter Email Or Password" });
    }
    const Checkmail = await ADMIN.findOne({ email: Login.email });
    if (!Checkmail) {
      res.status(401).json({ message: "Email Wrong" });
    }
    const passvalid = await bcrypt.compare(Login.password, Checkmail.password);
    if (!passvalid) {
      res.status(401).json({ message: "Email Or Password Not Found" });
    }
    res.status(200).json({ message: "Login Success", success: true, Data: Checkmail });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false,
    });
  }
};
