const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true
  },
  stream: {
    type: String,
    required: [true, 'Stream is required'],
    enum: ['pcm', 'pcb', 'pcmb', 'commerce', 'arts'],
    lowercase: true,
    index: true
  },
  conductingBody: {
    type: String,
    required: true,
    trim: true
  },
  purpose: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  subjectsAndWeightage: {
    type: String,
    required: true
  },
  attemptAndPattern: {
    type: String,
    required: true
  },
  preparation: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Defence', 'Engineering', 'Medical', 'Law', 'Design', 'Government', 'Railways', 'Other'],
    default: 'Other'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);