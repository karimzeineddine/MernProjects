const user=require("../models/userschema");
const validator=require("validator");


exports.signup=async (req,res) =>{
    try{
        if(!validator.isEmail(req.body["email"])){
            return res
            .status(400)
            .json({message:"invalid email address"});
        }
        const checkuserexistence= await user.findone({
            $or:[{email:req.body["email"] }, {username:req.body["username"] }],
        });

        if(checkuserexistence){
            return res.status(409).json({message: "user already exists"});
        }

        if(req.body["passsword"] !== req.body["passwordconfirm"]){
            return res.status(400).json({message: "please enter matching password and password confirm"});
        }

        const newuser=await user.create({
            firstname:req.body["firstname"],
            lastname:req.body["lastname"],
            username:req.body["username"],
            email:req.body["email"],
            phonenumber:req.body["phonenumber"],
            password:req.body["password"],
            confirmpassword:req.body["confirmpassword"],
            passwordchangedat: Date.now(),
        });
        return res.status(201).json({message:"signup successfuly"});
    }
    catch(err){
        console.log(err);
        return res
        .status(500)
        .json({message: err,message});
    }
};

exports.login= async(req,res)=>{
    try{
         const email=req.body["email"];
         const password=req.body["password"];//or we can use const{email,passwrod}=req.body;

         const user=await user.findone({email});
         if(!user || !(await user.checkpassword(password,user.password))){
            return res.status(401).json({message : "invalid credentials"});
         }
         return res.status(200).json({message: "logged in successfully"});
    }
    catch(err){
        console.log(err);
        return res
        .status(500)
        .json({message: err,message});
    }
}

