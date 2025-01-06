const Idea = require('../models/ideamodel');
const User = require('../models/usermodel');

const createIdea = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const newIdea = new Idea({ userId, content });
    await newIdea.save();
    await User.findByIdAndUpdate(userId, { $inc: { totalPosts: 1 } });
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().populate('userId', 'alias');
    res.status(200).json(ideas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const likeIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const idea = await Idea.findById(id);
    if (!idea.likes.includes(userId)) {
      idea.likes.push(userId);
      await idea.save();
      await User.findByIdAndUpdate(userId, { $inc: { totalLikes: 1 } });
    }
    res.status(200).json(idea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findByIdAndDelete(id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    await User.findByIdAndUpdate(idea.userId, { $inc: { totalPosts: -1 } });
    res.status(200).json({ message: 'Idea deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createIdea, getIdeas, likeIdea, deleteIdea };
