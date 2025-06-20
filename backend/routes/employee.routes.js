import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeProfile,
} from '../controllers/employee.controller.js';

import {verifyToken} from '../middlewares/auth.middleware.js';
import checkRole from '../middlewares/role.middleware.js';

const router = express.Router();

// POST /api/employees → Admin creates employee
router.post('/', verifyToken, checkRole('admin'), createEmployee);

// GET /api/employees → Admin fetches all employees
router.get('/', verifyToken, checkRole('admin'), getAllEmployees);

// GET /api/employees/profile → Employee fetches own profile
router.get('/profile', verifyToken, checkRole('employee'), getEmployeeProfile);

export default router;
