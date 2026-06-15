const express = require('express');
const { generateCertificate, downloadCertificate, getMyCertificates } = require('../controllers/certificateController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/generate', authorize('admin'), generateCertificate);
router.get('/:id/download', downloadCertificate);
router.get('/my-certificates', authorize('volunteer'), getMyCertificates);

module.exports = router;
