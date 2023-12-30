// 1)import multer

const multer = require("multer")

// storage creation - disk storage is used to create storage space

const storage = multer.diskStorage({
    //it have two keys -  first one is destination and the second one is filename
    //destination - where the file is stored
    //filename - the name in which the file is stored in the destination
    destination:(req,file,callback)=>{
        callback(null, './uploads')
    },
    //filename - the name in which the file is stored in the destination 
    filename:(req,file,callback)=>{
        //now() -Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)

    }
})

//fileFilter

const fileFilter = (req, file, callback)=>{
    if(file.mimetype===`image/png` || file.mimetype===`image/jpeg` || file.mimetype===`image/jpg`){
        callback(null,true)
    }

    else{
        callback(null,false)
        return callback(new Error ("Only png, jpeg, jpg files  will be allowed !!"))
    }
}


// 2)create multer configuartion

const multerConfig = multer({
    storage,
    fileFilter

})


// 3)export multer
module.exports = multerConfig