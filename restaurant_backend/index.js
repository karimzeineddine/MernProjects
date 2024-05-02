const express=require('express');
const app =express();
const db=require("./database").connectdb;

db();

app.use(express.json())

app.listen(3000,() => {
      console.log("server is running on port 3000");
});