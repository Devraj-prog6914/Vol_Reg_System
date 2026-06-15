const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
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
    uniqueId: {
        type: String,
        required: true,
        unique: true
    },
    hoursAwarded: {
        type: Number,
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    pdfUrl: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema);
