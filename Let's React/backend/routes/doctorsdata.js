const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 5000;

const url = 'mongodb+srv://saurav:Ymsa2bxdvGZAOCNo@saurav.s4b25af.mongodb.net/?retryWrites=true&w=majority';

app.get('/api/doctors', async (req, res) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('Hospital');
    const collection = db.collection('Doctors');
    const doctors = await collection.find({}).toArray(); // Retrieve all doctors

    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Error fetching doctors' });
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
