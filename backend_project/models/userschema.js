const mongoose=require('mongoose');
const schema=mongoose.schema;
const bcrypt=require("bcrypt");

const userschema= new schema({
    firstname:{
        type:String,
        required: [true,"first name is required"],
        trim:true,
        maxlength:50,
        minlength:3,
    },

    lastname:{
        type:String,
        required: [true,"last name is required"],
        trim:true,
        maxlength:50,
        minlength:3,
    },

    username:{
        type: String,
        unique: true,
        required: [true,"username is required"],
        trim: true,
        maxlength:20,
    },

    email:{
        type:String,
        unique:true,
        required:[true,"email is required"],
        trim: true,
        maxlength:150,
        lowercase:true,
    },

    phoneumber:{
        type:String,
        unique:true,
        required:[true,"phone number is required"],
        trim: true,
        maxlength:150,
    },

    profilepicture:{
        type:String,
        default:"",
    },

    friends:[
        {
            type:schema.types.objectid,
            ref:"user",
        },
    ],

    followers:[
        {
            type:schema.types.objectid,
            ref:"user",
        },
    ],

    following: [
        {
            type:schema.types.objectid,
            ref:"user",
        },
    ],

    password:{
        type:string,
        required:true,
        trim:true,
        minlength:8,
    },

    confirmpassword:{
        type:String,
        trim:true,
        minlength:8,
    },

    passwordchangedat:Date,
},
{timestamp: true}
);

userschema.pre("save",async function (next){
    try{
        if(!this.ismodified("password")){
           return next();
        }
        this.password= await bcrypt.hash(this.password,12);
        this.confirmpassword= undefined;
    }
    catch(err){
        console.log(err);
    }
});

userschema.methods.checkpassword =async function(
    userpassword,//coming from the frontend
    userpassword //the hashed saved password coming from the db
    ){
        return await bcrypt.compare(userpassword,userpassword);
    };
module.exports=mongoose.model("user",userschema);