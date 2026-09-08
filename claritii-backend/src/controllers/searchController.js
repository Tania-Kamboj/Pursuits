const StreamDetails = require('../models/StreamDetails');
const Degree = require('../models/Degree');
const Diploma = require('../models/Diploma');
const Exam = require('../models/Exam');

exports.globalSearch = async (req, res) => {
  try {
    const { q } = req.query;
    
    console.log('🔍 Search Query Received:', q);
    
    // Agar query empty hai toh khali array bhejo
    if (!q || q.trim() === '') {
      console.log('⚠️ Empty query');
      return res.json({ success: true, data: { streams: [], degrees: [], diplomas: [], exams: [] } });
    }

    // Case-insensitive regex search (Lowercase me convert kar rahe hain)
    const searchQuery = q.trim().toLowerCase();
    const regex = new RegExp(searchQuery, 'i'); // 'i' flag = case insensitive
    
    console.log('📝 Searching with regex:', regex);

    // Sabhi collections ko parallel me search karo
    const [streams, degrees, diplomas, exams] = await Promise.all([
      StreamDetails.find({ name: { $regex: regex } }).limit(5).select('name _id'),
      Degree.find({ name: { $regex: regex } }).limit(5).select('name _id stream'),
      Diploma.find({ name: { $regex: regex } }).limit(5).select('name _id stream'),
      Exam.find({ name: { $regex: regex } }).limit(5).select('name _id stream')
    ]);

    console.log('✅ Results Found:');
    console.log('  Streams:', streams.length);
    console.log('  Degrees:', degrees.length);
    console.log('  Diplomas:', diplomas.length);
    console.log('  Exams:', exams.length);

    res.json({ 
      success: true, 
      data: { streams, degrees, diplomas, exams } 
    });
  } catch (error) {
    console.error('❌ Search Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};