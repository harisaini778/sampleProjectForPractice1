const User = require("../models/userModels");

const jwt = require("jsonwebtoken");


const signup = async (req,res) => {
    const {name,email,password} = req.body;

    try {
        const existingUser = await User.findOne({where: {email : email}});

        if(existingUser) {
            res.status(400).json({message:`User with the ${email} already exists, please try with a different email`})
            // 400 means client side error
        }
       
        const newUser =  await User.create({
            name : name,
            email : email,
            password : password,
        });

        if(newUser){
            res.status(201).json({message: `User with email id ${email} has been created successfully`,user:newUser});
            // res 201 means successfull and created a new record in the db
        }
    }catch(err){
        console.error("Error during signup:", err); 
        res.status(500).json({message : err}); // 500 means internal server error (Server side error)
    }
    
}

const login = async(req,res) =>{

    try {
       
        const {email,password} = req.body;

        const authenticateUser =  await User.findOne({where : {email:email}});

        if(!authenticateUser) {
          res.status(401).json({message : `User email or password is invalid!`});
          // 401 res means Unauthorised which indicates that missing password or invalid details 
        }

        const token = jwt.sign({id:authenticateUser.id,email:authenticateUser.email},process.env.JWT_SECRET,{expiresIn : "1h"});

        // 

        if(authenticateUser.password===password){
            res.status(200).json({message : `Login Successfull`,token,authenticateUser});
        }

    }catch(err){
       res.status(500).json({message: err})
    }
};


const fetchUserInfo = async(req,res) => {

  try {

    console.log("req.user is : ",req.user);

    const email = req.user.email;

    const userInfo =  await User.findOne({where : {email:email}});

    if(userInfo){
        res.status(201).json({user : userInfo});
    }
     
  } catch(err){
      console.log("err while fetching users info : ",err);
      res.status(500).json({message : "Unable to find users info",err:err})
  }
}

module.exports = {signup,login,fetchUserInfo};