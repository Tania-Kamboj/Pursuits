const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist');
const StreamDetails = require('../models/StreamDetails');
const DegreeCategory = require('../models/DegreeCategory');
const Degree = require('../models/Degree');
const ApiError = require('../utils/apiError');
const Diploma = require('../models/Diploma');


const TYPE_MODEL_MAP = {
  stream: StreamDetails,
  category: DegreeCategory,
  degree: Degree,
  diploma: Diploma,
  };

const isValidType = (t) => Object.keys(TYPE_MODEL_MAP).includes(t);

exports.toggleWishlistItem = async (req, res, next) => {
  try {
    const { itemType, itemId } = req.body;
    if (!itemType || !itemId) return next(new ApiError('itemType and itemId are required', 400));

    const type = String(itemType).toLowerCase();
    if (!isValidType(type)) return next(new ApiError(`Invalid itemType: ${itemType}`, 400));
    if (!mongoose.isValidObjectId(itemId)) return next(new ApiError('Invalid itemId', 400));

    const item = await TYPE_MODEL_MAP[type].findById(itemId);
    if (!item) return next(new ApiError('Item not found', 404));

    const existing = await Wishlist.findOne({ user: req.user._id, itemType: type, itemId });

    if (existing) {
      await Wishlist.deleteOne({ _id: existing._id });
      return res.json({ success: true, saved: false, message: 'Removed from wishlist' });
    }

    const entry = await Wishlist.create({ user: req.user._id, itemType: type, itemId });
    res.status(201).json({ success: true, saved: true, message: 'Added to wishlist', data: entry });
  } catch (error) {
    next(error);
  }
};

exports.getMyWishlist = async (req, res, next) => {
  try {
    const entries = await Wishlist.find({ user: req.user._id }).sort('-createdAt');

    const grouped = {};
    entries.forEach((e) => {
      (grouped[e.itemType] = grouped[e.itemType] || []).push(e);
    });

    const result = [];
    for (const [type, list] of Object.entries(grouped)) {
      const Model = TYPE_MODEL_MAP[type];
      if (!Model) continue; 
      const ids = list.map((e) => e.itemId);
      const items = await Model.find({ _id: { $in: ids } });
      const itemMap = {};
      items.forEach((i) => (itemMap[i._id.toString()] = i));

      list.forEach((e) => {
        const item = itemMap[e.itemId.toString()];
        if (item) { 
          result.push({ _id: e._id, itemType: type, createdAt: e.createdAt, item });
        }
      });
    }

    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const summary = {};
    result.forEach((r) => (summary[r.itemType] = (summary[r.itemType] || 0) + 1));

    res.json({ success: true, count: result.length, summary, data: result });
  } catch (error) {
    next(error);
  }
};

exports.getWishlistStatus = async (req, res, next) => {
  try {
    const { itemType, ids } = req.query;
    if (!itemType || !ids) return next(new ApiError('itemType and ids are required', 400));

    const type = String(itemType).toLowerCase();
    if (!isValidType(type)) return next(new ApiError(`Invalid itemType: ${itemType}`, 400));

    const idList = String(ids).split(',').filter((id) => mongoose.isValidObjectId(id.trim()));

    const saved = await Wishlist.find({
      user: req.user._id,
      itemType: type,
      itemId: { $in: idList },
    }).select('itemId');

    res.json({ success: true, savedIds: saved.map((s) => s.itemId.toString()) });
  } catch (error) {
    next(error);
  }
};

exports.removeWishlistItem = async (req, res, next) => {
  try {
    const entry = await Wishlist.findOne({ _id: req.params.id, user: req.user._id });
    if (!entry) return next(new ApiError('Wishlist item not found', 404));

    await Wishlist.deleteOne({ _id: entry._id });
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
};