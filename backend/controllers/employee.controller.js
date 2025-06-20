import {Employee} from '../models/Employee.js';
import generatePassword from '../utils/generatePassword.js';
import {sendEmail} from '../utils/sendEmail.js';

export const createEmployee = async (req, res) => {
  const { fullName, email, phone } = req.body;

  try {
    const existing = await Employee.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Employee already exists' });

    const tempPassword = generatePassword();
    const employee = new Employee({
      fullName,
      email,
      phone,
      password: tempPassword,
      mustChangePassword: true
    });
    await employee.save();

    await sendEmail(email, 'Welcome to Code 1st Healthcare', `
      Hi ${fullName},

      Your employee account has been created.

      Login Email: ${email}
      Temporary Password: ${tempPassword}

      Please log in and change your password.

      Regards,
      Code 1st Team
    `);

    res.status(201).json({ message: 'Employee created and invitation sent' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating employee', error: err.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select('-password');
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
};

export const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select('-password');
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};
