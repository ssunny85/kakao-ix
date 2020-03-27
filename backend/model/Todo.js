const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  id: Number,
  content: String,
  completed: Boolean,
  referenceId: [Number],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Todo', Todo);
