//model is created using mongoose 

//import mongoose
const mongoose = require('mongoose')
//imoprt validator
const  validator = require('validator')

//create schema- use schema class in mongoose

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min:['3','Must be atleast 3 Characters long, got only {value}',]
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type: String,
        require:true
        // we can also set 8 character validation for password 
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})


// create model
const users = mongoose.model("users",userSchema)

//export the model
module.exports = users 