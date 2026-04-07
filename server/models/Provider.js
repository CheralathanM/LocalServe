const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  serviceCategory: {
    type: String,
    required: [true, 'Please add a service category (e.g. Plumber, Electrician)'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a brief description of your services'],
    maxlength: 500
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Please add your hourly rate']
  },
  location: {
    type: String,
    required: [true, 'Please add your primary location/city']
  },
  rating: {
    type: Number,
    default: 0
  },
  jobsCompleted: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Provider', providerSchema);
