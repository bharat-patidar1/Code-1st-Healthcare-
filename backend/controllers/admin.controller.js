import {Admin} from '../models/Admin.js';

export const createAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Admin already exists' });

    const admin = new Admin({ fullName, email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin', error: err.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admins', error: err.message });
  }
};
