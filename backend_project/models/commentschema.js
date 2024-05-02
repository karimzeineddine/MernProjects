const mongoose=require('mongoose');
const schema=mongoose.schema;

const commentschema =new schema({

    commentowner:{
        type:schema,types,objectid,
        ref:"user",
    },

    parentpost:{
        type:schema,types,objectid,
        ref:"post",
    },

    content:{
        type:String,
        default:"",
        maxlength:400,
    },
},
{timestamps:true}
);

module.exports=mongoose.model("comment",commentschema);