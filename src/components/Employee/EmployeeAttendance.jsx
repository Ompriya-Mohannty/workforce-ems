import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { todayKey } from '../../utils/storage';

export default function EmployeeAttendance() {
  const { currentUser, checkIn, checkOut, getTodayAttendance, calcHours } = useAuth();
  const [now, setNow] = useState(new Date());

  // Refresh clock every minute
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const att = useMemo(() => JSON.parse(localStorage.getItem('ems_attendance') || '{}'), []);
  const todayRec = getTodayAttendance();
  const todayHours = calcHours(todayRec);

  // Build last 7 days history
  const history = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const rec = att[`${currentUser.id}_${key}`] || null;
      days.push({ date: key, label: i === 0 ? 'Today' : i === 1 ? 'Yesterday' : d.toLocaleDateString('en-IN',{weekday:'short',month:'short',day:'numeric'}), rec, hours: rec ? calcHours(rec) : null });
    }
    return days;
  }, [att, currentUser.id]);

  const thisWeekDays = history.filter(h => h.rec?.checkIn).length;

  return (
    <div className="page fade-in">
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:2 }}>Attendance</h1>
        <p style={{ color:'var(--text3)', fontSize:13 }}>Track your daily check-in and check-out</p>
      </div>

      {/* Today card */}
      <div style={{ background:'linear-gradient(135deg,#1a1e35,#1f2440)', border:'1px solid var(--border)', borderRadius:16, padding:28, marginBottom:24 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
          <div>
            <p style={{ color:'var(--text3)', fontSize:13, marginBottom:6 }}>
              {now.toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
            </p>
            <div style={{ fontSize:40, fontWeight:800, color:'var(--text)', fontVariantNumeric:'tabular-nums', letterSpacing:'-1px' }}>
              {now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}
            </div>
            {todayHours && (
              <p style={{ color:'var(--green2)', fontSize:15, fontWeight:600, marginTop:6 }}>⏱ {todayHours} worked today</p>
            )}
          </div>

          <div style={{ display:'flex', gap:12 }}>
            <div style={{ textAlign:'center' }}>
              <p style={{ color:'var(--text3)', fontSize:12, marginBottom:8 }}>Check In</p>
              <button
                className="btn btn-success"
                disabled={!!todayRec?.checkIn}
                onClick={checkIn}
                style={{ opacity: todayRec?.checkIn ? .5 : 1, flexDirection:'column', padding:'14px 22px' }}
              >
                <span style={{ fontSize:22 }}>→</span>
                <span style={{ fontSize:13 }}>{todayRec?.checkIn ? new Date(todayRec.checkIn).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) : 'Check In'}</span>
              </button>
            </div>
            <div style={{ textAlign:'center' }}>
              <p style={{ color:'var(--text3)', fontSize:12, marginBottom:8 }}>Check Out</p>
              <button
                className="btn btn-danger"
                disabled={!todayRec?.checkIn || !!todayRec?.checkOut}
                onClick={checkOut}
                style={{ opacity: (!todayRec?.checkIn || todayRec?.checkOut) ? .5 : 1, flexDirection:'column', padding:'14px 22px' }}
              >
                <span style={{ fontSize:22 }}>←</span>
                <span style={{ fontSize:13 }}>{todayRec?.checkOut ? new Date(todayRec.checkOut).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) : 'Check Out'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Week summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:16, marginBottom:24 }}>
        {[
          { label:'Days Present (7d)', value:`${thisWeekDays}/7`, color:'var(--green2)', icon:'📅' },
          { label:'Today Status', value: todayRec?.checkIn ? (todayRec.checkOut ? 'Done':'Present') : 'Not In', color: todayRec?.checkIn ? 'var(--green2)':'var(--red2)', icon:'🏢' },
          { label:'Hours Today', value: todayHours || '—', color:'var(--accent2)', icon:'⏱' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize:22, marginBottom:10 }}>{s.icon}</div>
            <p style={{ color:'var(--text3)', fontSize:12, marginBottom:4 }}>{s.label}</p>
            <h2 style={{ color:s.color, fontSize:24, fontWeight:800, lineHeight:1 }}>{s.value}</h2>
          </div>
        ))}
      </div>

      {/* History */}
      <div className="card">
        <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:16, marginBottom:18 }}>Last 7 Days</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {history.map(({ date, label, rec, hours }) => (
            <div key={date} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'var(--bg)', borderRadius:10, border:'1px solid var(--border)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:18 }}>{rec?.checkIn ? '✅' : '❌'}</span>
                <div>
                  <div style={{ color:'var(--text)', fontWeight:600, fontSize:14 }}>{label}</div>
                  <div style={{ color:'var(--text3)', fontSize:12 }}>{date}</div>
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                {rec?.checkIn ? (
                  <>
                    <div style={{ color:'var(--green2)', fontSize:13, fontWeight:600 }}>{hours}</div>
                    <div style={{ color:'var(--text3)', fontSize:11 }}>
                      {new Date(rec.checkIn).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}
                      {rec.checkOut ? ` – ${new Date(rec.checkOut).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}` : ' – Still in'}
                    </div>
                  </>
                ) : (
                  <span style={{ color:'var(--red2)', fontSize:13, fontWeight:600 }}>Absent</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
