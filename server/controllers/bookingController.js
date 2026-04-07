const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (Customer)
exports.createBooking = async (req, res) => {
  try {
    const { providerId, serviceDate, notes } = req.body;

    if (req.user.role !== 'customer') {
      return res.status(403).json({ success: false, error: 'Only customers can book services' });
    }

    // Verify it's a valid provider
    const provider = await User.findById(providerId);
    if (!provider || provider.role !== 'provider') {
      return res.status(404).json({ success: false, error: 'Provider not found' });
    }

    const booking = await Booking.create({
      customer: req.user.id,
      provider: providerId,
      serviceDate,
      notes
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'customer') {
      // Find bookings where current user is customer
      query = Booking.find({ customer: req.user.id })
        .populate('provider', 'name email');
    } else {
      // Find bookings where current user is the provider
      query = Booking.find({ provider: req.user.id })
        .populate('customer', 'name email');
    }

    const bookings = await query.sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Provider)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Ensure the user is a provider
    if (req.user.role !== 'provider') {
      return res.status(403).json({ success: false, error: 'Only providers can update booking status' });
    }

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Verify this booking belongs to the current provider
    if (booking.provider.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this booking' });
    }

    // Update status
    booking.status = status;
    await booking.save();

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
