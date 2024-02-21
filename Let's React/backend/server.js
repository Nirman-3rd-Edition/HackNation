const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Logging middleware (Morgan) for development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Define user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/user', userRoutes);

// Define admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/v1/admin', adminRoutes);

// Define hospital routes
const hospitalRoutes = require('./routes/hospitals');
app.use('/api/hospitals', hospitalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

module.exports = app;
