const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const  Profile = require('../models/Profile');

//Route 1: fetch  all Profile using: get "http://localhost:3000/api/profile/fetchallProfile". login required
router.get('/fetchallProfile/:id', async (req, res) => {
    try {
        const profile = await Profile.find({uid:req.params.id});
        console.log(profile);
        if (!profile) {
            return res.status(404).send("Not Found");
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred");
    }
});

//Route 2: add a new Profile using: post "http://localhost:3000/api/profile/addProfile". login required


router.post('/addProfile', [
    body('uid', 'Enter a valid id').isLength({ min: 1 }),
    body('name', 'Enter a valid Last name').isLength({ min: 1 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('location', 'Enter a valid Location').isArray(),
    body('type', 'Enter a valid type').isLength({ min: 1 }),
    body('role', 'Enter a valid role').isLength({ min: 1 }),
    body('phone', 'Enter a valid phone number').isLength({ min: 10 }),
], async (req, res) => {
    try {
        // check if the user already exists
        const existingUser = await Profile.findOne({ uid: req.body.uid });
        if (existingUser) {
            return res.status(400).json({ error: "Sorry, a user with this id already exists" });
        }

        const { uid, name, email, location, type, role,phone } = req.body;

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", message: "Validation failed", errors: errors.array() });
        }

        // Create a new Profile
        const profile = new Profile({
            uid,
            name,
            email,
            location,
            type,
            role,
            phone
        });

        const savedProfile = await profile.save();
        // Return success response
        res.status(200).json({ status: "success", data: savedProfile });
        console.log("Success: Profile added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error occurred" });
    }
});



// Route 3: update an existing Profile using: put "http://localhost:3000/api/profile/updateProfile/:id". login required
// router.put('/updateProfile/:id', fetchuser,[
//     body('first_name', 'Enter a valid First name').isLength({ min: 1 }),
//     body('last_name', 'Enter a valid Last name').isLength({ min: 1 }),
//     body('branch', 'Enter a valid Branch').isLength({ min: 1 }),
//     body('city', 'Enter a valid City').isLength({ min: 1 }),
//     body('state', 'Enter a valid State').isLength({ min: 1 }),
//     body('zip', 'Enter a valid Zip').isLength({ min: 1 }),
// ], async (req, res) => {
//    try {
//     // Log the user's Profile for debugging
//     console.log(req.user.role);
//     // Check if the user has both "admin" or "superadmin" Profiles
//     if (req.user.role !== "admin" && req.user.role !== "superadmin") {
//         return res.status(401).json({ status: "error", message: "Not Allowed" });
//     }
//     const { first_name,last_name,branch,city,state,zip } = req.body;
//     const errors = await validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     //create a newProfile object
//     const newProfile = {}; // a new empty object is created for Profile updation
//     if (first_name) { newProfile.first_name = first_name };
//     if (last_name) { newProfile.last_name = last_name };
//     if (branch) { newProfile.branch = branch };
//     if (city) { newProfile.city = city };
//     if (state) { newProfile.state = state };
//     if (zip) { newProfile.zip = zip };
//     //find the Profile to be updated and update it
//     let profile = await Profile.findById(req.params.id);
//     // console.log(profile);
//     if (!profile) { return res.status(404).send("Not Found") }
//     if(!req.params.id){
//         return res.status(404).send("provide id")

//     }
//     const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, { $set: newProfile }, { new: true });
//     res.json({ updatedProfile });
//     console.log("Success: Profile updated successfully");
//    } catch (error) {
//     res.status(500).send("Internal server error occured");
//     console.log(error.message);
//    }
// });

// // Route 4: delete an existing Profile using: delete "http://localhost:3000/api/profile/deleteProfile/:id". login required
// router.delete('/deleteProfile/:id', fetchuser, async (req, res) => {
//     try {
//         // Log the user's Profile for debugging
//     console.log(req.user.role);
//     // Check if the user has both "admin" or "superadmin" Profiles
//     if (req.user.role !== "admin" && req.user.role !== "superadmin") {
//         return res.status(401).json({ status: "error", message: "Not Allowed" });
//     }
//         //find the Profiles to be deleted and delete it
//         let profile = await Profile.findById(req.params.id);
//         if (!profile) { return res.status(404).send("Not Found") }
//         //allow deletion only if user owns this Profiles
//         let deleteProfile = await Profile.findByIdAndDelete(req.params.id);
//         res.json({ "Success": "Profiles has been deleted", Profile:deleteProfile });
//     } catch (error) {
//         res.status(500).send("Internal server error occured");
//         console.log(error.message);
//     }
// });
module.exports = router;