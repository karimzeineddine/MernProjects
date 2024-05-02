const mongoose=require('mongoose');
const schema=mongoose.schema;

const paymentschema = new schema({
    
    paymentid:{
        type:mongoose.schema.types.objectid,
        index:true,
        required:true,
        auto:true,
    },

     orderid:{
        type:mongoose.schema.types.objectid,
        ref:"order",
        required:true ,
     },

     paymentdate:{
        type:Date,
        default:Date.now,
     },

     paymentmethod:{
        type:String,
        required:true,
     },

     amount:{
        type:Number,
        required:true,
     },
},
{timestamp:true}
);


module.export=mongoose.model("payment",paymentschema);