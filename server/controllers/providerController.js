const Provider = require('../models/Provider');

// @desc    Get all providers
// @route   GET /api/providers
// @access  Public
exports.getProviders = async (req, res) => {
  try {
    const { search, category, location } = req.query;
    
    let query = {};
    
    // Optional filters based on query params
    if (category) {
      query.serviceCategory = { $regex: category, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Fetch providers and populate their basic user details (name, email)
    const providers = await Provider.find(query).populate('user', 'name email');
    
    // If there's a general search term, filter in memory across name and category
    // Doing it in-memory here for simplicity since name is on the populated user model
    let filteredProviders = providers;
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filteredProviders = providers.filter(p => {
        return searchRegex.test(p.serviceCategory) || 
               searchRegex.test(p.description) ||
               (p.user && searchRegex.test(p.user.name));
      });
    }

    res.status(200).json({
      success: true,
      count: filteredProviders.length,
      data: filteredProviders
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single provider
// @route   GET /api/providers/:id
// @access  Public
exports.getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).populate('user', 'name email');
    
    if (!provider) {
      return res.status(404).json({ success: false, error: 'Provider not found' });
    }

    res.status(200).json({ success: true, data: provider });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create or update provider profile
// @route   POST /api/providers
// @access  Private (Provider only)
exports.createOrUpdateProfile = async (req, res) => {
  try {
    // Check if user is actually a provider
    if (req.user.role !== 'provider') {
      return res.status(403).json({ success: false, error: 'Only providers can create profiles' });
    }

    const { serviceCategory, description, hourlyRate, location } = req.body;
    
    const profileFields = {
      user: req.user.id,
      serviceCategory,
      description,
      hourlyRate,
      location
    };

    let provider = await Provider.findOne({ user: req.user.id });

    if (provider) {
      // Update
      provider = await Provider.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, runValidators: true }
      ).populate('user', 'name email');

      return res.status(200).json({ success: true, data: provider });
    }

    // Create
    provider = await Provider.create(profileFields);
    await provider.populate('user', 'name email');

    res.status(201).json({ success: true, data: provider });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
