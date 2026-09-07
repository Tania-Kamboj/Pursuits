const Exam = require('../models/Exam');

// @desc    Get all exams (filtered by stream)
// @route   GET /api/v1/exams?stream=pcm
const getExams = async (req, res) => {
  try {
    const { stream } = req.query;
    
    let query = {};
    
    // PCMB ke liye PCM + PCB dono se data lao
    if (stream && stream.toLowerCase() === 'pcmb') {
      query.stream = { $in: ['pcm', 'pcb'] };
    } else if (stream) {
      query.stream = stream.toLowerCase();
    }

    let exams = await Exam.find(query).sort({ name: 1 });

    // ✅ PCMB me agar same exam PCM aur PCB dono me hai, toh duplicate hata do
    if (stream && stream.toLowerCase() === 'pcmb') {
      const seenNames = new Set();
      exams = exams.filter(exam => {
        const normalizedName = exam.name.toLowerCase().trim();
        if (seenNames.has(normalizedName)) {
          return false; // Duplicate hai, hata do
        }
        seenNames.add(normalizedName);
        return true; // Unique hai, rakho
      });
    }

    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

// @desc    Get single exam by ID
// @route   GET /api/v1/exams/:id
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: 'Exam not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: exam
    });
  } catch (error) {
    console.error('Error fetching exam:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

module.exports = { getExams, getExamById };