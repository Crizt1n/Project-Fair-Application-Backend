

//import projectSchema
const projects = require('../Models/projectSchema')

//add project 

exports.addproject= async(req,res)=>{
    console.log('inside add project request');

    const userId = req.payload
    console.log(userId);

    const projectImage = req.file.filename
    
    const {title, language, github, website, overview} = req.body
    console.log(`${title}, ${language}, ${github}, ${website}, ${overview}, ${projectImage}`);

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json(`Project Already Exists.!! Upload New Project.!!`)
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }

    } catch (err) {
        res.status(401).json(`Request Failed due to ${err}`)
        
    }

   /*  res.status(200).json('add project request recieved') */

}

// to get HOME Project

exports.getHomeProject = async(req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    } catch (err) {
        res.status(401).json('Request Failed due to ',err)
    }
}
// to get all Project

exports.getAllProject = async(req,res)=>{
    const searchkey = req.query.search
    console.log(searchkey);

    const query={
        language:{
            //regular expression, option - to remove case sensitive property
            $regex:searchkey, $options:'i'
        }
    }

    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)

    } catch (err) {
        res.status(401).json('Request Failed due to ',err)
        
    }
}


// to get USer Project

exports.getUserProjects = async(req,res)=>{
    const userId = req.payload
    try {
        const allUserProject = await projects.find({userId})
        res.status(200).json(allUserProject)

    } catch (err) {
        res.status(401).json('Request Failed due to ',err)
        
    }
}

//to edit project

exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title,language,github,website,overview,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadProjectImage,userId},{new:true}) // new is given to save 

        await updateProject.save()
        res.status(200).json(updateProject)

    } catch (err) {
        res.status(401).json(err)
        
    }
}

// to delete project

exports.deleteUserProject = async(req,res)=>{
    const {id} = req.params

    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    } catch (err) {
        res.status(401).json(err)
        
    }
}