const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add an event title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    date: {
        type: Date,
        required: [true, 'Please add an event date']
    },
    time: {
        type: String,
        required: [true, 'Please add a time (e.g., 09:00 AM)']
    },
    venue: {
        type: String,
        required: [true, 'Please add a venue']
    },
    maxVolunteers: {
        type: Number,
        required: [true, 'Please specify maximum number of volunteers']
    },
    category: {
        type: String,
        required: [true, 'Please specify a category (e.g., Environment, Education)'],
        enum: ['Environment', 'Education', 'Health', 'Community', 'Relief', 'Other']
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    registeredVolunteers: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        registeredAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['registered', 'cancelled', 'attended', 'no-show'],
            default: 'registered'
        }
    }],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
