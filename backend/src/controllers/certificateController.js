const Certificate = require('../models/Certificate');
const Attendance = require('../models/Attendance');
const generateCertificatePDF = require('../utils/generatePDF');
const crypto = require('crypto');

// @desc    Generate a certificate for a completed event
// @route   POST /api/certificates/generate
// @access  Private (Admin)
exports.generateCertificate = async (req, res, next) => {
    try {
        const { eventId, volunteerId } = req.body;

        // Check if certificate already exists
        let cert = await Certificate.findOne({ event: eventId, volunteer: volunteerId });
        if (cert) {
            return res.status(400).json({ message: 'Certificate already generated for this event' });
        }

        // Get Attendance Record
        const attendance = await Attendance.findOne({ event: eventId, volunteer: volunteerId })
            .populate('volunteer', 'name')
            .populate('event', 'title');

        if (!attendance || attendance.status !== 'checked_out') {
            return res.status(400).json({ message: 'Volunteer has not completed this event' });
        }

        const uniqueId = crypto.randomBytes(6).toString('hex').toUpperCase();

        cert = await Certificate.create({
            volunteer: volunteerId,
            event: eventId,
            uniqueId,
            hoursAwarded: attendance.hoursCalculated
        });

        res.status(201).json({ success: true, data: cert });
    } catch (error) {
        next(error);
    }
};

// @desc    Download Certificate PDF
// @route   GET /api/certificates/:id/download
// @access  Private (Volunteer)
exports.downloadCertificate = async (req, res, next) => {
    try {
        const cert = await Certificate.findById(req.params.id)
            .populate('volunteer', 'name')
            .populate('event', 'title');

        if (!cert) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        if (cert.volunteer._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const pdfBuffer = await generateCertificatePDF(
            cert.volunteer.name,
            cert.event.title,
            cert.hoursAwarded,
            cert.issueDate,
            cert.uniqueId
        );

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Certificate_${cert.uniqueId}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all certificates for a volunteer
// @route   GET /api/certificates/my-certificates
// @access  Private (Volunteer)
exports.getMyCertificates = async (req, res, next) => {
    try {
        const certs = await Certificate.find({ volunteer: req.user.id })
            .populate('event', 'title date');
            
        res.status(200).json({ success: true, count: certs.length, data: certs });
    } catch (error) {
        next(error);
    }
};
