const mongoose=require("mongoose");
const schema=mongoose.shcema;

const productschema =new mongoose.schema({
    productname:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"add the product name"],
        minlength:3,
    },

    productdescription:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"add the product description"],
        minlength:3,
        maxlength:255,
    },

    productimage:{
        type:String,
        default:"",
    },

    productprice:{
        type:schema.types.decimal128,
        default: 0.00,
        required:[true,"add the product price"],
    },

    productquantity:{
        type:Number,
        default:0,
        required:[true,"add the product quantity"],
    },

    createby:{
        type:schema.types.objectid,
        ref:'User',
    },
},
{timestamps:true}
);

module.exports=mongoose.model("Product",productschema);