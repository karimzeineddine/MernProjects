const mongoose=require('mongoose');
const schema=mongoose.schema;

const orderitemschema = new schema({
    
    orderitemid:{
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

    itemid:{
        type:schema.types.objectid,
        ref:"menu",
    },

    quantity:{
        type:Number,
        required:true,
    },

},
{timestamp}
);


module.export=mongoose.model("orderitem",orderitemidschema);