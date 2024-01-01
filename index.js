
// 1) Import .env
// Loads .env file contents into process.env by default
require('dotenv').config()

// 2) import Express
// to create server
const express = require('express')

// 3) Import CORS
// to communicate with the server
const cors = require('cors')

// import connection.js
//this import should be given after/below .env file import which is imported in the top
require("./DB/connections")

// import router
 const router = require('./Routes/router')

// 4) Create Server
const pfServer = express()

// 5) Use of Cors by server
pfServer.use(cors())

// 6) Returns middleware that only parses json and converts it inot javascript object.
pfServer.use(express.json())

//servre use router

pfServer.use(router)

//pfserver should use uploads folder
//first argument - how the other pplication should use this file
//second argument - to export the upload folder
pfServer.use('/uploads',express.static('./uploads'))

// 7) Customsie the port - by default run = 3000
const PORT = process.env.PORT || 4000;

// 8) Run the server
pfServer.listen(PORT, () => {
    console.log(`Server running Successfully at PORT number : ${PORT}`);
});

// 9) get http request to baseurl - http://localhost:4000/
pfServer.get('/',(req,res)=>{
    res.send(`<h1 style ="color:blue">Project Fair server running successfully and waiting for the Client request</h1>`)
}) // for autocompilation install nodemon npm i -g nodemon

/* // post request 
pfServer.post('/',(req,res)=>{
    res.send('POST REQUEST SUCCESSFULL')
})

//Put request
pfServer.put('/',(req,res)=>{
    res.send('PUT REQUEST SUCCESSFULL')
}) */



