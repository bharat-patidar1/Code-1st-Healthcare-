import {Attendance} from '../models/Attendance.js';
import dayjs from 'dayjs';

// Employee Clock-In
export const clockIn = async (req, res) => {
  const employeeId = req.user.id;
  const today = dayjs().startOf('day').toDate();

  try {
    const alreadyClockedIn = await Attendance.findOne({ employeeId, date: today });
    if (alreadyClockedIn?.clockIn) {
      return res.status(400).json({ message: 'Already clocked in today.' });
    }

    const record = await Attendance.findOneAndUpdate(
      { employeeId, date: today },
      { $set: { clockIn: new Date() } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Clock-in recorded', data: record });
  } catch (err) {
    res.status(500).json({ message: 'Clock-in failed', error: err.message });
  }
};

// Employee Clock-Out
export const clockOut = async (req, res) => {
  const employeeId = req.user.id;
  const today = dayjs().startOf('day').toDate();

  try {
    const attendance = await Attendance.findOne({ employeeId, date: today });
    if (!attendance?.clockIn) {
      return res.status(400).json({ message: 'Please clock in first.' });
    }

    const clockOutTime = new Date();
    const totalHours = (clockOutTime - attendance.clockIn) / (1000 * 60 * 60);

    attendance.clockOut = clockOutTime;
    attendance.totalHours = parseFloat(totalHours.toFixed(2));
    await attendance.save();

    res.status(200).json({ message: 'Clock-out recorded', data: attendance });
  } catch (err) {
    res.status(500).json({ message: 'Clock-out failed', error: err.message });
  }
};

// Admin: Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate('employeeId', 'fullName email');
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching records', error: err.message });
  }
};

// Employee: Get own attendance history
export const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ employeeId: req.user.id }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching records', error: err.message });
  }
};
