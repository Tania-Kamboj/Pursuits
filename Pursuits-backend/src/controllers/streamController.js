const StreamDetails = require("../models/StreamDetails");
const ApiError = require("../utils/apiError");
const escapeRegex = require("../utils/escapeRegex");

exports.getAllStreams = async (req, res, next) => {
  try {
    const conditions = [];
    const safe = (v) => (typeof v === "string" && v.trim() ? v.trim() : null);

    const rx = (v) => ({ $regex: escapeRegex(v), $options: "i" });

    const name = safe(req.query.name); 
    const subject = safe(req.query.subject); 
    const career = safe(req.query.career); 
    const exam = safe(req.query.exam); 
    const topic = safe(req.query.topic); 
    const search = safe(req.query.search); 

    if (name) conditions.push({ name: rx(name) });
    if (career) conditions.push({ careerOptions: rx(career) });
    if (exam) conditions.push({ "entranceExams.name": rx(exam) });
    if (topic) conditions.push({ "subjectTopics.topics": rx(topic) });

    if (subject) {
      conditions.push({
        $or: [
          { "subjects.compulsory": rx(subject) },
          { "subjects.optional": rx(subject) },
        ],
      });
    }

    if (search) {
      const s = rx(search);
      conditions.push({
        $or: [
          { name: s },
          { description: s },
          { "subjects.compulsory": s },
          { "subjects.optional": s },
          { careerOptions: s },
          { "entranceExams.name": s },
          { "subjectTopics.topics": s },
        ],
      });
    }
    
    const query = conditions.length ? { $and: conditions } : {};

    const ALLOWED_FIELDS = [
      "name",
      "description",
      "subjects",
      "subjectTopics",
      "interestsRequired",
      "careerOptions",
      "entranceExams",
    ];

    let projection = "";
    const fieldsParam = safe(req.query.fields); // ?fields=name,description

    if (fieldsParam) {
      projection = fieldsParam
        .split(",")
        .map((f) => f.trim())
        .filter((f) => ALLOWED_FIELDS.includes(f)) // sirf allowed fields
        .join(" ");
    }

    const streams = projection
      ? await StreamDetails.find(query).select(projection)
      : await StreamDetails.find(query);

    res.status(200).json({
      success: true,
      count: streams.length,
      data: streams,
    });
  } catch (error) {
    next(error);
  }
};

exports.getStreamById = async (req, res, next) => {
  try {
    const stream = await StreamDetails.findById(req.params.id);
    if (!stream) return next(new ApiError("Stream not found", 404));
    res.status(200).json({ success: true, data: stream });
  } catch (error) {
    if (error.kind === "ObjectId")
      return next(new ApiError("Invalid ID format", 400));
    next(error);
  }
};

exports.getStreamByName = async (req, res, next) => {
  try {
    const stream = await StreamDetails.findOne({ name: req.params.name });
    if (!stream) return next(new ApiError("Stream not found", 404));
    res.status(200).json({ success: true, data: stream });
  } catch (error) {
    next(error);
  }
};

exports.createStream = async (req, res, next) => {
  try {
    const stream = await StreamDetails.create(req.body);
    res.status(201).json({ success: true, data: stream });
  } catch (error) {
    if (error.code === 11000)
      return next(new ApiError("Stream name already exists", 400));
    next(error);
  }
};
