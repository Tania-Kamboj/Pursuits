const mongoose = require('mongoose');

const entranceExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purpose: { type: String, required: true }
}, { _id: false }); 

const subjectTopicSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topics: [{ type: String }]
}, { _id: false });

const subjectsSchema = new mongoose.Schema({
  compulsory: [{ type: String }],
  optional: [{ type: String }]
}, { _id: false });

const streamDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  subjects: subjectsSchema,
  subjectTopics: [subjectTopicSchema],
  interestsRequired: [{ type: String }],
  careerOptions: [{ type: String }],
  entranceExams: [entranceExamSchema]
}, { timestamps: true });

module.exports = mongoose.model('StreamDetails', streamDetailsSchema);