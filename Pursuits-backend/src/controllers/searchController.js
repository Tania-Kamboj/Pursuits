// const StreamDetails = require('../models/StreamDetails');
// const Degree = require('../models/Degree');
// const Diploma = require('../models/Diploma');
// const Exam = require('../models/Exam');

// exports.globalSearch = async (req, res) => {
//   try {
//     const { q } = req.query;
    
//     console.log('🔍 Search Query Received:', q);
    
//     // Agar query empty hai toh khali array bhejo
//     if (!q || q.trim() === '') {
//       console.log('⚠️ Empty query');
//       return res.json({ success: true, data: { streams: [], degrees: [], diplomas: [], exams: [] } });
//     }

//     // Case-insensitive regex search (Lowercase me convert kar rahe hain)
//     const searchQuery = q.trim().toLowerCase();
//     const regex = new RegExp(searchQuery, 'i'); // 'i' flag = case insensitive
    
//     console.log('📝 Searching with regex:', regex);

//     // Sabhi collections ko parallel me search karo
//     const [streams, degrees, diplomas, exams] = await Promise.all([
//       StreamDetails.find({ name: { $regex: regex } }).limit(5).select('name _id'),
//       Degree.find({ name: { $regex: regex } }).limit(5).select('name _id stream'),
//       Diploma.find({ name: { $regex: regex } }).limit(5).select('name _id stream'),
//       Exam.find({ name: { $regex: regex } }).limit(5).select('name _id stream')
//     ]);

//     console.log(' Results Found:');
//     console.log('  Streams:', streams.length);
//     console.log('  Degrees:', degrees.length);
//     console.log('  Diplomas:', diplomas.length);
//     console.log('  Exams:', exams.length);

//     res.json({ 
//       success: true, 
//       data: { streams, degrees, diplomas, exams } 
//     });
//   } catch (error) {
//     console.error(' Search Error:', error);
//     res.status(500).json({ success: false, message: 'Server Error', error: error.message });
//   }
// };


const StreamDetails = require('../models/StreamDetails');
const Degree = require('../models/Degree');
const Diploma = require('../models/Diploma');
const Exam = require('../models/Exam');

exports.globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.json({ success: true, data: { streams: [], degrees: [], diplomas: [], exams: [] } });
    }

    const regex = new RegExp(q.trim(), 'i');

    const [streams, degrees, diplomas, exams] = await Promise.all([
      StreamDetails.find({ name: regex }).limit(5).select('name _id'),

      Degree.find({ name: regex })
        .limit(5)
        .select('name _id stream category')
        .populate('stream', 'name')          
        .populate('category', 'name _id'),

      Diploma.find({ name: regex })
        .limit(5)
        .select('name _id stream')
        .populate('stream', 'name'), 

      Exam.find({ name: regex })
        .limit(5)
        .select('name _id stream')
        .populate('stream', 'name')        
    ]);

    const getStreamSlug = (streamName) => {
      if (!streamName) return 'pcm';
      const n = streamName.toLowerCase();
      if (n.includes('pcm') || n.includes('physics') || n.includes('math')) return 'pcm';
      if (n.includes('pcb') || n.includes('biology')) return 'pcb';
      if (n.includes('commerce')) return 'commerce';
      if (n.includes('arts') || n.includes('humanities')) return 'arts';
      return 'pcm';
    };

    res.json({
      success: true,
      data: {
        streams,
        degrees: degrees.map(d => ({
          _id: d._id,
          name: d.name,
          streamSlug: getStreamSlug(d.stream ? d.stream.name : null),
          categoryId: d.category ? d.category._id : null,
          categoryName: d.category ? d.category.name : null
        })),
        diplomas: diplomas.map(d => ({
          _id: d._id,
          name: d.name,
          streamSlug: getStreamSlug(d.stream ? d.stream.name : null)
        })),
        exams: exams.map(e => ({
          _id: e._id,
          name: e.name,
          streamSlug: getStreamSlug(e.stream ? e.stream.name : null)
        }))
      }
    });
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};