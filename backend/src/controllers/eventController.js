const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public or Private (depending on req)
exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id).populate('registeredVolunteers.user', 'name email');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin)
exports.createEvent = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.id;
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        next(error);
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
exports.updateEvent = async (req, res, next) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private (Volunteer)
exports.registerForEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.status !== 'upcoming') {
            return res.status(400).json({ message: 'Can only register for upcoming events' });
        }

        // Check if already registered
        const isRegistered = event.registeredVolunteers.some(vol => vol.user.toString() === req.user.id);
        if (isRegistered) {
            return res.status(400).json({ message: 'You are already registered for this event' });
        }

        if (event.registeredVolunteers.length >= event.maxVolunteers) {
            return res.status(400).json({ message: 'Event is full' });
        }

        event.registeredVolunteers.push({ user: req.user.id });
        await event.save();

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        next(error);
    }
};
