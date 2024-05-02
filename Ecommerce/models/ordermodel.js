const mongoose=require("mongoose");
const schema=mongoose.shcema;

const orderschema = new mongoose.schema({
    orderowner:{
        type:schema.types.objectid,
        ref:'User',
        required:true,
    },

    items:[
        {
            type:schema.types.objectid,
            ref:'Product',
        },
    ],

    orderstatus:{
        type:String,
        default:"pending",
        enum:["pending","cancelled","completed"],
    },

},
{timestamps:true}
);


module.exports=mongoose.model("Order",orderschema);