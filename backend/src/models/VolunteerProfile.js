const mongoose = require('mongoose');

const volunteerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer_not_to_say', ''],
        default: ''
    },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        country: { type: String, default: '' }
    },
    skills: {
        type: [String],
        default: []
    },
    interests: {
        type: [String],
        default: []
    },
    experienceLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', ''],
        default: ''
    },
    availability: {
        type: String,
        default: ''
    },
    preferredArea: {
        type: String,
        default: ''
    },
    languages: {
        type: [String],
        default: []
    },
    resumeUrl: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    whyVolunteer: {
        type: String,
        default: ''
    },
    emergencyContact: {
        name: { type: String, default: '' },
        phone: { type: String, default: '' },
        relation: { type: String, default: '' }
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'suspended'],
        default: 'pending'
    },
    totalHours: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    badges: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('VolunteerProfile', volunteerProfileSchema);
