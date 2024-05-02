const mongoose=require('mongoose');
const schema=mongoose.schema;

const postschema=new schema({
     postowner:{
        type:schema.types.objectid,
        ref:"user",
        required:true,
     },

     img:{
        type:String,
        defualt:"",
        required:true,
     },

     caption:{
        type:String,
        defualt:"",
        maxlength:250,
        required:true,
     },

     content:{
        type:String,
        defualt:"",
        maxlength:1000,
        required:true,
     },

     
     video:{
        type:String,
        defualt:"",
     },

     likes:[
        {
            type:schema.types.objectid,
            ref:"user",
        },
     ],

     comments:[
        {
            type:schema.types.objectid,
            ref:"comment",
        },
     ],  
},
{timestamps:true}
);

module.exports=mongoose.model("post",postschema);