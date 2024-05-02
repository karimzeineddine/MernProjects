const mongoose=require('mongoose');
const schema=mongoose.schema;

const friendrequestschema=new schema({
    sender:{
        type:schema.types.objectid,
        ref:"user",
    },

    reciever:{
        type:schema.types.objectid,
        ref:"user",
    },

    requeststatus:{
        type:String,
        default:"pending",
        enum:["pending","accepted","rejected","cancelled"],
    },
},
{ timestamp:true }
);

module.exports=mongoose.model("friendrequest",friendrequestschema);