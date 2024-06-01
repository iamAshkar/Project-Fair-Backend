//1.Loads .env file contents into process.env by default
require('dotenv').config()

//2.impoert express
const express =require('express')

//3.import cors
const cors = require('cors')

// 7 import db
const db =require('./DB/connection')

//8 import router
const router =require('./Routes/router')
// const applicationMiddleware = require('./Middlewares/applicationMiddleware')

//4.create a application using express
const pHServer =express()

//5.use 
pHServer.use(cors())
pHServer.use(express.json())//return middleware that only parses

//10 use middleware
// pHServer.use(applicationMiddleware)
//9 use

pHServer.use(router)
// used to export images from backend
pHServer.use('/uploads',express.static('./uploads'))


//6. port creation
const PORT =4000 || process.env.PORT

pHServer.listen(PORT,()=>{
    console.log('pHServer Listening on port'+PORT);
})

pHServer.get('/',(req,res)=>{
    res.send('Welcome to project-hub')
})
