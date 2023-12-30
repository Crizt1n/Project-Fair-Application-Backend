// Path to reslove the client request

// 1) import express
const express = require('express')

// import controller
const userController =require('../controllers/userController')

//import project Controller
const projectController = require('../controllers/projectController')

//import jwtMiddleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')

//import multer
const multerConfig = require('../Middleware/multerMiddleware')

// 2) Create an Object for the class Router in express
const router = new express.Router()

// 3) Path/Logic for resolving the request
    //syntax:- router.httprequest('path to resolve request',()=>{how to resolve the request- 'inside controller'})
    //a) Register
        router.post('/user/register',userController.register)

    //b) Login
        router.post('/user/login',userController.login)

    //c) Add project
    router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addproject)

    //get home projects
    router.get('/projects/home-project',
    projectController.getHomeProject)

    //get all projects
    router.get('/projects/all-project',
    jwtMiddleware,projectController.getAllProject)

    //get user Project
    router.get('/user/all-project',jwtMiddleware,
    projectController.getUserProjects)

    //edit project
    router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)

    //delete project
    router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)

    //edit profile
    router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)

// 4) Export Router 
module.exports = router