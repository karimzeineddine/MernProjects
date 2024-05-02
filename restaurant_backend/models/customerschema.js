const mongoose=require('mongoose');
const schema=mongoose.schema;

const customerschema = new schema({
    
    customerid:{
       type:mongoose.schema.types.objectid,
       index:true,
       required:true,
       auto:true,     
    },

    customername:{
        type:String,
        required: [true,"name is required"],
        trim:true,
        maxlength:50,
        minlength:3,
    },

    email:{
        type:String,
        unique:true,
        required:[true,"email is required"],
        trim: true,
        maxlength:150,
        lowercase:true,
    },

    password:{
        type:string,
        required:true,
        trim:true,
        minlength:8,
    },

    phoneumber:{
        type:String,
        unique:true,
        required:[true,"phone number is required"],
        trim: true,
        maxlength:150,
    },
},
{timestamp: true}
);

module.export=mongoose.model("customer",customerschema);