const mongoose =require ("mongoose");
require("dotenv").config();

mongoose.set("strictQuery",true);

exports.connectDB=async () =>{
    try{
      await mongoose.connect(process.env.MongoDB_URI);
      console.log("mongoDB connected!!")
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
};
