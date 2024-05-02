const User=require("../models/usermodel");
const Cart=require("../models/cartmodel");
const Product=require("../models/productmodel");

exports.addtocart =async (req,res)=>{
        try{
            const cartowner=await User.findone({_id: req.user._id});
            if(!cartowner){
              return  res.status(404).json({message:"a cart should have an owner"});
            }

            const cart= await Cart.findone({_id:cartowner._id});

            const product= await Product.findone({_id: req.body.product});

            if(!product){
                return res.status(404).json({message:"product not found"});
            }
            let productprice =product.productprice;
            let productquantity=req.body.productquantity;
            if(productquantity<product.productquantity){
                return res
                .status(409)
                .json({message: "sorry we dont have the requested quantity"});
            }
            let price=productprice *productquantity;
            product.productquantity = product.productquantity -productquantity;

            await product.save();
            if(!cart){
                const newcart = await Cart.create({
                    cartowner: cartowner._id,
                    product:[req.body.products],
                    totalprice:price,
                });
                return res.status(200).json(newcart);
            }
            cart.products.push(req.body.products);
            cart.totalprice= cart.totalprice+price;
            await cart.save();

            return res.status(200).json({cart});
    }
    catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
}