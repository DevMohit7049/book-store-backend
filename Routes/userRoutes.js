const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Models/User');
const {authenticateToken} = require('../jwtAuth');


// user singup 
router.post('/signup',async (req,res)=>{
    try {
          const {username,email,password,address} = req.body;

        //   check username length is more then 4 //
        if(username.length<4){
          return res.status(400).json({message:'username length shold be greater then 3'})
        }



        // check username already exist //
        const isUserName = await User.findOne({username:username});
        if(isUserName){
            return res.status(400).json({message:'Username already exist'});
        }


        // check email already exist //
        const isEmail = await User.findOne({email:email});
        if(isEmail){
            return res.status(400).json({message:'Email already exist'});
        }

        // check password length //
        if(password.length<=5){
            return res.status(400).json({message:'password length should be greater then 5'});
        }

        // hashed the password with bcrypt//
        const hashedPassword = await bcrypt.hash(password,10);

        // if all good then create new user //
        const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword,
            address:address
        });

        // save new user in database
        await newUser.save();
        return res.status(200).json({message:'Signup Sucessfully'});


    } 
     catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})

// user login 
router.post('/login',async (req,res)=>{
    try {
          const {username,password} = req.body;
          const isExistingUser = await User.findOne({username:username});

          if(!isExistingUser){
            res.status(400).json({message:"user not available"})
          }

          await bcrypt.compare(password,isExistingUser.password,(req,data)=>{
              if(data){

                const authClaims = [
                    {name:isExistingUser.username},
                    {role:isExistingUser.role}
                ];

                const token = jwt.sign({authClaims},process.env.JWT_SECRET,{
                    
                })

                res.status(200).json({
                    id:isExistingUser._id,
                    role:isExistingUser.role,
                    token:token
                });
              }
              else{
                res.status(400).json({message:"Invalid Password"});
              }
          })

    } 
     catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
});

// get user information 
router.get('/get-userInfo', authenticateToken , async(req,res)=>{
    try {
         const {id} = req.headers;
         const data = await User.findById(id).select("-password");
         return res.status(200).json(data);
    } 
    catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
})

// Update Address//
router.put('/update-address',authenticateToken,async(req,res)=>{
    try {
          const {id} = req.headers;
          const{address} = req.body;      
          await User.findByIdAndUpdate(id,{address:address});
          res.status(200).json({message:'Address Updated Successfully'});
     } 
     catch (error) {
        res.status(500).json({message:'Internal Server Error'});
        
    }
})

module.exports = router;
