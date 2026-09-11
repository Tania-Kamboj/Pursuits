const DegreeCategory = require('../models/DegreeCategory');
const StreamDetails = require('../models/StreamDetails');
const ApiError = require('../utils/apiError');
const { safe, rx, wordStart, normalizeStream, applyProjection } = require('../utils/queryHelpers');

const ALLOWED_FIELDS = ['name', 'interests', 'focusAreas', 'careers'];

exports.getAllCategories = async (req, res, next) => {
  try {
    const conditions = [];
let streamName = safe(req.query.stream);
    if (streamName) {
      streamName = normalizeStream(streamName); 
      
      const stream = await StreamDetails.findOne({ name: wordStart(streamName) });
      if (!stream) {
        return res.status(200).json({ success: true, count: 0, data: [] });
      }
      conditions.push({ streams: stream._id });
    }

   const name = safe(req.query.name);
    if (name) conditions.push({ name: rx(name) });

    const query = conditions.length ? { $and: conditions } : {};
    const projection = applyProjection(req, ALLOWED_FIELDS);

    const categories = projection
      ? await DegreeCategory.find(query).select(projection).populate('streams', 'name')
      : await DegreeCategory.find(query).populate('streams', 'name');

    res.status(200).json({ 
      success: true, 
      count: categories.length, 
      data: categories 
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await DegreeCategory.findById(req.params.id)
      .populate('stream', 'name description');
    
    if (!category) {
      return next(new ApiError('Category not found', 404));
    }
    
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return next(new ApiError('Invalid ID format', 400));
    }
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const streamName = req.body.stream;
    const stream = await StreamDetails.findOne({ name: exact(streamName) });
    
    if (!stream) {
      return next(new ApiError(`Stream '${streamName}' not found`, 400));
    }
    
    req.body.stream = stream._id;
    
    const category = await DegreeCategory.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (error.code === 11000) {
      return next(new ApiError('Category name already exists', 400));
    }
    next(error);
  }
};