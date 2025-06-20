import jwt from 'jsonwebtoken';
import {Admin} from '../models/Admin.js';
import {Employee} from '../models/Employee.js';

const generateToken = (user, role) => {
  return jwt.sign(
    { id: user._id, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Login for both Admin and Employee
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else if (role === 'employee') {
      user = await Employee.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user, role);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role
      },
      mustChangePassword: user.mustChangePassword || false
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id, role } = req.user;

  try {
    const Model = role === 'admin' ? Admin : Employee;
    const user = await Model.findById(id);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(401).json({ message: 'Current password incorrect' });

    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error changing password', error: err.message });
  }
};
