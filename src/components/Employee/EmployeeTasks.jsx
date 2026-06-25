import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';

const STATUS_META = {
  pending:      { label:'Pending',     badge:'badge-pending',     icon:'⏳', next:['in-progress'] },
  'in-progress':{ label:'In Progress', badge:'badge-in-progress', icon:'⚡', next:['completed','failed'] },
  completed:    { label:'Completed',   badge:'badge-completed',   icon:'✅', next:[] },
  failed:       { label:'Failed',      badge:'badge-failed',      icon:'❌', next:[] },
};

const PRIO = { high:'var(--red2)', medium:'var(--yellow2)', low:'var(--green2)' };

export default function EmployeeTasks() {
  const { currentUser, updateTaskStatus } = useAuth();
  const [filter, setFilter]   = useState('all');
  const [search, setSearch]   = useState('');
  const [expanded, setExp]    = useState(null);

  const tasks = currentUser?.tasks || [];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tasks.filter(t =>
      (filter === 'all' || t.status === filter) &&
      (!q || t.title.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q))
    );
  }, [tasks, filter, search]);

  const counts = useMemo(() => ({
    all: tasks.length,
    pending:       tasks.filter(t => t.status==='pending').length,
    'in-progress': tasks.filter(t => t.status==='in-progress').length,
    completed:     tasks.filter(t => t.status==='completed').length,
    failed:        tasks.filter(t => t.status==='failed').length,
  }), [tasks]);

  const filterBtns = [
    { key:'all',          label:'All' },
    { key:'pending',      label:'Pending' },
    { key:'in-progress',  label:'In Progress' },
    { key:'completed',    label:'Completed' },
    { key:'failed',       label:'Failed' },
  ];

  return (
    <div className="page fade-in">
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:2 }}>My Tasks</h1>
        <p style={{ color:'var(--text3)', fontSize:13 }}>{tasks.length} tasks assigned to you</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
        {filterBtns.map(b => (
          <button key={b.key}
            onClick={() => setFilter(b.key)}
            style={{
              padding:'7px 16px', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', transition:'all .2s',
              background: filter===b.key ? 'var(--accent)' : 'var(--card)',
              border: `1px solid ${filter===b.key ? 'var(--accent)' : 'var(--border)'}`,
              color: filter===b.key ? '#fff' : 'var(--text2)',
            }}>
            {b.label} <span style={{ opacity:.7 }}>({counts[b.key]})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="search-wrap" style={{ marginBottom:18, maxWidth:340 }}>
        <span className="search-icon">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks…"/>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:60 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
          <p style={{ color:'var(--text3)' }}>No tasks found.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {filtered.map(task => {
            const meta = STATUS_META[task.status] || STATUS_META.pending;
            const isOpen = expanded === task.id;
            return (
              <div key={task.id} className="card" style={{ padding:0, overflow:'hidden' }}>
                {/* Task header */}
                <div
                  style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:14, cursor:'pointer' }}
                  onClick={() => setExp(isOpen ? null : task.id)}
                >
                  <span style={{ fontSize:22, flexShrink:0 }}>{meta.icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:4 }}>
                      <span style={{ color:'var(--text)', fontWeight:700, fontSize:15 }}>{task.title}</span>
                      <span className={`badge ${meta.badge}`} style={{ fontSize:11 }}>{meta.label}</span>
                      <span style={{ fontSize:11, color: PRIO[task.priority], fontWeight:600 }}>● {task.priority}</span>
                    </div>
                    <div style={{ display:'flex', gap:12 }}>
                      <span style={{ color:'var(--text3)', fontSize:12 }}>📁 {task.category}</span>
                      <span style={{ color:'var(--text3)', fontSize:12 }}>📅 Due {task.dueDate}</span>
                      <span style={{ color:'var(--text3)', fontSize:12 }}>🗓 Assigned {task.assignedAt}</span>
                    </div>
                  </div>
                  <span style={{ color:'var(--text3)', fontSize:18 }}>{isOpen ? '▲' : '▼'}</span>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding:'0 20px 20px', borderTop:'1px solid var(--border)' }}>
                    <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, padding:'14px 0 18px' }}>{task.description}</p>
                    {meta.next.length > 0 && (
                      <div style={{ display:'flex', gap:8 }}>
                        <span style={{ color:'var(--text3)', fontSize:13, alignSelf:'center' }}>Update status:</span>
                        {meta.next.map(ns => (
                          <button
                            key={ns}
                            className={`btn btn-sm ${ns==='completed'?'btn-success':ns==='failed'?'btn-danger':'btn-primary'}`}
                            onClick={() => updateTaskStatus(task.id, ns)}
                          >
                            {ns === 'in-progress' ? '⚡ Start Task' : ns === 'completed' ? '✅ Mark Complete' : '❌ Mark Failed'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
