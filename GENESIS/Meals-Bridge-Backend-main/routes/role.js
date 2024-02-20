const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const  Role = require('../models/Role');

//Route 1: fetch  all Role using: get "http://localhost:3000/api/roles/fetchallRole". login required
router.get('/fetchallRole',fetchuser,  async (req, res) => {
    try {
        console.log(req.user.role);
        const roles = await Role.find({ role_name: req.user.role }); //only fetches the roles of the user and the access given to them
        // const roles = await Role.find().select("-user");
        Status=200
        res.json(roles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }


});
//Route 2: add a new Role using: post "http://localhost:3000/api/roles/addRole". login required


router.post('/addRole', fetchuser, [
    body('role_name', 'Enter a valid role name').isLength({ min: 3 }),
    body('access', 'Enter a valid access array').isArray({ min: 1 }),
], async (req, res) => {
    try {
        // Log the user's role for debugging
        console.log(req.user.role);

        // Check if the user has both "admin" or "superadmin" roles
        if (req.user.role !== "admin" && req.user.role !== "superadmin") {
            return res.status(401).json({ status: "error", message: "Not Allowed" });
        }

        const { role_name, access } = req.body;

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", message: "Validation failed", errors: errors.array() });
        }

        // Create and save the new role
        const newRole = new Role({ user: req.user.id, role_name, access });
        const savedRole = await newRole.save();

        // Return success response
        res.status(200).json({ status: "success", data: savedRole });
        console.log("Success: Role added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error occurred" });
    }
});


// // Route 3: update an existing Role using: put "http://localhost:3000/api/roles/updateRole/:id". login required
// router.put('/updateRole/:id', fetchuser,[
//     body('role_name','enter event name').isLength({min:1}),
//     body('access','enter event date').isLength({min:5}),
//     body('event_time','Enter event time').isLength({min:5}),
//     body('place','Enter place').isLength({min:3}),
// ], async (req, res) => {
//    try {
//     const {role_name,access,event_time,place} = req.body;
//     const errors = await validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     //create a newRole object
//     const newRole = {};
//     if (role_name) { newRole.role_name = role_name };
//     if (access) { newRole.access = access };
//     if (event_time) { newRole.event_time = event_time };
//     if (place) { newRole.place = place };
//     //find the Role to be updated and update it
//     let Role = await Role.findById(req.params.id);
//     if (!Role) { return res.status(404).send("Not Found") }
//     if (Role.user.toString() !== req.user.id) {
//         return res.status(401).send("Not Allowed");
//     }
//     const updatedRole = await Role.findByIdAndUpdate(req.params.id, { $set: newRole }, { new: true });
//     res.json({ updatedRole });
//    } catch (error) {
//     res.status(500).send("Internal server error occured");
//     console.log(error.message);
//    }
// });

// // Route 4: delete an existing Role using: delete "http://localhost:3000/api/roles/deleteRole/:id". login required
// router.delete('/deleteRole/:id', fetchuser, async (req, res) => {
//     try {
//         //find the roles to be deleted and delete it
//         let Role = await Role.findById(req.params.id);
//         if (!Role) { return res.status(404).send("Not Found") }
//         //allow deletion only if user owns this roles
//         if (Role.user.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }
//         Role = await Role.findByIdAndDelete(req.params.id);
//         res.json({ "Success": "roles has been deleted", Role: Role });
//     } catch (error) {
//         res.status(500).send("Internal server error occured");
//         console.log(error.message);
//     }
// });
module.exports = router;