const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectID = Schema.Types.ObjectId;

const TaskSchema = new Schema({
  project: {
    type: objectID,
    ref: 'Task',
    required: true
  },
  title: { type: String, required: true },
  description: String,
  status: { type: Number, default: 1 },
  dependence: [{
    type: objectID,
    ref: 'Task',
    default: null
  }],
  workers: [{
    type: String,
    ref: 'User',
    default: null
  }],
  start_date: { type: Date, default: new Date() },
  end_date: { type: Date, required: true },
  complete_date: { type: Date, default: null },
  sub_tasks: [{
    type: objectID,
    ref: 'Task',
    default: null
  }]
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;