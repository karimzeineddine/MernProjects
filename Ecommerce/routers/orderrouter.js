const express= require("express");
const router=express.Router();
const usercontroller = require ("../controllers/usercontroller");
const ordercontroller = require ("../controllers/ordercontroller");


router.post("/new-order", usercontroller.protect, ordercontroller.addtocart);

module.exports=router;