const express = require('express');
const { getVolunteers, updateVolunteerStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/volunteers', getVolunteers);
router.put('/volunteers/:id/status', updateVolunteerStatus);

module.exports = router;
