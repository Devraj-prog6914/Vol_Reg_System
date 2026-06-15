const express = require('express');
const { checkIn, checkOut, getEventAttendance } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/check-in', authorize('admin', 'volunteer'), checkIn);
router.post('/check-out', authorize('admin', 'volunteer'), checkOut);
router.get('/event/:eventId', authorize('admin'), getEventAttendance);

module.exports = router;
