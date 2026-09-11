const Diploma = require('../models/Diploma');

const getDiplomas = async (req, res) => {
  try {
    const { stream } = req.query; 
    
    let query = {};
    
    if (stream) {
      const streamLower = stream.toLowerCase();
      let mappedStream = streamLower;
  if (streamLower === 'humanities' || streamLower === 'arts-humanities' || streamLower === 'arts/humanities') {
    mappedStream = 'arts';
  }

  if (mappedStream === 'pcmb') {
    query.stream = { $in: ['pcm', 'pcb'] };
  } else {
    query.stream = mappedStream;
  }
    }

    const diplomas = await Diploma.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: diplomas.length,
      data: diplomas
    });
  } catch (error) {
    console.error('Error fetching diplomas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

const getDiplomaById = async (req, res) => {
  try {
    const diploma = await Diploma.findById(req.params.id);

    if (!diploma) {
      return res.status(404).json({ 
        success: false, 
        message: 'Diploma not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: diploma
    });
  } catch (error) {
    console.error('Error fetching diploma:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

module.exports = { getDiplomas, getDiplomaById };