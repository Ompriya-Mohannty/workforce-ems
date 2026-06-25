import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTaskStats } from '../../utils/storage';

const STATUS_COLORS = {
  pending:     { bg:'rgba(245,158,11,.12)',  color:'var(--yellow2)', dot:'🟡' },
  'in-progress':{ bg:'rgba(59,130,246,.12)', color:'var(--blue2)',   dot:'⚡' },
  completed:   { bg:'rgba(16,185,129,.12)',  color:'var(--green2)',  dot:'✅' },
  failed:      { bg:'rgba(239,68,68,.12)',   color:'var(--red2)',    dot:'❌' },
};

export default function EmployeeDashboard({ setPage }) {
  const { currentUser, updateTaskStatus, checkIn, checkOut, getTodayAttendance, calcHours } = useAuth();
  const emp = currentUser;

  const stats = useMemo(() => getTaskStats(emp), [emp]);
  const att   = getTodayAttendance();
  const hours = calcHours(att);

  const recentTasks = useMemo(() =>
    [...(emp.tasks || [])].sort((a,b) => new Date(b.assignedAt) - new Date(a.assignedAt)).slice(0, 5),
  [emp.tasks]);

  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="page fade-in">
      {/* Welcome banner */}
      <div style={{
        background:'linear-gradient(135deg,#1a1e35 0%,#1f2440 100%)',
        border:'1px solid var(--border)', borderRadius:16, padding:'24px 28px',
        marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16
      }}>
        <div>
          <p style={{ color:'var(--text3)', fontSize:13, marginBottom:4 }}>
            {new Date().toLocaleDateString('en-IN',{weekday:'long', year:'numeric', month:'long', day:'numeric'})}
          </p>
          <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:4 }}>
            Welcome back, {emp.firstName}! 👋
          </h1>
          <p style={{ color:'var(--text3)', fontSize:13 }}>{emp.role} · {emp.department} · {emp.employeeId}</p>
        </div>

        {/* Attendance widget */}
        <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 20px', minWidth:220 }}>
          <p style={{ color:'var(--text3)', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:10 }}>Today's Attendance</p>
          {hours && (
            <div style={{ color:'var(--green2)', fontSize:20, fontWeight:800, marginBottom:10 }}>⏱ {hours}</div>
          )}
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-success btn-sm" disabled={!!att?.checkIn} onClick={checkIn} style={{ flex:1, justifyContent:'center', opacity: att?.checkIn ? 0.5 : 1 }}>
              {att?.checkIn ? '✓ Checked In' : '→ Check In'}
            </button>
            <button className="btn btn-danger btn-sm" disabled={!att?.checkIn || !!att?.checkOut} onClick={checkOut} style={{ flex:1, justifyContent:'center', opacity: (!att?.checkIn || att?.checkOut) ? 0.5 : 1 }}>
              {att?.checkOut ? '✓ Done' : '← Check Out'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:24 }}>
        {[
          { label:'Total Tasks',  value:stats.total,      color:'var(--accent2)', icon:'📋' },
          { label:'In Progress',  value:stats.inProgress, color:'var(--blue2)',   icon:'⚡' },
          { label:'Completed',    value:stats.completed,  color:'var(--green2)', icon:'✅' },
          { label:'Pending',      value:stats.pending,    color:'var(--yellow2)',icon:'⏳' },
          { label:'Failed',       value:stats.failed,     color:'var(--red2)',    icon:'❌' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize:22, marginBottom:10 }}>{s.icon}</div>
            <p style={{ color:'var(--text3)', fontSize:12, marginBottom:4 }}>{s.label}</p>
            <h2 style={{ color:s.color, fontSize:28, fontWeight:800, lineHeight:1 }}>{s.value}</h2>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:20, alignItems:'start' }}>
        {/* Recent tasks */}
        <div className="card">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
            <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:16 }}>Recent Tasks</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage('tasks')}>View all →</button>
          </div>
          {recentTasks.length === 0 ? (
            <div style={{ textAlign:'center', padding:32, color:'var(--text3)' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
              <p>No tasks yet</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {recentTasks.map(task => {
                const sc = STATUS_COLORS[task.status] || STATUS_COLORS.pending;
                return (
                  <div key={task.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 14px', background:'var(--bg)', borderRadius:10, border:'1px solid var(--border)' }}>
                    <span style={{ fontSize:18 }}>{sc.dot}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ color:'var(--text)', fontWeight:600, fontSize:14, marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{task.title}</div>
                      <div style={{ display:'flex', gap:8 }}>
                        <span style={{ fontSize:11, color:'var(--text3)' }}>{task.category}</span>
                        <span style={{ fontSize:11, color:'var(--text3)' }}>· Due {task.dueDate}</span>
                      </div>
                    </div>
                    <span className={`badge badge-${task.status}`} style={{ fontSize:11, flexShrink:0 }}>{task.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Progress card */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="card">
            <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:15, marginBottom:16 }}>Overall Progress</h3>
            <div style={{ textAlign:'center', marginBottom:16 }}>
              <span style={{ fontSize:42, fontWeight:800, color:'var(--green2)' }}>{pct}%</span>
              <p style={{ color:'var(--text3)', fontSize:13, marginTop:4 }}>tasks completed</p>
            </div>
            <div className="progress-track" style={{ height:10, marginBottom:16 }}>
              <div className="progress-fill" style={{ width:`${pct}%`, background:'linear-gradient(90deg,var(--green),var(--green2))' }}/>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {[['✅','Completed',stats.completed,'var(--green2)'],['⚡','In Progress',stats.inProgress,'var(--blue2)'],['⏳','Pending',stats.pending,'var(--yellow2)'],['❌','Failed',stats.failed,'var(--red2)']].map(([ico,label,val,color]) => (
                <div key={label} style={{ background:'var(--bg)', borderRadius:8, padding:'10px 12px', border:'1px solid var(--border)' }}>
                  <div style={{ fontSize:16, marginBottom:4 }}>{ico}</div>
                  <div style={{ color:'var(--text3)', fontSize:11 }}>{label}</div>
                  <div style={{ color, fontWeight:700, fontSize:18 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile quick */}
          <div className="card" style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:15, marginBottom:4 }}>My Profile</h3>
            {[['📧',emp.email],['📱',emp.phone],['🏢',emp.department],['📅',`Joined ${emp.joinDate}`]].map(([ico,val]) => (
              <div key={val} style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:14 }}>{ico}</span>
                <span style={{ color:'var(--text2)', fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{val}</span>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" style={{ marginTop:4, justifyContent:'center' }} onClick={() => setPage('profile')}>Edit Profile →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
