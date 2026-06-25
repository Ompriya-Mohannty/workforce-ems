import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';

const STATUS_COLORS = { pending:'badge-pending', 'in-progress':'badge-in-progress', completed:'badge-completed', failed:'badge-failed' };
const PRIO_DOT = { high:'dot-high', medium:'dot-medium', low:'dot-low' };

export default function TaskManager() {
  const { employees, assignTask, updateEmp, toast } = useAuth();
  const [tab,      setTab]    = useState('all');  // 'all' | 'assign'
  const [filter,   setFilter] = useState('');
  const [statusF,  setStatusF]= useState('');
  const [form, setForm] = useState({ employeeId:'', title:'', description:'', category:'', priority:'medium', dueDate:'' });
  const [errors, setErrors]   = useState({});
  const [submitting, setSub]  = useState(false);

  const allTasks = useMemo(() => {
    const out = [];
    employees.forEach(emp => {
      (emp.tasks||[]).forEach(t => out.push({ ...t, empName:`${emp.firstName} ${emp.lastName}`, empAvatar:emp.avatar, empId:emp.id, empRole:emp.role }));
    });
    return out.sort((a,b) => new Date(b.assignedAt)-new Date(a.assignedAt));
  }, [employees]);

  const filtered = useMemo(() => {
    const q = filter.toLowerCase();
    return allTasks.filter(t =>
      (!q || t.title.toLowerCase().includes(q) || t.empName.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q)) &&
      (!statusF || t.status === statusF)
    );
  }, [allTasks, filter, statusF]);

  const validate = () => {
    const e = {};
    if (!form.employeeId) e.employeeId = 'Select an employee';
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.category.trim()) e.category = 'Category is required';
    if (!form.dueDate) e.dueDate = 'Due date is required';
    return e;
  };

  const handleAssign = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSub(true);
    await new Promise(r => setTimeout(r, 300));
    const ok = assignTask(form.employeeId, {
      title: form.title, description: form.description,
      category: form.category, priority: form.priority, dueDate: form.dueDate
    });
    setSub(false);
    if (ok) {
      setForm({ employeeId:'', title:'', description:'', category:'', priority:'medium', dueDate:'' });
      setErrors({});
      setTab('all');
    }
  };

  const setField = (k,v) => setForm(p => ({...p,[k]:v}));

  const statusCounts = useMemo(() => ({
    all: allTasks.length,
    pending:    allTasks.filter(t=>t.status==='pending').length,
    'in-progress': allTasks.filter(t=>t.status==='in-progress').length,
    completed:  allTasks.filter(t=>t.status==='completed').length,
    failed:     allTasks.filter(t=>t.status==='failed').length,
  }), [allTasks]);

  return (
    <div className="page fade-in">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:2 }}>Task Management</h1>
          <p style={{ color:'var(--text3)', fontSize:13 }}>{allTasks.length} total tasks across all employees</p>
        </div>
        <button className="btn btn-primary" onClick={() => setTab('assign')}>+ Assign Task</button>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, marginBottom:20, background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, padding:4, width:'fit-content' }}>
        {[['all','All Tasks'],['assign','Assign New']].map(([id,label]) => (
          <button key={id} className={`btn btn-sm ${tab===id?'btn-primary':'btn-ghost'}`} style={{ border:'none' }} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'assign' ? (
        <div className="card" style={{ maxWidth:700 }}>
          <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:17, marginBottom:22 }}>Assign New Task</h3>
          <form onSubmit={handleAssign}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 20px' }}>
              <div className="form-group">
                <label className="form-label">Assign To *</label>
                <select value={form.employeeId} onChange={e => setField('employeeId',e.target.value)} style={{ borderColor: errors.employeeId?'var(--red)':'' }}>
                  <option value="">Select employee…</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.employeeId})</option>)}
                </select>
                {errors.employeeId && <p className="form-error">{errors.employeeId}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Task Title *</label>
                <input value={form.title} onChange={e => setField('title',e.target.value)} placeholder="e.g. Design Landing Page" style={{ borderColor: errors.title?'var(--red)':'' }}/>
                {errors.title && <p className="form-error">{errors.title}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <input value={form.category} onChange={e => setField('category',e.target.value)} placeholder="e.g. Design, Backend, Testing" style={{ borderColor: errors.category?'var(--red)':'' }}/>
                {errors.category && <p className="form-error">{errors.category}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Due Date *</label>
                <input type="date" value={form.dueDate} onChange={e => setField('dueDate',e.target.value)} style={{ borderColor: errors.dueDate?'var(--red)':'' }}/>
                {errors.dueDate && <p className="form-error">{errors.dueDate}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select value={form.priority} onChange={e => setField('priority',e.target.value)}>
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea rows={4} value={form.description} onChange={e => setField('description',e.target.value)} placeholder="Describe what needs to be done…" style={{ borderColor: errors.description?'var(--red)':'' }}/>
              {errors.description && <p className="form-error">{errors.description}</p>}
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting?'Assigning…':'Assign Task'}</button>
              <button type="button" className="btn btn-ghost" onClick={() => setTab('all')}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Summary badges */}
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:18 }}>
            {Object.entries(statusCounts).map(([k,v]) => (
              <button key={k} onClick={() => setStatusF(k==='all'?'':k)}
                style={{ background: statusF===(k==='all'?'':k)?'rgba(99,102,241,.2)':'var(--card)', border:`1px solid ${statusF===(k==='all'?'':k)?'var(--accent)':'var(--border)'}`, borderRadius:8, padding:'6px 14px', color:'var(--text2)', fontSize:13, fontWeight:600, cursor:'pointer', transition:'all .2s' }}>
                {k==='all'?'All':k} <span style={{ color:'var(--accent2)', marginLeft:4 }}>{v}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="search-wrap" style={{ marginBottom:16, maxWidth:360 }}>
            <span className="search-icon">🔍</span>
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search tasks, employees…"/>
          </div>

          {/* Table */}
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <table className="table">
              <thead><tr><th>Task</th><th>Assigned To</th><th>Category</th><th>Priority</th><th>Due Date</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign:'center', padding:40, color:'var(--text3)' }}>No tasks found.</td></tr>
                ) : filtered.map(t => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ color:'var(--text)', fontWeight:600, fontSize:13, marginBottom:2 }}>{t.title}</div>
                      <div style={{ color:'var(--text3)', fontSize:11, maxWidth:240, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.description}</div>
                    </td>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div className="avatar" style={{ width:28, height:28, fontSize:11, background:'var(--accent)' }}>{t.empAvatar}</div>
                        <span style={{ fontSize:13 }}>{t.empName}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-active" style={{ fontSize:11 }}>{t.category}</span></td>
                    <td><span className={PRIO_DOT[t.priority]} style={{ marginRight:6 }}/>{t.priority}</td>
                    <td style={{ fontSize:13 }}>{t.dueDate}</td>
                    <td><span className={`badge ${STATUS_COLORS[t.status]}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
