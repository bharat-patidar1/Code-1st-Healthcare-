import Navbar from '../../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useEffect, useState } from 'react';
import api from '../../lib/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ employees: 0, messages: 0, attendance: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [empRes, msgRes, attRes] = await Promise.all([
          api.get('/employees'),
          api.get('/messages/admin'),
          api.get('/attendance'),
        ]);
        setStats({
          employees: empRes.data.length,
          messages: msgRes.data.length,
          attendance: attRes.data.length,
        });
      } catch (err) {
        console.error('Dashboard error:', err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Employees</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{stats.employees}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Messages</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{stats.messages}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Attendance Records</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{stats.attendance}</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
