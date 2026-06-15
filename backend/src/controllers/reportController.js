const VolunteerProfile = require('../models/VolunteerProfile');
const Event = require('../models/Event');
const Attendance = require('../models/Attendance');

// @desc    Get dashboard metrics and reports
// @route   GET /api/reports/dashboard
// @access  Private (Admin)
exports.getDashboardReport = async (req, res, next) => {
    try {
        const totalVolunteers = await VolunteerProfile.countDocuments();
        const pendingVolunteers = await VolunteerProfile.countDocuments({ status: 'pending' });
        const approvedVolunteers = await VolunteerProfile.countDocuments({ status: 'approved' });
        
        const totalEvents = await Event.countDocuments();
        const activeEvents = await Event.countDocuments({ status: 'upcoming' });

        const attendanceRecords = await Attendance.find();
        const totalHours = attendanceRecords.reduce((acc, curr) => acc + curr.hoursCalculated, 0);

        // Simple aggregation for chart data: Registrations by Month
        const registrationsByMonth = await VolunteerProfile.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                metrics: {
                    totalVolunteers,
                    pendingVolunteers,
                    approvedVolunteers,
                    totalEvents,
                    activeEvents,
                    totalHours: Math.round(totalHours * 10) / 10
                },
                charts: {
                    registrationsByMonth
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
