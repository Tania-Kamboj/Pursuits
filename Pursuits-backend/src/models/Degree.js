const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  interests: [{ type: String }],
  coreSubjects: [{ type: String }],
  duration: { type: String, default: '4 years' },
  entranceExams: [{ type: String }],
  careers: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'DegreeCategory', required: true },
  streams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StreamDetails' }],
  topGovernmentColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
topPrivateColleges:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
}, { timestamps: true });

degreeSchema.index({ category: 1 });
degreeSchema.index({ streams: 1 });
degreeSchema.index({ name: 1 });

module.exports = mongoose.model('Degree', degreeSchema);