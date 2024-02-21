const connectToMongo = require('./db');
const express = require('express')
const helmet = require('helmet'); // Import helmet
const cors = require('cors'); // Import the cors middleware
const dotenv=require("dotenv")
dotenv.config();
connectToMongo();
const app = express()
const port = process.env.PORT || 5000
// Enable JSON body parsing middleware
app.use(express.json({limit: '50mb'}));

// Use Helmet middleware for enhanced security headers
app.use(helmet());

// Enable CORS middleware (if needed)
app.use(cors());

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/roles', require('./routes/role'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/order', require('./routes/userorder'))
app.use('/api/otp', require('./routes/otp'))


app.listen(port, () => {
    console.log(`Meals_Bridge backend listening at http://localhost:${port}`)
  })