const Attendance = require('../models/Attendance');
const Event = require('../models/Event');
const VolunteerProfile = require('../models/VolunteerProfile');

// @desc    Check-in volunteer to an event
// @route   POST /api/attendance/check-in
// @access  Private (Admin or Volunteer via QR)
exports.checkIn = async (req, res, next) => {
    try {
        const { eventId, volunteerId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Check if already checked in
        let attendance = await Attendance.findOne({ event: eventId, volunteer: volunteerId });
        if (attendance) {
            return res.status(400).json({ message: 'Volunteer already checked in' });
        }

        attendance = await Attendance.create({
            event: eventId,
            volunteer: volunteerId,
            checkInTime: new Date(),
            status: 'checked_in'
        });

        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        next(error);
    }
};

// @desc    Check-out volunteer and calculate hours
// @route   POST /api/attendance/check-out
// @access  Private (Admin or Volunteer via QR)
exports.checkOut = async (req, res, next) => {
    try {
        const { eventId, volunteerId } = req.body;

        let attendance = await Attendance.findOne({ event: eventId, volunteer: volunteerId });
        
        if (!attendance) {
            return res.status(404).json({ message: 'No check-in record found' });
        }
        
        if (attendance.status === 'checked_out') {
            return res.status(400).json({ message: 'Already checked out' });
        }

        attendance.checkOutTime = new Date();
        attendance.status = 'checked_out';

        // Calculate hours
        const diffInMs = attendance.checkOutTime - attendance.checkInTime;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        attendance.hoursCalculated = Math.round(diffInHours * 10) / 10; // Round to 1 decimal

        await attendance.save();

        // Update Volunteer Profile total hours
        const profile = await VolunteerProfile.findOne({ user: volunteerId });
        if (profile) {
            profile.totalHours += attendance.hoursCalculated;
            await profile.save();
        }

        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        next(error);
    }
};

// @desc    Get attendance for an event
// @route   GET /api/attendance/event/:eventId
// @access  Private (Admin)
exports.getEventAttendance = async (req, res, next) => {
    try {
        const attendance = await Attendance.find({ event: req.params.eventId })
            .populate('volunteer', 'name email');
        
        res.status(200).json({ success: true, count: attendance.length, data: attendance });
    } catch (error) {
        next(error);
    }
};
