const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    volunteer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    checkInTime: {
        type: Date,
        default: null
    },
    checkOutTime: {
        type: Date,
        default: null
    },
    hoursCalculated: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['checked_in', 'checked_out', 'absent'],
        default: 'checked_in'
    }
}, {
    timestamps: true
});

// Ensure a volunteer can only have one attendance record per event
attendanceSchema.index({ volunteer: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
