const Announcement = require('../models/Announcement');

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Private
exports.getAnnouncements = async (req, res, next) => {
    try {
        let query;

        if (req.user.role === 'admin') {
            query = Announcement.find().populate('author', 'name');
        } else {
            query = Announcement.find({ targetAudience: { $in: ['all', 'volunteers'] } }).populate('author', 'name');
        }

        const announcements = await query.sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: announcements.length, data: announcements });
    } catch (error) {
        next(error);
    }
};

// @desc    Create announcement
// @route   POST /api/announcements
// @access  Private (Admin)
exports.createAnnouncement = async (req, res, next) => {
    try {
        req.body.author = req.user.id;
        const announcement = await Announcement.create(req.body);

        // TODO: Emit socket event here for real-time update
        if (req.io) {
            req.io.emit('new_announcement', announcement);
        }

        res.status(201).json({ success: true, data: announcement });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private (Admin)
exports.deleteAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        await announcement.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
