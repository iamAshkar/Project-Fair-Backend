// Import the userSchema or model
const users = require('../Models/userSchema');

const jwt = require('jsonwebtoken')

// Define the register logic
exports.register = async (req, res) => {
    // console.log("Inside register method");
    // Accept data from client
    const { username, email, password } = req.body;
    console.log(username, email, password);

    try {
        // Placeholder logic for registration
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("user already registered")
        }else{
            const newUser = new users({
                username,
                email,
                password,
                github:"",
                livelink:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }


    } catch (err) {
        res.status(500).json("Registration failed");
    }
};

//login logic

exports.login = async(req,res)=>{
    //accept data from client
    const {email,password} = req.body
    try{
        //check if email and password in db
        const existingUser = await users.findOne({email,password})
        if (existingUser) {
            const token =jwt.sign({userId:existingUser._id},"super2024")
            console.log(token);
            res.status(200).json({existingUser,token})
        }else{
            res.status(404).json("Invalid email or password")
        }

    }catch(err){
        res.status(500).json("login failed"+err)
    }
}

