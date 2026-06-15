const express = require('express');
const { getDashboardReport } = require('../controllers/reportController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardReport);

module.exports = router;
