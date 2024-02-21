const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 2334;

app.use(bodyParser.json());

var savedLocation = { latitude: 0, longitude: 0 };

app.post('/save-location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(`Received location: Latitude ${latitude}, Longitude ${longitude}`);
  savedLocation = { latitude, longitude };
  res.sendStatus(200);
});

app.get('/get-location', (req, res) => {
  res.json(savedLocation);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
