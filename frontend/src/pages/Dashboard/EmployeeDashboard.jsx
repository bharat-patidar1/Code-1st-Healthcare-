import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const EmployeeDashboard = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get('/attendance/me');
        setAttendance(res.data.slice(0, 5)); // last 5 entries
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Employee Dashboard</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {attendance.length === 0 && <p>No records yet.</p>}
                {attendance.map((item, idx) => (
                  <li key={idx} className="border-b pb-1">
                    <strong>{new Date(item.date).toDateString()}</strong><br />
                    In: {item.clockIn ? new Date(item.clockIn).toLocaleTimeString() : '--'} | Out: {item.clockOut ? new Date(item.clockOut).toLocaleTimeString() : '--'} | Hours: {item.totalHours || 0}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
