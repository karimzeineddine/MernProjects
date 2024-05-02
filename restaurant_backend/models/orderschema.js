const mongoose=require('mongoose');
const schema=mongoose.schema;

const orderschema = new schema({
    
    orderid:{
        type:mongoose.schema.types.objectid,
        index:true,
        required:true,
        auto:true,     
    },

    customerid:{
        type:mongoose.schema.types.objectid,
        ref:"customer",
        required:true ,
    },

    orderitem:[
       orderitem
    ],

    orderdate:{
        type:Date,
        default: Date.now,
    },

    totalprice:{
        type:Number,
        required:true,
    },
},
{timestamp: true}
);

module.export=mongoose.model("order",orderschema);