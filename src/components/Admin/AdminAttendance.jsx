import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { todayKey } from '../../utils/storage';

const avatarColors = ['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f97316','#06b6d4'];

export default function AdminAttendance() {
  const { employees, calcHours } = useAuth();

  const att = useMemo(() => JSON.parse(localStorage.getItem('ems_attendance') || '{}'), []);
  const today = todayKey();

  const rows = useMemo(() => employees.map(emp => {
    const rec = att[`${emp.id}_${today}`] || null;
    return { emp, rec, hours: rec ? calcHours(rec) : null };
  }), [employees, att, today]);

  const present = rows.filter(r => r.rec?.checkIn).length;
  const checkedOut = rows.filter(r => r.rec?.checkOut).length;

  return (
    <div className="page fade-in">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:2 }}>Attendance — Today</h1>
        <p style={{ color:'var(--text3)', fontSize:13 }}>{new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
      </div>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:24 }}>
        {[
          { label:'Total', value: employees.length, color:'var(--accent2)', icon:'👥' },
          { label:'Present', value: present, color:'var(--green2)', icon:'✅' },
          { label:'Absent', value: employees.length - present, color:'var(--red2)', icon:'❌' },
          { label:'Checked Out', value: checkedOut, color:'var(--yellow2)', icon:'🏃' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize:24, marginBottom:10 }}>{s.icon}</div>
            <p style={{ color:'var(--text3)', fontSize:13, marginBottom:4 }}>{s.label}</p>
            <h2 style={{ color:s.color, fontSize:30, fontWeight:800, lineHeight:1 }}>{s.value}</h2>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <table className="table">
          <thead>
            <tr><th>Employee</th><th>Department</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr>
          </thead>
          <tbody>
            {rows.map(({ emp, rec, hours }, i) => (
              <tr key={emp.id}>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div className="avatar" style={{ width:32, height:32, fontSize:12, background:avatarColors[i%avatarColors.length] }}>{emp.avatar}</div>
                    <div>
                      <div style={{ color:'var(--text)', fontWeight:600, fontSize:13 }}>{emp.firstName} {emp.lastName}</div>
                      <div style={{ color:'var(--text3)', fontSize:11 }}>{emp.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize:13 }}>{emp.department}</td>
                <td style={{ fontSize:13, color: rec?.checkIn ? 'var(--green2)' : 'var(--text3)' }}>
                  {rec?.checkIn ? new Date(rec.checkIn).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) : '—'}
                </td>
                <td style={{ fontSize:13, color: rec?.checkOut ? 'var(--red2)' : 'var(--text3)' }}>
                  {rec?.checkOut ? new Date(rec.checkOut).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) : rec?.checkIn ? 'Still in' : '—'}
                </td>
                <td style={{ fontSize:13, color:'var(--text2)', fontWeight:600 }}>{hours || '—'}</td>
                <td>
                  {rec?.checkIn
                    ? <span className={`badge ${rec.checkOut ? 'badge-completed' : 'badge-in-progress'}`}>{rec.checkOut ? 'Done' : 'Present'}</span>
                    : <span className="badge badge-failed">Absent</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
