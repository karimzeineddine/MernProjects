const mongoose=require('mongoose');
const schema=mongoose.schema;

const menuschema = new schema({
    
    itemid:{
        type:mongoose.schema.types.objectid,
        index:true,
        required:true,
        auto:true,     
     },

    name:{
        type:String,
        required: [true,"name is required"],
        trim:true,
        maxlength:70,
        minlength:3,
    },
    
    description:{
        type:String,
        maxlength:1000,
        minlength:5,
        required:true,
    },
   
    price:{
        type:Number,
        required:true,
    },

},
{timestamp: true}
);

module.export=mongoose.model("menu",menuschema);