// mongoDB PW:qimZBAKyBfgW2P8J

// mongoDB connection: mongodb+srv://steven:<password>@cluster0.gp8lv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// Import express
const express = require('express');
// Import mongoose
const mongoose = require('mongoose');
// Import path
const path = require('path');

// Import sauce routes
const sauceRoutes = require('./routes/sauce');
// Import user routes
const userRoutes = require('./routes/user');

const app = express();

// Connect to MongoDB using mongoose
mongoose.connect('mongodb+srv://steven:qimZBAKyBfgW2P8J@cluster0.gp8lv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use(express.json());

// Add middleware before API route to allow requests from all origins to access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Set image storage folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Set Api routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;