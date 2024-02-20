const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');

//this is my secret key for creating a token
const JWT_SECRET = process.env.Secretsignature; 

// this is used for validating the userId name and password. we are using express validator for that.we will get the errors in the form of an array.
const { body, validationResult } = require('express-validator');



//---------------------------------------------------------------------------------------------------------------------------------------------
//Route 1: create a user using: POST "/api/auth/createuser". Doesn't require auth.no login required.it is a post request since we are sending data to the server 
// res means response and req means request.
//if we need to show the data on the browser we use res.send and if we need to show the data on the terminal we use console.log
// router.post('/createuser', (req, res) => {} means we are creating a route for the post request

router.post('/createuser', [

   // below three lines are used for validating wethere the userId name and password are of correct format or not.for that we have used express validator.
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('userId', 'Enter a valid userId').isLength({ min: 6 }),
   body('password', 'password must be atlest 8 characters').isLength({ min: 8 }),
   body('role', 'role must be atlest 3 characters').isLength({ min: 3 }),
], async (req, res) => {


   //if there are errors, return bad request and the errors caused due to format.
   const errors = await validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

      
   //check whether the user with this userId exists already
   try {

      let user = await User.findOne({ userId: req.body.userId.toLowerCase() });
      if (user) {
         return res.status(400).json({ error: " user with this userId already exists" });
      }


      //create a new user.if the user doesn't exist then we will create a new user.
      
      //hashing the password
      const salt = await bcrypt.genSalt(10);  //--->here 10 is the number of rounds. the more the number of rounds the more secure the password will be.


      const secPass = await bcrypt.hash(req.body.password, salt); //-->here we are hashing the password using bcrypt.hash method. we are passing the password and salt as arguments. we are storing the hashed password in a variable secPass.


      // Create a new user with the model User
      user = await User.create({
         name: req.body.name,
         password: secPass,
         userId: req.body.userId.toLowerCase(),
         role: req.body.role

      }) 

      const data = {
         user: {
             id: user.id,
             role: user.role
         }
   }

   //here we are creating a token. using jwt.sign method which is a synchronous process.
   const authtoken= jwt.sign(data, JWT_SECRET);
   console.log(authtoken);

      //we are sending the token to the user using res.json({authtoken});
      success=true;
      res.json({success,authtoken});


   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
   }
})

//----------------------------------------------------------------------------------------------------------------------------------------------
// Route 2:authenticate a user using: POST "/api/auth/login". No login required.

router.post('/login', [
   body('userId', 'Enter a valid userId').isLength({ min: 6 }),
   body('password', 'password cannot be blank').exists(),
], async (req, res) => {
   //if there are errors, return bad request and the errors
   let success = false;
   const errors = await validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   let { userId, password } = req.body;//---->destructuring the userId and password from the req.body.

   try {
      userId = userId.toLowerCase();
      let user = await User.findOne({ userId }); //--->here we are finding the user with the userId entered by the user. if the user exists then we will store the user in the variable user. if the user doesn't exist then we will store null in the variable user.


      if (!user) {
        success = false;
         return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password); //-->here we are comparing the password entered by the user with the password stored in the database. if the password matches then we will store true in the variable passwordCompare. if the password doesn't match then we will store false in the variable passwordCompare.
      if (!passwordCompare) {
         return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      const data = {
            user: {
                id: user.id,
                role: user.role
            }
      }
      const authtoken= jwt.sign(data, JWT_SECRET); //-->here we are creating a token using jwt.sign method. we are passing the index of user  and JWT_SECRET as arguments. we are storing the token in a variable authtoken.ex:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY5ZjQ0ZjQ5ZjYyZjIwMDAxNzQ0ZjQ1In0sImlhdCI6MTYw".this is the token we get after creating the token.
      success = true;
      res.json({success,authtoken});  


   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server erorr occured error occured");
   }

})

//Route 3: get loggedin user details using: POST "/api/auth/getuser". login required.
router.post('/getuser', fetchuser,  async (req, res) => {

   try {
     userId = req.user.id; //-->here we are assiging the id of the user to the variable userId.
     role = req.user.role;
     console.log(role);
     const user = await User.findById(userId).select("-password")
     res.send(user)
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
   }
 })

module.exports = router;