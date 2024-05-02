const customer=require("../models/customerschema");


exports.registration=async(req,res)=>{

    try{
        const{ customername, email, password, phonenumber }=req.body;
        const existinguser= await customername.findone({email});
        if(existinguser){
            return res.status(400).json({message:'customer already exists'});
        }
        const newcustomer= new customer ({ customername, email, password, phonenumber });
        await newcustomer.save();
        res.status(201).json({message: 'customer registered succesfully',customer:newcustomer});
    }

    catch(error){
        console.error('error registrating customer',error);
        res.status(500).json({message: 'internal server error'});
    }

};

exports.login=async(req,res)=>{
    try{
        const{ email, password }=req.body;
        const customer= await customer.findone({email});
        if(!user){
            return res.status(404).json({message: 'customer not found'});
        }
        const validpassword=await customer.isvalidpassword(password);
        if(!validpassword){
            return res.status(401).json({message: 'Invalid password'});
        }
        res.status(200).json({message:'customer loggedin successfully',customer});
    }
    catch(error){
        console.error('Error logging in customer:',error);
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.deleteaccount=async(req,res)=>{
    try{
        const{ customerid }=req.params;
        const customer=await customer.findbyidanddelete(customerid);
        if(!customer){
            return res.status(404).json({message: 'customer not found'});
        }
        res.status(200).json({message:'customer account deleted successfully'});
    }

    catch(error){
        console.error('Error deleting customer account:',error);
        res.status(500).json({message: 'Internal server error'});
    }
};

module.exports=customercontroller;