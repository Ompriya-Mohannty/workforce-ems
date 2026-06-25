import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTaskStats, todayKey } from '../../utils/storage';

const Stat = ({ label, value, icon, color, bg, sub }) => (
  <div className="stat-card fade-up" style={{ '--hover-glow': bg }}>
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
      <div style={{ width:40, height:40, borderRadius:11, background:`${bg}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{icon}</div>
      {sub && <span style={{ color:'var(--green2)', fontSize:12, fontWeight:600, background:'rgba(16,185,129,.1)', padding:'2px 8px', borderRadius:12 }}>{sub}</span>}
    </div>
    <p style={{ color:'var(--text3)', fontSize:13, fontWeight:500, marginBottom:4 }}>{label}</p>
    <h2 style={{ color, fontSize:32, fontWeight:800, lineHeight:1 }}>{value}</h2>
  </div>
);

const MiniBar = ({ val, color }) => (
  <div className="progress-track" style={{ flex:1 }}>
    <div className="progress-fill" style={{ width:`${Math.min(val,100)}%`, background:color }}/>
  </div>
);

export default function AdminDashboard({ setPage }) {
  const { employees } = useAuth();

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'active').length;
    const today = todayKey();
    // count present today via attendance in storage
    const att = JSON.parse(localStorage.getItem('ems_attendance') || '{}');
    const present = Object.keys(att).filter(k => k.endsWith(`_${today}`) && att[k].checkIn).length;
    let pending = 0, inProg = 0, done = 0, failed = 0;
    employees.forEach(e => {
      const s = getTaskStats(e);
      pending += s.pending; inProg += s.inProgress; done += s.completed; failed += s.failed;
    });
    return { total, active, present, pending, inProg, done, failed };
  }, [employees]);

  const recentEmps = useMemo(() =>
    [...employees].sort((a,b) => new Date(b.joinDate) - new Date(a.joinDate)).slice(0,5),
  [employees]);

  const deptMap = useMemo(() => {
    const m = {};
    employees.forEach(e => { m[e.department] = (m[e.department]||0) + 1; });
    return Object.entries(m).sort((a,b) => b[1]-a[1]);
  }, [employees]);

  const avatarColors = ['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ec4899','#14b8a6'];

  return (
    <div className="page fade-in">
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <h1 style={{ color:'var(--text)', fontSize:24, fontWeight:800, marginBottom:4 }}>Admin Dashboard</h1>
        <p style={{ color:'var(--text3)', fontSize:14 }}>Overview of your organisation — {new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, marginBottom:28 }}>
        <Stat label="Total Employees" value={stats.total}   icon="👥" color="var(--accent2)" bg="#6366f1"/>
        <Stat label="Active Today"    value={stats.active}  icon="✅" color="var(--green2)"  bg="#10b981" sub="+0 this week"/>
        <Stat label="Present Today"   value={stats.present} icon="🏢" color="var(--blue2)"   bg="#3b82f6"/>
        <Stat label="Pending Tasks"   value={stats.pending} icon="⏳" color="var(--yellow2)" bg="#f59e0b"/>
        <Stat label="In Progress"     value={stats.inProg}  icon="⚡" color="var(--blue2)"   bg="#3b82f6"/>
        <Stat label="Completed"       value={stats.done}    icon="🎯" color="var(--green2)"  bg="#10b981"/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:20, alignItems:'start' }}>
        {/* Recent employees table */}
        <div className="card">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
            <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:16 }}>Recent Employees</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage('employees')}>View all →</button>
          </div>
          <table className="table">
            <thead><tr><th>Employee</th><th>Role</th><th>Department</th><th>Tasks</th><th>Status</th></tr></thead>
            <tbody>
              {recentEmps.map((emp, i) => {
                const ts = getTaskStats(emp);
                const pct = ts.total > 0 ? Math.round((ts.completed / ts.total)*100) : 0;
                return (
                  <tr key={emp.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div className="avatar" style={{ width:32, height:32, background:avatarColors[i%avatarColors.length], fontSize:12 }}>{emp.avatar}</div>
                        <div>
                          <div style={{ color:'var(--text)', fontWeight:600, fontSize:13 }}>{emp.firstName} {emp.lastName}</div>
                          <div style={{ color:'var(--text3)', fontSize:11 }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize:13 }}>{emp.role}</td>
                    <td><span className="badge badge-active" style={{ fontSize:11 }}>{emp.department}</span></td>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <MiniBar val={pct} color="var(--green)"/>
                        <span style={{ fontSize:12, color:'var(--text3)', whiteSpace:'nowrap' }}>{pct}%</span>
                      </div>
                    </td>
                    <td><span className={`badge badge-${emp.status}`}>{emp.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Department breakdown */}
        <div className="card">
          <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:16, marginBottom:18 }}>By Department</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {deptMap.map(([dept, count], i) => {
              const pct = Math.round((count / employees.length)*100);
              return (
                <div key={dept}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ color:'var(--text2)', fontSize:13, fontWeight:500 }}>{dept}</span>
                    <span style={{ color:'var(--text3)', fontSize:12 }}>{count} member{count!==1?'s':''}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width:`${pct}%`, background: avatarColors[i%avatarColors.length]}}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick actions */}
          <div style={{ marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)' }}>
            <p style={{ color:'var(--text3)', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:12 }}>Quick Actions</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <button className="btn btn-primary btn-sm" style={{ justifyContent:'center' }} onClick={() => setPage('tasks')}>+ Assign New Task</button>
              <button className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }} onClick={() => setPage('employees')}>View All Employees</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
