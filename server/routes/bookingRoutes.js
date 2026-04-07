const express = require('express');
const { createBooking, getMyBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply protect middleware to all booking routes
router.use(protect);

router.route('/')
  .get(getMyBookings)
  .post(createBooking);

router.route('/:id/status')
  .put(updateBookingStatus);

module.exports = router;
