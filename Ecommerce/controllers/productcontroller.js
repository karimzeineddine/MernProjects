const User=require("../models/usermodel");
const Product=require("../models/productmodel");

const checkadmin = async (req) => {
    try{
        const user= await User.findone({ _id: req.user._id});
        if(!user || user.role!== "admin"){
            return false;
        }else{
            return true;
        }
    }
    catch(err){
        console.log(err);
    }
};


exports.createproduct =async (req,res) =>{
    try{
        const user =await checkadmin(req);
        if(user==false){
            return res.status(401).json({message: "a product should be added by an admin"});
        }

        const newproduct=await Product.create({
            productname:req.body.productname,
            productdescription:req.body.productdescription,
            productprice:req.body.productprice,
            productquantity:req.body.productquantity,
            createdby:req.user._id,
        });

        return res.status(201).json({
            message:"product has been added successfully",
            product: newproduct,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};



exports.updateproduct = async (req,res)=>{
    try{
        const user =await checkadmin(req);
        if(user !==true){
            return res.status(401).json({message:"only admin can update this product"});
        }
        const product =await Product.findidandupdate(
            req.params.productid,
            req.body,
            {new :true}
        );

        if(!product){
            return res.status(404).json({message:"product not found"});
        }

        return res.status(200).json({message: "product uploaded successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};

exports.deleteproduct = async (req,res)=>{
    try{
        const user =await checkadmin(req);
        if(user !==true){
            return res.status(401).json({message:"only admin can delete this product"});
        }

        const product =await Product.findbyidanddelete(
            req.params.productid,
        );

        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        return res.status(200).json({message: "product deleted"});

    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getallproducts =async (req,res)=>{
    try{
        const product= await Product.findone();
        if(!product.length <=0){
            return res.status(404).json({message:"no available products"});
        }
        return res.status(200).json(product);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};
