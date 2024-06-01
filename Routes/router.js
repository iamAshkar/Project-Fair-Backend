// 1 import express
const express = require("express");

const userController = require("../Controllers/userController");
const { addProject } = require("../Controllers/projectController");
const projectController = require("../Controllers/projectController");
const jwtMiddleware = require("../Middlewares/jwtMiddleware");
const multerConfig = require("../Middlewares/multerMiddleware");

//2. create router object of express to define path
const router = express.Router();

//3.  register api call
router.post("/register", userController.register);

module.exports = router;

//4. login api call

router.post("/login", userController.login);

//5add project api call
//router middleware jwtmidleware
router.post(
    `/project/add-project`,
    jwtMiddleware,
    multerConfig.single("projectImage"),
    projectController.addProject
);

//6 get a particular details
router.get(
    "/project/get-auser-project",
    jwtMiddleware,
    projectController.getAUserproject
);
//7 get all project details
router.get(
    "/project/all-user-project",
    jwtMiddleware,
    projectController.getAllUserProjects
);
//8 get 3 projects details for home projects
router.get(
    "/project/home-project",
    projectController.getHomeProjects
);

module.exports = router;

//9 delete user project 
router.delete("/project/delete-auser-project/:pid",jwtMiddleware,projectController.deleteUserProject);

//10 update user project 

router.put(`/project/update-user-project/:pid`,jwtMiddleware,multerConfig.single('projectImage'),projectController.updateUserProjects)