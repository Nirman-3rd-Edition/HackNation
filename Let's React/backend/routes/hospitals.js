const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const geolib = require('geolib');

router.get('/nearby', async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    // Parse latitude and longitude from query parameters
    const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

    try {
        const hospitals = await Hospital.find();
        const hospitalsWithDistance = hospitals.map(hospital => ({
            _id: hospital._id,
            name: hospital.name,
            location: hospital.location,
            distance: geolib.getDistance(userLocation, {
                latitude: hospital.location.coordinates[1],
                longitude: hospital.location.coordinates[0]
            }),
            bedCapacity: hospital.bedCapacity,
            occupiedBeds: hospital.occupiedBeds
        }));

        res.json(hospitalsWithDistance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/nearby', async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    try {
        const hospitals = await Hospital.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    }
                }
            }
        }).select('name location bedCapacity occupiedBeds');

        res.json(hospitals);
    } catch (error) {
        console.error("Error finding nearby hospitals.....:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
