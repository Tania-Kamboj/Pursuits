const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ['government', 'private'], required: true },
    city: String,
    state: String,
    eligibility: String,       
    feeStructure: String,       
    placementRate: String,      
    averagePackage: String,     
    hostel: String,             
    attendance: String,         
    // Optional
    nirfRank: String,
    established: String,
    website: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);