const User=require("../models/usermodel");
const Cart=require("../models/cartmodel");
const Order=require("../models/ordermodel");

exports.createneworder= async (req,res)=>{
    try{
        const cart = await Cart.findone({_id :req.body.cartid});
        if(!cart){
            return res.status(404).json({message:"cart not found"});
        }
        const cartowner=await User.findone({_id :req.body.cartowner});
        if(!cartowner){
            return res.status(404).json({message:"user not found"});
        }

        const neworder= new Order({
            orderowner:cartowner._id,
            items:cart.products,
            status:"pending",
        });

        await neworder.save();
        cart.products=[];
        await cart.save();

        res.status(200).json({message:"order created"});
    }
    catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
}