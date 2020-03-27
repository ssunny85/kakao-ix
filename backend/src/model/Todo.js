const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const TodoSchema = new mongoose.Schema({
  id: {type: Number, default: 1, unique: true},
  content: String,
  completed: {type: Boolean, default: false},
  referenceId: [Number],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

autoIncrement.initialize(mongoose.connection);
TodoSchema.plugin(autoIncrement.plugin, {
  model: 'Todo',
  field: 'id',
  startAt: 1,
  increment: 1,
});
module.exports = mongoose.model('Todo', TodoSchema);
