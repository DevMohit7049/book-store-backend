const mongoose = require("mongoose");
require('dotenv').config()
const mongoURL = process.env.CLOUD_DB_URL;
//  const mongoURL = process.env.LOCAL_DB_URL;

mongoose.connect(mongoURL)
.then(()=>{
    console.log("Database Connected...");
})
.catch((err)=>{
    console.log("Connction Faild due to follwoing error=>",err);
})