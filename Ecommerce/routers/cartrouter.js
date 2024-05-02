const express= require("express");
const router=express.Router();
const usercontroller = require ("../controllers/usercontroller");
const cartcontroller = require ("../controllers/productcontroller");


router.post("/addtocart", usercontroller.protect, cartcontroller.addtocart);

module.exports=router;