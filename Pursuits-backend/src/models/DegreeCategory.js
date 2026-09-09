const mongoose = require('mongoose');

const degreeCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true 
  },
  interests: [{ type: String }],
  focusAreas: [{ type: String }],
  careers: [{ type: String }],
  streams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StreamDetails',
    required: true,
  }],
}, { timestamps: true });

module.exports = mongoose.model('DegreeCategory', degreeCategorySchema);