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

diplomaSchema.index({ streams: 1 });
diplomaSchema.index({ name: 1 });

module.exports = mongoose.models.Diploma || mongoose.model('Diploma', diplomaSchema);