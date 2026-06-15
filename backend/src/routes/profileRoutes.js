const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Apply auth middleware to all profile routes
router.use(protect);
router.use(authorize('volunteer', 'admin')); // Admins might have profiles too or access this endpoint for themselves

router.route('/')
    .get(getProfile)
    .put(upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'resume', maxCount: 1 }
    ]), updateProfile);

module.exports = router;
