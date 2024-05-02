const mongoose=require("mongoose");
const schema=mongoose.shcema;

const cartschema = new mongoose.schema({
    cartowner:{
        type:schema.types.objectid,
        ref:'User',
        required:true,
    },

    product:[
        {
            type:schema.types.objectid,
            ref:'Product', 
        }
    ],

    totalprice:{
        type:schema.types.decimal128,
        default:0.0,
    },

},
{timestamps:true}
);

module.exports=mongoose.model("Cart",cartschema);