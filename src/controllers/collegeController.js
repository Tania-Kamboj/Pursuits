const Degree = require('../models/Degree');
const College = require('../models/College');

// GET /api/v1/degrees/:id/colleges?list=government|private
// List me sirf name, city, state, type jayega (frontend list ke liye)
exports.getDegreeColleges = async (req, res) => {
  try {
    const { list } = req.query; // 'government' | 'private' | (empty = dono)

    const degree = await Degree.findById(req.params.id)
      .select('name topGovernmentColleges topPrivateColleges')
      .populate({ path: 'topGovernmentColleges', select: 'name city state type' })
      .populate({ path: 'topPrivateColleges', select: 'name city state type' });

    if (!degree) {
      return res.status(404).json({ success: false, message: 'Degree not found' });
    }

    const data = {};
    if (!list || list === 'government') data.government = degree.topGovernmentColleges;
    if (!list || list === 'private') data.private = degree.topPrivateColleges;

    return res.status(200).json({
      success: true,
      degree: degree.name,
      count: {
        government: (data.government || []).length,
        private: (data.private || []).length,
      },
      data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/colleges/:id  → Full detail page
exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    return res.status(200).json({ success: true, data: college });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};