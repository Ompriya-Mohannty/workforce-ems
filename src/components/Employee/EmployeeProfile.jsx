import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function EmployeeProfile() {
  const { currentUser, updateEmp, toast } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    firstName: currentUser.firstName || '',
    lastName:  currentUser.lastName  || '',
    phone:     currentUser.phone     || '',
    role:      currentUser.role      || '',
    department:currentUser.department|| '',
  });

  const save = () => {
    updateEmp({ ...currentUser, ...form });
    toast('Profile updated successfully');
    setEdit(false);
  };

  const avatarColors = ['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6'];
  const color = avatarColors[parseInt(currentUser.id?.replace(/\D/g,'') || 0) % avatarColors.length];

  const Field = ({ label, value, field }) => (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:'block', color:'var(--text3)', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>{label}</label>
      {edit ? (
        <input value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} />
      ) : (
        <p style={{ color:'var(--text)', fontSize:15, fontWeight:500 }}>{value || '—'}</p>
      )}
    </div>
  );

  return (
    <div className="page fade-in">
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:2 }}>My Profile</h1>
        <p style={{ color:'var(--text3)', fontSize:13 }}>View and update your personal information</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:20, alignItems:'start' }}>
        {/* Avatar card */}
        <div className="card" style={{ textAlign:'center' }}>
          <div className="avatar" style={{ width:80, height:80, fontSize:28, background:`linear-gradient(135deg,${color},${color}aa)`, margin:'0 auto 16px' }}>
            {currentUser.avatar}
          </div>
          <h2 style={{ color:'var(--text)', fontWeight:700, fontSize:18, marginBottom:4 }}>
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <p style={{ color:'var(--text3)', fontSize:13, marginBottom:12 }}>{currentUser.role}</p>
          <span className="badge badge-active" style={{ fontSize:12 }}>{currentUser.department}</span>

          <div style={{ marginTop:20, padding:'16px 0 0', borderTop:'1px solid var(--border)' }}>
            {[['🪪', currentUser.employeeId],['📧', currentUser.email],['📅', `Joined ${currentUser.joinDate}`]].map(([ico,val]) => (
              <div key={val} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:10, justifyContent:'center' }}>
                <span>{ico}</span>
                <span style={{ color:'var(--text2)', fontSize:12 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="card">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
            <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:16 }}>Personal Information</h3>
            {!edit ? (
              <button className="btn btn-ghost btn-sm" onClick={() => setEdit(true)}>✏️ Edit</button>
            ) : (
              <div style={{ display:'flex', gap:8 }}>
                <button className="btn btn-primary btn-sm" onClick={save}>Save</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEdit(false)}>Cancel</button>
              </div>
            )}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 28px' }}>
            <Field label="First Name"  value={currentUser.firstName}  field="firstName" />
            <Field label="Last Name"   value={currentUser.lastName}   field="lastName" />
            <Field label="Phone"       value={currentUser.phone}      field="phone" />
            <Field label="Department"  value={currentUser.department} field="department" />
            <Field label="Role / Title" value={currentUser.role}      field="role" />
          </div>

          <div style={{ marginTop:8, padding:'16px 0 0', borderTop:'1px solid var(--border)' }}>
            <p style={{ color:'var(--text3)', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:10 }}>Read-only</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 28px' }}>
              {[['Email', currentUser.email],['Employee ID', currentUser.employeeId],['Joined', currentUser.joinDate],['Status', currentUser.status]].map(([l,v]) => (
                <div key={l} style={{ marginBottom:16 }}>
                  <p style={{ color:'var(--text3)', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4 }}>{l}</p>
                  <p style={{ color:'var(--text2)', fontSize:14 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
