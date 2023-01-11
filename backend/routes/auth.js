const express=require('express'); 
const User=require('../models/User');
const router=express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs'); 
var jwt=require('jsonwebtoken');  
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET='harryisaGoodboy';

// ROUTE 1:  Creating a user using: POST "/api/auth/createuser". Doesnt require auth
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] , async (req, res)=>{ 
  let success=false;
  //If there are bad request, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try{
      //chack whether user with same email exist already
      let user= await User.findOne({success, email: req.body.email}); 
      if(user){
        return res.status(400).json({success, error: "Sorry user with this email already exists"})
      }
      const salt= await bcrypt.genSalt(10);      //await matlab ruk jao, jab tk promise resolve nhi hoti age mat bado
      const secPass= await bcrypt.hash(req.body.password,salt); 

      //Creating a new User 
      user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        const data={
          user:{
            id: user.id
          }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);

        success=true; 
        res.json({success, authtoken}); 
    } 
    catch(error){
      console.log(error.message); 
      res.status(500).send("Internal Server Error occoured");     
    }
} ) 


// ROUTE2 : Authenticate a user using: POST "/api/auth/login". Doesnt require auth
router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(), 
] , async (req, res)=>{ 
  let success=false;
  //If there are bad request, return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body; 
  try {
      let user= await User.findOne({email}); 
      if(!user){
        success=false; 
        return res.status(400).json({error: "Please Login using correct credentials"});
      }
      
      const passwordCompare= await bcrypt.compare(password,user.password); 
      if(!passwordCompare){
        success=false; 
        return res.status(400).json({error: "Please Login using correct credentials"});
      }

      const payload={
        user:{
          id: user.id
        }
      }
      const authtoken=jwt.sign(payload,JWT_SECRET); 
      success=true;
      res.json({success,authtoken}); 
  } catch (error) {
    console.log(error.message); 
    res.status(500).send("Internal Server Error occoured");     
  }
})

// ROUTE 3 : Get Logged in user details: POST "/api/auth/getuser". Login require 
router.post('/getuser', fetchuser,  async (req, res)=>{ 
  try {
    userId=req.user.id;
    const user= await User.findById(userId).select("-passowrd"); 
    res.send(user);
  } catch (error) {
    console.log(error.message); 
    res.status(500).send("Internal Server Error occoured");   
  }
})

module.exports=router