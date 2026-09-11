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