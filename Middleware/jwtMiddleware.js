
//import jwt (Json Web Token)

const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt Middleware');
    //logic for verifying token
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try{
        //first argument for verify should be token and the second argument should be the secret key
        const jwtResponse = jwt.verify(token,"supersecretkey12345")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()

    }catch(err){
        res.status(401).json('Authorization Failed...Please Login again')
    }


    
}

module.exports = jwtMiddleware