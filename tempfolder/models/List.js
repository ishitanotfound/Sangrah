const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { 
    type: String, required: true 
  },
  fromDate: { type: Date },
  toDate: { type: Date },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  tasks: [
    {
      title: { type: String },
      completed: { type: Boolean, default: false },
    }
  ],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: null  // means it's a personal list unless explicitly assigned
  }
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);
