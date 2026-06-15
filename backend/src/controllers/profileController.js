const VolunteerProfile = require('../models/VolunteerProfile');

// Remove Cloudinary logic as we use local disk storage now

// @desc    Get current user's profile
// @route   GET /api/profile
// @access  Private (Volunteer)
exports.getProfile = async (req, res, next) => {
    try {
        const profile = await VolunteerProfile.findOne({ user: req.user.id }).populate('user', 'name email role');
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

// @desc    Update profile & upload files
// @route   PUT /api/profile
// @access  Private (Volunteer)
exports.updateProfile = async (req, res, next) => {
    try {
        let profile = await VolunteerProfile.findOne({ user: req.user.id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const updates = { ...req.body };

        // Handle nested address object if passed as flat strings
        if (updates.street || updates.city || updates.state || updates.country) {
            updates.address = {
                street: updates.street || profile.address?.street,
                city: updates.city || profile.address?.city,
                state: updates.state || profile.address?.state,
                country: updates.country || profile.address?.country
            };
        }

        // Handle Arrays (Skills, Interests, Languages)
        if (typeof updates.skills === 'string') updates.skills = updates.skills.split(',').map(s => s.trim());
        if (typeof updates.interests === 'string') updates.interests = updates.interests.split(',').map(s => s.trim());
        if (typeof updates.languages === 'string') updates.languages = updates.languages.split(',').map(s => s.trim());

        // Handle File Uploads (Local Storage)
        if (req.files) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            if (req.files['avatar']) {
                updates.avatarUrl = `${baseUrl}/uploads/${req.files['avatar'][0].filename}`;
            }
            if (req.files['resume']) {
                updates.resumeUrl = `${baseUrl}/uploads/${req.files['resume'][0].filename}`;
            }
        }

        profile = await VolunteerProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: updates },
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};
