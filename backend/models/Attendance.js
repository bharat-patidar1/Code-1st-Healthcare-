import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  date: { type: Date, required: true },
  clockIn: Date,
  clockOut: Date,
  totalHours: Number,
}, { timestamps: true , collection : "Attendance" });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
