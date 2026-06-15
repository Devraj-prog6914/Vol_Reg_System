const User = require('../models/User');
const VolunteerProfile = require('../models/VolunteerProfile');

// @desc    Get all volunteers
// @route   GET /api/admin/volunteers
// @access  Private (Admin)
exports.getVolunteers = async (req, res, next) => {
    try {
        const volunteers = await VolunteerProfile.find().populate('user', 'name email createdAt');
        res.status(200).json({ success: true, count: volunteers.length, data: volunteers });
    } catch (error) {
        next(error);
    }
};

// @desc    Update volunteer status (Approve/Reject)
// @route   PUT /api/admin/volunteers/:id/status
// @access  Private (Admin)
exports.updateVolunteerStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['approved', 'rejected', 'suspended'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const profile = await VolunteerProfile.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        if (!profile) {
            return res.status(404).json({ message: 'Volunteer profile not found' });
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};
