const Degree = require('../models/Degree');
const DegreeCategory = require('../models/DegreeCategory');
const StreamDetails = require('../models/StreamDetails');
const ApiError = require('../utils/apiError');
const { safe, rx, exact, wordStart, normalizeStream, applyProjection } = require('../utils/queryHelpers');

const ALLOWED_FIELDS = ['name', 'interests', 'coreSubjects', 'duration', 'entranceExams', 'careers'];

// GET /api/v1/degrees (+ filters: category, stream, search + fields)
exports.getAllDegrees = async (req, res, next) => {
  try {
    const conditions = [];

    // Category filter (?category=name YA ?category=<id> — dono chalega)
    const categoryParam = safe(req.query.category);
    if (categoryParam) {
      const isId = /^[0-9a-fA-F]{24}$/.test(categoryParam);
      if (isId) {
        conditions.push({ category: categoryParam });
      } else {
        const category = await DegreeCategory.findOne({ name: exact(categoryParam) });
        if (!category) return res.status(200).json({ success: true, count: 0, data: [] });
        conditions.push({ category: category._id });
      }
    }

    // Stream filter (?stream=PCM)
    let streamName = safe(req.query.stream);
    if (streamName) {
      streamName = normalizeStream(streamName);
      const stream = await StreamDetails.findOne({ name: wordStart(streamName) });
      if (!stream) return res.status(200).json({ success: true, count: 0, data: [] });
      conditions.push({ streams: stream._id });
    }

    // Name filter (?name=b.tech)
    const name = safe(req.query.name);
    if (name) conditions.push({ name: rx(name) });

    // Global search (?search=pilot)
    const search = safe(req.query.search);
    if (search) {
      const s = rx(search);
      conditions.push({
        $or: [
          { name: s },
          { interests: s },
          { coreSubjects: s },
          { careers: s },
          { entranceExams: s },
        ],
      });
    }

    const query = conditions.length ? { $and: conditions } : {};
    const projection = applyProjection(req, ALLOWED_FIELDS);

    const degrees = projection
      ? await Degree.find(query).select(projection)
      : await Degree.find(query);

    res.status(200).json({ success: true, count: degrees.length, data: degrees });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/degrees/:id  (detail page)
exports.getDegreeById = async (req, res, next) => {
  try {
    const degree = await Degree.findById(req.params.id)
      .populate('category', 'name')
      .populate('streams', 'name');
    if (!degree) return next(new ApiError('Degree not found', 404));
    res.status(200).json({ success: true, data: degree });
  } catch (error) {
    if (error.kind === 'ObjectId') return next(new ApiError('Invalid ID format', 400));
    next(error);
  }
};