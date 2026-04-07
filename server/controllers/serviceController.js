const Service = require('../models/Service');
const User = require('../models/User');

// @desc    Get all services (Mainly for public/customer searching)
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Handle generic text search across category and name
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = Service.find({
        $or: [
          { category: searchRegex },
          { name: searchRegex }
        ]
      });
    } else {
      query = Service.find();
    }

    // Populate the provider profile info (name, etc)
    query = query.populate('providerId', 'name email');

    const services = await query;
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get current provider's services
// @route   GET /api/services/my
// @access  Private (Provider only)
exports.getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.user.id });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Provider only)
exports.createService = async (req, res) => {
  try {
    const serviceData = {
      ...req.body,
      providerId: req.user.id
    };

    const service = await Service.create(serviceData);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private (Provider only)
exports.updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    // Verify ownership
    if (service.providerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this service' });
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (Provider only)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    // Verify ownership
    if (service.providerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this service' });
    }

    await service.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
