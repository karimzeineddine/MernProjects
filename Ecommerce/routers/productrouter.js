const express= require("express");
const router=express.Router();
const usercontroller = require ("../controllers/usercontroller");
const productcontroller = require ("../controllers/productcontroller");

router.post(
    "/create-product",
    usercontroller.protect,
    productcontroller.createproduct
);

router.patch(
    "/updateproduct/:productid",
    usercontroller.protect,
    productcontroller.createproduct
);

router.delete(
    "/deleteproduct/:productid",
    usercontroller.protect,
    productcontroller.deleteproduct
);

router.get(
    "/allproducts",
    productcontroller.getallproducts
);

module.exports=router;




