const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://saurav:Ymsa2bxdvGZAOCNo@saurav.s4b25af.mongodb.net/?retryWrites=true&w=majority';

// Sample doctor data
const doctors = [
  {
    name: "Dr. Michael Johnson",
    specialization: "Cardiologist",
    department: "Cardiology",
    hospital: "ABC Hospital",
    // Add other relevant fields
  },
  {
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrician",
    department: "Pediatrics",
    hospital: "XYZ Hospital",
    // Add other relevant fields
  },
  // Add more doctor data as needed
];

async function insertDoctors() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('Hospital');
        const collection = db.collection('Doctors');
        const result = await collection.insertMany(doctors);
        console.log(`${result.insertedCount} doctors inserted.`);
    } catch (error) {
        console.error('Error inserting doctors:', error);
    } finally {
        await client.close();
        console.log('Connection to MongoDB closed.');
    }
}

insertDoctors();
