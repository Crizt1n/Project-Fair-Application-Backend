//import mongoose 
const mongoose = require('mongoose')

//establish connection string of mongodb with mongoose
const connectionString = process.env.DATABASE

//connect to mongo db using mongoose
mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connected successfully');
}).catch((err)=>{
    console.log('Mongodb connection failed due to :'+err);
})