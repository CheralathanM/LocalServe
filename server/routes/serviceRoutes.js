const express = require('express');
const {
  getServices,
  getMyServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, authorize('provider'), createService);

router.route('/my')
  .get(protect, authorize('provider'), getMyServices);

router.route('/:id')
  .put(protect, authorize('provider'), updateService)
  .delete(protect, authorize('provider'), deleteService);

module.exports = router;
