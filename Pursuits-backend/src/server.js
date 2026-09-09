const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(' MongoDB Connected'))
.catch(err => console.log(' MongoDB Error:', err));

const Diploma = mongoose.models.Diploma || mongoose.model('Diploma', diplomaSchema);

// Routes
app.post('/api/v1/diplomas', async (req, res) => {
  try {
    console.log(' Received:', req.body);
    const diploma = await Diploma.create(req.body);
    console.log(' Saved:', diploma);
    res.status(201).json({ success: true, data: diploma });
  } catch (error) {
    console.error(' Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/v1/diplomas', async (req, res) => {
  try {
    const diplomas = await Diploma.find();
    res.json({ success: true, count: diplomas.length, data: diplomas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});