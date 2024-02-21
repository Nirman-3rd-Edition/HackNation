// Import necessary modules
const express = require('express');

// Initialize Express router
const router  = express.Router();

// Middleware for parsing JSON bodies
router.use(express.json());

// Route to handle emergency alerts
router.post('/emergency', (req, res) => {
    // Handle the emergency alert here (e.g., send notifications to designated contacts, alert emergency services)
    console.log('Emergency alert received:', req.body);
    // Respond with a success message
    res.status(200).json({ message: 'Emergency alert received and being processed.' });
});

// Start the server
const PORT = process.env.PORT || 5000;
router.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = router;