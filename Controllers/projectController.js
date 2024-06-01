const project = require('../Models/projectSchema')
//add project logic
exports.addProject = async (req, res) => {
    console.log("Inside the addProject method");
    const { title, language, github, livelink, overview } = req.body
    const projectImage = req.file.filename 
    const userId = req.payload
    console.log(title, language, github, livelink, overview, projectImage);
    console.log(userId);
    try {
        const existingProject = await project.findOne({ github })

        if (existingProject) {
            res.status(404).json("project already exists")
        } else {
            const newProject = new project({ title, language, github, livelink, overview, projectImage, userId })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
}
//1 get a particular project details
exports.getAUserproject = async (req,res)=>{
    //get user id and particular user project
    const userId = req.payload
    try{
        const Aproject = await project.find({userId})
        if (Aproject) {
            res.status(200).json(Aproject)
        }else{
            res.status(401).json("Can't find project")

        }
    }catch (err){
        res.status(401).json({message:err.message})

    }
}
//2 get 3 projects details for home project
exports.getHomeProjects = async (req,res)=>{
    try{
        const homeProjects = await project.find().
        limit(3)
        if (homeProjects) {
            res.status(200).json(homeProjects)
        }else{
            res.status(401).json("Can't find project")

        }
    }catch (err){
        res.status(401).json({message:err.message})

    }
}
//3 get all projects details
exports.getAllUserProjects = async (req,res)=>{

    const searchKey = req.query.search
    console.log(searchKey);
    //avoid case sensitivity
    let query ={}
    if(searchKey){
       query.title={ $regex :searchKey, $options :"i"} // 5 search nte code 
    }

    try{
        const AllUserProjects = await project.find(query)
        if (AllUserProjects) {
            res.status(200).json(AllUserProjects)
        }else{
            res.status(401).json("Can't find project")

        }
    }catch (err){
        res.status(401).json({message:err.message})

    }
}
//4   delete user project
exports.deleteUserProject = async(req,res)=>{
    const {pid} = req.params //get project id
    try{
    const deleteUserProject = await project.findOneAndDelete({_id:pid})
    //Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
    res.status(200).json(deleteUserProject)
    }
    catch(err){
        res.status(401).json({message:err.message})

    }
}

//5 update user project

exports.updateUserProjects = async (req,res)=>{
    const { title, language, github, livelink, overview, projectImage} = req.body
    userId = req.payload
    const {pid} = req.params
    const uploadsImage = req.file?req.file.filename:projectImage
    try{
        //find pasrticular project , update the data and save the changes
        const updateProject = await project.findByIdAndUpdate({_id:pid},{ title, language, github, livelink, overview, projectImage:uploadsImage,userId})
        await updateProject.save()
        res.status(200).json(updateProject)
 
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}

//6 update user profile

// exports.updateUserProfile = async (req,res)=>{

// }