/* src/pages/Attendance.jsx */
import { useEffect, useState } from 'react';
import api from '../lib/axios';
import Navbar from '../components/Navbar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'sonner'     // shadcn toast

// helper to get just the date portion (midnight)
const todayMidnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const Attendance = () => {
  const [today, setToday] = useState(null);      // today’s record
  const [history, setHistory] = useState([]);    // last 7 days

  /* ---------- Load attendance data on mount ---------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/attendance/me');
        const records = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setHistory(records.slice(0, 7));

        const todaysRecord = records.find(
          (rec) => new Date(rec.date).toISOString() === todayMidnight()
        );
        setToday(todaysRecord);
      } catch (err) {
        toast.error("Something went wrong.");
        //toast({ title: 'Error', description: err.response?.data?.message || 'Failed to load attendance', variant: 'destructive' });
      }
    };
    fetchData();
  }, []);

  /* ---------- Clock‑In / Clock‑Out handlers ---------- */
  const handleClockIn = async () => {
    try {
      const res = await api.post('/attendance/clock-in');
      setToday(res.data.data);
      toast.success("Clocked In — Have a productive day!");
    } catch (err) {
        toast.error("Clocked In Failed— Try Again!");
    //   toast({ title: 'Clock‑In failed', description: err.response?.data?.message || 'Try again', variant: 'destructive' });
    }
  };

  const handleClockOut = async () => {
    try {
      const res = await api.post('/attendance/clock-out');
      setToday(res.data.data);
      toast.success("Clocked Out ! Good Job today")
     // toast({ title: 'Clocked Out', description: 'Good job today!' });
    } catch (err) {
        toast.error("Clocked Out Failed — Try Again!");
    //   toast({ title: 'Clock‑Out failed', description: err.response?.data?.message || 'Try again', variant: 'destructive' });
    }
  };

  /* ---------- UI ---------- */
  const clockInDisabled  = today?.clockIn;
  const clockOutDisabled = !today?.clockIn || today?.clockOut;

  const formatTime = (t) =>
    t ? new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Attendance</h2>

        {/* --- Today Card --- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Today&nbsp;—&nbsp;{new Date().toDateString()}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-6 text-lg">
              <span>In: <strong>{formatTime(today?.clockIn)}</strong></span>
              <span>Out: <strong>{formatTime(today?.clockOut)}</strong></span>
              <span>Hours: <strong>{today?.totalHours?.toFixed(2) || 0}</strong></span>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleClockIn}
                disabled={clockInDisabled}
              >
                Clock In
              </Button>
              <Button
                onClick={handleClockOut}
                disabled={clockOutDisabled}
                variant="outline"
              >
                Clock Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* --- History Card --- */}
        <Card>
          <CardHeader>
            <CardTitle>Last&nbsp;7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {history.length === 0 && <p>No records yet.</p>}
              {history.map((item) => (
                <li key={item._id} className="flex justify-between border-b pb-1">
                  <span>{new Date(item.date).toDateString()}</span>
                  <span>
                    {formatTime(item.clockIn)} → {formatTime(item.clockOut)} ({item.totalHours?.toFixed(2) || 0} h)
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Attendance;
