const mongoose=require("mongoose");
const schema=mongoose.shcema;
const bcyrpt=require("bcrypt");
const userschema = new mongoose.schema({
    firstname:{
        type:String,
        required:[true,"please enter your name"],
        minlength:3,
        trim:true,
    },

    lastname:{
        type:String,
        required:[true,"please enter your lastname"],
        minlength:3,
        trim:true,
    },

    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required:[true,"please enter your email"],
    },

    username:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"please enter your username"],
    },

    password:{
        type:String,
        minlenght:8,
        trim:true,
        required:[true,"please enter your password"],
    },

    passwordconfirm:{
        type:String,
        minlenght:8,
        trim:true,
        required:[true,"please confirm your password"],
    },
    passwordchangedat:Date,

    role:{
        type:String,
        default:"user",
        enum:["admin","user"],
    },

    order:[
        {
            type:schema.types.objectid,
            ref:'Order',
        },
    ],
    

},
{timestamps:true}
);

userschema.pre("save",async function(next) {
    try{
        if(!this.ismodified("password")){
            return next();
        }
        this.password=await bcyrpt.hash(this.password,12);
        this.passwordconfirm=undefined;
    }
    catch(err){
        console.log(err);
    }
});

userschema.methods.checkpassword = async function(
    candidatepassword,
    userpassword
){
    return await bcyrpt.compare(candidatepassword,userpassword);
};

userschema.methods.passwordchangedaftertokenissued = function(JWTtimestamp){
    if(this.passwordchangedat){
        const passwordchangetime =parseInt(
            this.passwordchangedat.gettime()/1000, 
            10
        );
        return passwordchangetime>JWTtimestamp;
    }
    return false;
}

module.exports=mongoose.model("User",userschema);