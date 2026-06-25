import React from 'react';
import { getTaskStats } from '../../utils/storage';

const STATUS_COLORS = { pending:'badge-pending', 'in-progress':'badge-in-progress', completed:'badge-completed', failed:'badge-failed' };

export default function EmployeeDetail({ emp, onBack }) {
  if (!emp) return null;
  const stats = getTaskStats(emp);
  const pct   = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="page fade-in">
      <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom:20 }}>← Back to Employees</button>

      <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:20, alignItems:'start' }}>
        {/* Profile card */}
        <div className="card" style={{ textAlign:'center' }}>
          <div className="avatar" style={{ width:72, height:72, fontSize:26, background:'linear-gradient(135deg,#6366f1,#818cf8)', margin:'0 auto 14px' }}>
            {emp.avatar}
          </div>
          <h2 style={{ color:'var(--text)', fontWeight:800, fontSize:18, marginBottom:4 }}>{emp.firstName} {emp.lastName}</h2>
          <p style={{ color:'var(--text3)', fontSize:13, marginBottom:10 }}>{emp.role}</p>
          <div style={{ display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap', marginBottom:16 }}>
            <span className="badge badge-active">{emp.department}</span>
            <span className={`badge badge-${emp.status}`}>{emp.status}</span>
          </div>
          <div style={{ textAlign:'left', borderTop:'1px solid var(--border)', paddingTop:16 }}>
            {[['🪪','ID',emp.employeeId],['📧','Email',emp.email],['📱','Phone',emp.phone],['💰','Salary',`₹${emp.salary?.toLocaleString()}/mo`],['📅','Joined',emp.joinDate]].map(([ico,l,v]) => (
              <div key={l} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                <span style={{ fontSize:15, width:20 }}>{ico}</span>
                <div>
                  <div style={{ color:'var(--text3)', fontSize:11 }}>{l}</div>
                  <div style={{ color:'var(--text2)', fontSize:13, wordBreak:'break-all' }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks + stats */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Stat row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
            {[['Total',stats.total,'var(--accent2)','📋'],['Done',stats.completed,'var(--green2)','✅'],['Active',stats.inProgress,'var(--blue2)','⚡'],['Failed',stats.failed,'var(--red2)','❌']].map(([l,v,c,ico]) => (
              <div key={l} className="card" style={{ textAlign:'center', padding:16 }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{ico}</div>
                <div style={{ color:'var(--text3)', fontSize:12, marginBottom:4 }}>{l}</div>
                <div style={{ color:c, fontSize:26, fontWeight:800 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{ color:'var(--text)', fontWeight:600 }}>Task Completion</span>
              <span style={{ color:'var(--green2)', fontWeight:700 }}>{pct}%</span>
            </div>
            <div className="progress-track" style={{ height:10 }}>
              <div className="progress-fill" style={{ width:`${pct}%`, background:'linear-gradient(90deg,var(--green),var(--green2))' }}/>
            </div>
          </div>

          {/* Task list */}
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)' }}>
              <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:15 }}>All Tasks ({emp.tasks?.length || 0})</h3>
            </div>
            <table className="table">
              <thead><tr><th>Task</th><th>Category</th><th>Priority</th><th>Due</th><th>Status</th></tr></thead>
              <tbody>
                {(emp.tasks || []).length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign:'center', color:'var(--text3)', padding:32 }}>No tasks assigned</td></tr>
                ) : (emp.tasks || []).map(t => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ color:'var(--text)', fontWeight:600, fontSize:13 }}>{t.title}</div>
                      <div style={{ color:'var(--text3)', fontSize:11, maxWidth:240, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.description}</div>
                    </td>
                    <td><span className="badge badge-active" style={{ fontSize:11 }}>{t.category}</span></td>
                    <td style={{ fontSize:13, color: t.priority==='high'?'var(--red2)':t.priority==='medium'?'var(--yellow2)':'var(--green2)', fontWeight:600 }}>{t.priority}</td>
                    <td style={{ fontSize:13 }}>{t.dueDate}</td>
                    <td><span className={`badge ${STATUS_COLORS[t.status]||'badge-pending'}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
