const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserOrder = require('../models/Order');
const Profile = require('../models/Profile');
var fetchuser = require('../middleware/fetchuser');
const { v4: uuidv4 } = require('uuid');
//Route 1: fetch  UserOrder by giving oid using: get "http://localhost:3000/api/order/singleOrder/:id". login required
router.get('/singleOrder/:id', async (req, res) => {
    try {
        
        const userorder = await UserOrder.find({ oid: req.params.id });
        if (!userorder) {
            return res.status(404).send("Not Found");
        }
        res.json(userorder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2: fetch  UserOrder of a particular user by giving uid  using: get "http://localhost:3000/api/order/allOrder/:id". login required
router.get('/allOrder/:id', async (req, res) => {
    try {
        const userorder = await UserOrder.find({ uid: req.params.id });
        if (!userorder) {
            return res.status(404).send("Not Found");
        }
        res.json(userorder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: fetch all  order from order collection and status using: get "http://localhost:3000/api/order/Orderloc". login required
// send location and oid and uid
router.get('/Orderloc', async (req, res) => {
    try {
        const userorder = await UserOrder.find({ status: false }).select(" uid oid -_id ").sort({ createdAt: -1 }).limit(10).exec();
        if (!userorder) {
            return res.status(404).send("Not Found");
        }
        res.json(userorder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 4: updated status of order using: put "http://localhost:3000/api/order/updateOrder/:id". login required

router.put('/updateOrder/:id',[
    body('reciveruid', 'Enter a valid reciveruid').isLength({ min: 1 }),
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userorder = await UserOrder.findOne({ oid: req.params.id });
        if (!userorder) {
            return res.status(404).send("Not Found");
        }
        if (userorder.status) {
            return res.status(400).send("Reciever already assigned to this order.");
        }
        userorder.status = true;
        userorder.reciveruid = req.body.reciveruid;
        const savedUserOrder = await userorder.save();
        res.json(savedUserOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





//Route 5: Add a new UserOrder using: POST "http://localhost:3000/api/order/addUserOrder". login required

router.post('/addUserOrder',[
    body('uid', 'Enter a valid id').isLength({ min: 1 }),
    body('image', 'Enter a valid image').isArray({ min: 1 }),
    body('foodname', 'Enter a valid foodname').isArray({ min: 1 }),
    body('quantity', 'Enter a valid quantity').isArray({ min: 1 }),
    // body('status', 'Enter a valid status').isArray({ min: 0 }),
] ,async (req, res) => {
    try {
        // check if the user already exists
        const existingUser = await Profile.findOne({ uid: req.body.uid });
        if (!existingUser) {
            return res.status(400).json({ error: "Sorry, a user with this id does not exists" });
        }
        const { uid, image, foodname, quantity, status } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const shortUuid= `GN${uuidv4()}`;
        const oid = shortUuid.substr(0, 6);
        const userorder = new UserOrder({ uid,oid, image, foodname, quantity, status });
        const savedUserOrder = await userorder.save();
        res.json(savedUserOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;