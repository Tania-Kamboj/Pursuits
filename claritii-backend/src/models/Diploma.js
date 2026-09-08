const mongoose = require('mongoose');

const diplomaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Diploma name is required'],
    trim: true
  },
  stream: {
    type: String,
    required: true,
    enum: ['pcm', 'pcb', 'pcmb', 'commerce', 'arts'], // Streams
    lowercase: true,
    index: true // Fast filtering ke liye
  },
  interests: [String],
  duration: {
    type: String,
    required: true
  },
  coreSubjects: [String],
  entranceExams: [String],
  careers: [String]
}, {
  timestamps: true
});

module.exports = mongoose.models.Diploma || mongoose.model('Diploma', diplomaSchema);