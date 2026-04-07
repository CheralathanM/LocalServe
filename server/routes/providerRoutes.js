const express = require('express');
const { getProviders, getProvider, createOrUpdateProfile } = require('../controllers/providerController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getProviders)
  .post(protect, createOrUpdateProfile);

router.route('/:id')
  .get(getProvider);

module.exports = router;
