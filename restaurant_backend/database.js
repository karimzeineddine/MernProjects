const mongoose=require("mongoose");
require("dotenv").config();

exports.connectdb = async () => {
    try{
        await mongoose.connect(process.env.MongoDb_URI);
        console.log("Mongo DB connected");
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}