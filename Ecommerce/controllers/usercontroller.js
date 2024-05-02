const User=require("../models/usermodel");
const Validator=require("validator");
const Jwt=require=("jwt");
const {promisify}=require("util");

const signtoken=(id) =>{
    return Jwt.sign({id},process.env.JWT_SECRET,{
        expiresin:process.env.JWT_EXPIRES_IN,
    });
};

const createsendtoken=(User,statuscode,res) =>{
    const token=signtoken(User._id);
    res.status(statuscode).json({
        status:"success",
        token,
        data:{
            User,
        },
    });
};

exports.signup = async (req,res)=>{
    try{
        const emailcheck=await User.findone({email: req.body.email});
        if(emailcheck){
            return res.status(409).json({message: "the email is already in use"});
        }
        if(!Validator.isEmail(req.body.email)){
            return res.status(400).json({message:"the email is not valid"});
        }

        if(req.body.password !== req.body.passwordconfirm){
            return res.status(400).json({message:"password and password confirm dont match"});
        }

        const newuser =await User.create({
            firstname:req.body.firstname,
            lasttname:req.body.lasttname,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            passwordconfirm:req.body.passwordconfirm,
            role:req.body.role,
        });

        createsendtoken(newuser, 201, res);
    }
    catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
};

exports.login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user =await User.findone({email});
        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        if(!(await user.checkpassword(password,user.password))){
            return res.status(401).json({ message: "Incorrect email or password"});
        }
        createsendtoken(user, 200, res);
    }
    catch(err){
        console.log(err);
    }
};

exports.protect = async(req,res,next)=>{
    try{
        let token;
        if(req.header.authorization && req.headers.authorization.startwith("Bearer")){
            token =req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message: "your not logged in"});
        }
        let decoded;
        try{
            decoded=await promisify(Jwt.verify)(token,process.env.JWT_SECRET);
        }
        catch(error){
            if(error.name ==="jsonwebtokenerror"){
                return res.status(401).json("invalid token");
            }
            else if(error.name ==="tokenexpirederror"){
                return res
                .status(401)
                .json("your session token has expired!! login again");
            }
        }

        const currentuser =await User.findbyid(decoded.id);
        if(!currentuser){
            return res.status(401).json({message:"the token owner no longer exists"});
        }

        if(currentuser.passwordchangedaftertokenissued(decoded.iat)){
            return res.status(401).json({message: "your password has been change, please log in again!!"});
        }
        req.User=currentuser;
        next();
    }
    catch(err){
        console.log(err);
    }
};