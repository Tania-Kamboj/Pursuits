const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ['government', 'private'], required: true },
    city: String,
    state: String,
    eligibility: String,        // "JEE Advanced + JoSAA counselling"
    feeStructure: String,       // "₹2.5–3 L/year (tuition + hostel)"
    placementRate: String,      // "90%+"  (String rakho, "90-95%" jaisa data bhi aa sakta hai)
    averagePackage: String,     // "₹25 LPA"
    hostel: String,             // "Available (₹1.2 L/year)"
    attendance: String,         // "75% mandatory"
    // Optional extras (agar data mile toh):
    nirfRank: String,
    established: String,
    website: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);