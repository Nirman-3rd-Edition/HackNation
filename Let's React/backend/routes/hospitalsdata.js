const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://saurav:Ymsa2bxdvGZAOCNo@saurav.s4b25af.mongodb.net/?retryWrites=true&w=majority';

// Sample hospital data
const hospitals = [
  {
    name: "ABC Hospital",
    address: "123 Main St, New York, NY",
    coordinates: { latitude: 40.7128, longitude: -74.0060 }, // New York coordinates
    bedCapacity: 100,
    occupiedBeds: 20,
    // Add other relevant fields
  },
  {
    name: "XYZ Hospital",
    address: "456 Elm St, Los Angeles, CA",
    coordinates: { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles coordinates
    bedCapacity: 150,
    occupiedBeds: 30,
    // Add other relevant fields
  },
  // Add more hospital data as needed
];

async function insertHospitals() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('Hospital'); // Replace 'Hospital' with your database name
        const collection = db.collection('Hospitals');

        // Insert hospital data into the collection
        const result = await collection.insertMany(hospitals);
        console.log(`${result.insertedCount} hospitals inserted.`);
    } catch (error) {
        console.error('Error inserting hospitals:', error);
    } finally {
        await client.close();
        console.log('Connection to MongoDB closed.');
    }
}

insertHospitals();
