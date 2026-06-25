import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Logo = () => (
  <div style={{ display:'flex', alignItems:'center', gap:10, padding:'22px 18px 18px' }}>
    <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#818cf8)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    </div>
    <div>
      <div style={{ color:'#f1f5f9', fontWeight:700, fontSize:15, lineHeight:1.2 }}>WorkForce</div>
      <div style={{ color:'#64748b', fontSize:11 }}>EMS Platform</div>
    </div>
  </div>
);

const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p}/>) : <path d={d}/>}
  </svg>
);

const ADMIN_NAV = [
  { id:'dashboard', label:'Dashboard',  icon:['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10'] },
  { id:'employees', label:'Employees',  icon:['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2','M23 21v-2a4 4 0 0 0-3-3.87','M16 3.13a4 4 0 0 1 0 7.75'], extra:'M9 7m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0' },
  { id:'tasks',     label:'Tasks',      icon:['M9 11l3 3L22 4','M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'] },
  { id:'attendance',label:'Attendance', icon:['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2','M23 21v-2a4 4 0 0 0-3-3.87','M16 3.13a4 4 0 0 1 0 7.75'] },
];

const EMP_NAV = [
  { id:'dashboard',  label:'Dashboard',  icon:['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10'] },
  { id:'tasks',      label:'My Tasks',   icon:['M9 11l3 3L22 4','M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'] },
  { id:'attendance', label:'Attendance', icon:['M12 2v4','M12 18v4','M4.93 4.93l2.83 2.83','M16.24 16.24l2.83 2.83','M2 12h4','M18 12h4'] },
  { id:'profile',    label:'Profile',    icon:['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2','M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8'] },
];

export default function Sidebar({ page, setPage }) {
  const { currentUser, logout } = useAuth();
  const nav = currentUser?.role === 'admin' ? ADMIN_NAV : EMP_NAV;
  const name = currentUser?.role === 'admin' ? 'Admin' : currentUser?.firstName || 'Employee';
  const role = currentUser?.role === 'admin' ? 'Administrator' : currentUser?.role || 'Employee';
  const initials = currentUser?.avatar || name.slice(0,2).toUpperCase();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <aside className="sidebar">
      <Logo />
      <div style={{ height:1, background:'var(--border)', margin:'0 16px 12px' }}/>

      <nav style={{ flex:1, padding:'0 10px', display:'flex', flexDirection:'column', gap:3 }}>
        <div style={{ color:'var(--text3)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'.07em', padding:'6px 6px 8px' }}>Menu</div>
        {nav.map(item => (
          <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => setPage(item.id)}>
            <Icon d={item.icon} size={17}/>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User card at bottom */}
      <div style={{ padding:'12px 14px', borderTop:'1px solid var(--border)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <div className="avatar" style={{ width:36, height:36, fontSize:13, background: isAdmin ? 'linear-gradient(135deg,#6366f1,#818cf8)' : 'linear-gradient(135deg,#10b981,#34d399)' }}>
            {initials}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ color:'var(--text)', fontSize:13, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</div>
            <div style={{ color:'var(--text3)', fontSize:11, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{role}</div>
          </div>
        </div>
        <button className="btn btn-danger btn-sm" style={{ width:'100%', justifyContent:'center' }} onClick={logout}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
