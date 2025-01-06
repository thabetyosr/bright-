const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  user: { type: String, required: true },
  idea: { type: String, required: true },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Idea', ideaSchema);
