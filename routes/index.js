var express = require('express');
var router = express.Router();
const Adminctrls = require('../controllers/Admincnrls')
const Productctrls = require('../controllers/Productcntrls')
const product_catagory = require('../controllers/product_catagorycntrls')
const Usercntlrs = require('../controllers/usercntrl')
const Cartcntrls = require('../controllers/cartcntlrs') 
const multer  = require('multer')
/* GET home page. */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })  
  const upload = multer({ storage: storage })
//Admin SignUp And Login
router.post('/adminsign', Adminctrls.SignAdmin)
router.post('/LoginAdmin',Adminctrls.LoginAdmin)

//User SignUp And Login
router.post('/usersignup',Usercntlrs.signup);
router.post('/userlogin',Usercntlrs.Login);

//Product Api
router.post('/ProductAdd',upload.single('image'),Adminctrls.SECURE,Productctrls.ProductAdd)
router.get('/GetAllData',Adminctrls.SECURE,Productctrls.GetAllData)
router.delete('/DeletdProduct/:id',Adminctrls.SECURE,Adminctrls.SECURE,Productctrls.DeletdProduct)
router.put('/UpdateProduct/:id',Adminctrls.SECURE,Adminctrls.SECURE,Productctrls.UpdateProduct)

//product_catagory Api
router.post('/ProductCtgAdd',product_catagory.ProductCtgAdd)
router.get('/ProductCtgrGetAllData',product_catagory.GetAllData)
router.delete('/ProductCtgDeletdProductctg/:id',product_catagory.DeletdProductctg)
router.put('/ProductCtgUpdateProductctg/:id',product_catagory.UpdateProductctg)
 
//product Cart Api
router.post('/AddCart',Usercntlrs.SECURE,Cartcntrls.AddCart)
router.get('/GetAllData',Usercntlrs.SECURE,Cartcntrls.GetAllData)
router.delete('/DeleteCart/:id',Usercntlrs.SECURE,Cartcntrls.DeleteCart)
router.put('/UpdateCart/:id',Usercntlrs.SECURE,Cartcntrls.UpdateCart)


module.exports = router;
