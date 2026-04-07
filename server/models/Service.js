const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this service'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a service category (e.g. Plumbing, Cleaning)'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price for this service']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
