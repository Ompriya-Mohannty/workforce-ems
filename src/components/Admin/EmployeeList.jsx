import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTaskStats } from '../../utils/storage';

const avatarColors = ['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f97316','#06b6d4'];

export default function EmployeeList({ setPage, setSelectedEmp }) {
  const { employees } = useAuth();
  const [search, setSearch]   = useState('');
  const [dept,   setDept]     = useState('');
  const [role,   setRole]     = useState('');
  const [view,   setView]     = useState('table'); // 'table' | 'grid'

  const departments = useMemo(() => [...new Set(employees.map(e => e.department))].sort(), [employees]);
  const roles       = useMemo(() => [...new Set(employees.map(e => e.role))].sort(), [employees]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return employees.filter(e =>
      (!q || e.firstName.toLowerCase().includes(q) || e.lastName.toLowerCase().includes(q) ||
             e.email.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) ||
             e.employeeId.toLowerCase().includes(q)) &&
      (!dept || e.department === dept) &&
      (!role || e.role === role)
    );
  }, [employees, search, dept, role]);

  return (
    <div className="page fade-in">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:2 }}>Employees</h1>
          <p style={{ color:'var(--text3)', fontSize:13 }}>{filtered.length} of {employees.length} members</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {['table','grid'].map(v => (
            <button key={v} className={`btn btn-sm ${view===v?'btn-primary':'btn-ghost'}`} onClick={() => setView(v)}>
              {v === 'table' ? '☰ Table' : '⊞ Grid'}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding:'16px 20px', marginBottom:20, display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
        <div className="search-wrap" style={{ flex:'1', minWidth:200 }}>
          <span className="search-icon">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, ID…"/>
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} style={{ width:170 }}>
          <option value="">All Departments</option>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={role} onChange={e => setRole(e.target.value)} style={{ width:190 }}>
          <option value="">All Roles</option>
          {roles.map(r => <option key={r}>{r}</option>)}
        </select>
        {(search||dept||role) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setDept(''); setRole(''); }}>✕ Clear</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:60 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
          <p style={{ color:'var(--text3)' }}>No employees match your search.</p>
        </div>
      ) : view === 'table' ? (
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <table className="table">
            <thead><tr><th>Employee</th><th>ID</th><th>Department</th><th>Role</th><th>Tasks</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map((emp, i) => {
                const ts = getTaskStats(emp);
                const pct = ts.total > 0 ? Math.round((ts.completed/ts.total)*100) : 0;
                return (
                  <tr key={emp.id} style={{ cursor:'pointer' }} onClick={() => { setSelectedEmp(emp); setPage('employees_detail'); }}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div className="avatar" style={{ width:36, height:36, background:avatarColors[i%avatarColors.length] }}>{emp.avatar}</div>
                        <div>
                          <div style={{ color:'var(--text)', fontWeight:600, fontSize:14 }}>{emp.firstName} {emp.lastName}</div>
                          <div style={{ color:'var(--text3)', fontSize:12 }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><code style={{ color:'var(--accent2)', fontSize:12, background:'rgba(99,102,241,.1)', padding:'2px 7px', borderRadius:5 }}>{emp.employeeId}</code></td>
                    <td style={{ fontSize:13 }}>{emp.department}</td>
                    <td style={{ fontSize:13 }}>{emp.role}</td>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div className="progress-track" style={{ width:80 }}>
                          <div className="progress-fill" style={{ width:`${pct}%`, background:'var(--green)' }}/>
                        </div>
                        <span style={{ fontSize:12, color:'var(--text3)' }}>{ts.completed}/{ts.total}</span>
                      </div>
                    </td>
                    <td><span className={`badge badge-${emp.status}`}>{emp.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
          {filtered.map((emp, i) => {
            const ts = getTaskStats(emp);
            const pct = ts.total > 0 ? Math.round((ts.completed/ts.total)*100) : 0;
            return (
              <div key={emp.id} className="card" style={{ cursor:'pointer', transition:'transform .2s,box-shadow .2s' }}
                onClick={() => { setSelectedEmp(emp); setPage('employees_detail'); }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 10px 30px rgba(0,0,0,.3)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
              >
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                  <div className="avatar" style={{ width:44, height:44, fontSize:15, background:avatarColors[i%avatarColors.length] }}>{emp.avatar}</div>
                  <div>
                    <div style={{ color:'var(--text)', fontWeight:700, fontSize:15 }}>{emp.firstName} {emp.lastName}</div>
                    <div style={{ color:'var(--text3)', fontSize:12 }}>{emp.role}</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
                  <span className="badge badge-active" style={{ fontSize:11 }}>{emp.department}</span>
                  <code style={{ color:'var(--accent2)', fontSize:11, background:'rgba(99,102,241,.1)', padding:'2px 7px', borderRadius:5 }}>{emp.employeeId}</code>
                </div>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ color:'var(--text3)', fontSize:12 }}>Task Progress</span>
                    <span style={{ color:'var(--text2)', fontSize:12, fontWeight:600 }}>{pct}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width:`${pct}%`, background:'var(--green)' }}/>
                  </div>
                  <div style={{ display:'flex', gap:10, marginTop:10 }}>
                    {[['✅',ts.completed,'var(--green2)'],['⚡',ts.inProgress,'var(--blue2)'],['⏳',ts.pending,'var(--yellow2)']].map(([ico,n,c]) => (
                      <span key={ico} style={{ fontSize:12, color:c, fontWeight:600 }}>{ico} {n}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
