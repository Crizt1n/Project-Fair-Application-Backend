
//import model in the controller
const e = require('express');
const users = require('../Models/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

// logic for register
exports.register = async(req,res)=>{
    //logic
    console.log(`inside userController-register logic`);

    //DESTRUCTURING DATA FROM THE CLIENT REQUEST BODY(SINCE JSON FORMAT IS CONVERTED INTO JAVASCRIPT OBJECT BY THE .JSON() METHOD USED IN THE INDEX.JS FILE)
    try{ // to resolve runtime errors using try catch-block, so the error chance portions are placed in try and resolve portions are placed in catch   
        const {username, email, password}= req.body

                //SINCE EMAIL IS THE UNIQUE VALUE WE ARE CHECKING THAT EMAIL IS ALREADY PARENT IN THE DATABASE 
                //FOR THAT WE ARE USING FINDONE METHOD WHICH RETURN ENTIRE DOCUMENT WHEN THE CONDITION IS TRUE ELSE RETURN NULL
                const existingUser = await users.findOne({email})

                if(existingUser){
                    //IF FINDONE RETURN DOCUMENT IT MEANS THAT THE USER ALREADY EXIST
                    //SO WE ARE SENDING A RESPONSE IN THE 400 SERIES(CLIENT REQUEST ERROR)
                    res.status(406).json('Account already Exists...Please Login!')
                }
                else{

                //IF FINDONE RETURNS NULL, IT MEANS THE EMAIL OR THE USER DOESNOT EXIST IN THE DATABASE 
                //SO WE REGISTER THE USER

                    // 1) CREATE AN OBJECT FOR THE MODEL 
                    const newUser = new users({
                        username,
                        email,
                        password,
                        github:"",
                        linkedin:"",
                        profile:""
                    })

                    // 2) TO ADD THE ABOVE OBJECT USE SAVE() METHOD IN MONGOOSE
                    await newUser.save()

                    //RESPONSE
                    res.status(200).json(newUser)
                }
        }catch(err){
            res.status(401).json('Register request Failed due to ',err)
        }



}

//logic for login

exports.login = async(req,res)=>{
    console.log('inside login Function');

    const {email,password} = req.body

    try{  const existingUser = await users.findOne({email,password})

    if(existingUser){
        //sign is the function used to create token
        //first argument is payload - the information that is secretly transmitted
        //second arg - secret key - based on which the token is generated.
        const token = jwt.sign({userId: existingUser._id },"supersecretkey12345")
        res.status(200).json({
            existingUser, 
            token
        })

    }
    else{
        res.status(404).json('Invalid Email id or Password')
    }
    }catch(err){
    res.status(401).json('Loign request Failed due to :',err)
    }
}


//FOR EDITING PROFILE

    exports.editUser = async(req,res)=>{
        const userId = req.payload
        const{username,email,password,github,linkedin,profile}=req.body


        const profileImage = req.file?req.file.filename:profile

        try {
            const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

            await updateUser.save()
            res.status(200).json(updateUser)

        } catch (err) {
            res.status(401).json(err)
            
        }
    }