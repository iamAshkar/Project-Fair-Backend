//1 import mongoose
const mongoose = require('mongoose')

//2 difine connection string
const connectionString = process.env.DATABASE

//3connection code
mongoose.connect(connectionString)
.then(()=>{
    console.log(" mongodb atlas connection established");
})
.catch((error)=>{
    console.log("mongodb atlas connection error",error);
})
