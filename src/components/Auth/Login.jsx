import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password,   setPassword]   = useState('');
  const [error,      setError]      = useState('');
  const [loading,    setLoading]    = useState(false);
  const [showPw,     setShowPw]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!identifier.trim()) { setError('Please enter your Employee ID or email.'); return; }
    if (!password)          { setError('Please enter your password.');             return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 350));
    const result = login(identifier, password);
    setLoading(false);
    if (!result.ok) { setError(result.error); setPassword(''); }
  };

  const s = {
    page:    { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', padding:24 },
    wrap:    { width:'100%', maxWidth:420 },
    logoBox: { textAlign:'center', marginBottom:36 },
    logoIco: { display:'inline-flex', alignItems:'center', justifyContent:'center', width:54, height:54, borderRadius:16, background:'linear-gradient(135deg,#6366f1,#818cf8)', marginBottom:14 },
    h1:      { color:'var(--text)', fontSize:24, fontWeight:800, marginBottom:4 },
    sub:     { color:'var(--text3)', fontSize:14 },
    card:    { background:'var(--card)', border:'1px solid var(--border)', borderRadius:18, padding:36 },
    h2:      { color:'var(--text)', fontSize:17, fontWeight:700, marginBottom:22 },
    err:     { display:'flex', alignItems:'center', gap:8, background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.25)', borderRadius:8, padding:'11px 14px', marginBottom:18, color:'#fca5a5', fontSize:13 },
    label:   { display:'block', color:'var(--text2)', fontSize:13, fontWeight:500, marginBottom:7 },
    inputW:  { position:'relative', marginBottom:16 },
    eye:     { position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--text3)', cursor:'pointer', padding:2, fontSize:16 },
    btn:     { width:'100%', background:'linear-gradient(135deg,#6366f1,#818cf8)', border:'none', borderRadius:9, padding:'13px', color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', transition:'opacity .2s', marginTop:6 },
    demo:    { marginTop:22, padding:16, background:'var(--bg)', borderRadius:9, border:'1px solid var(--border)' },
    demoT:   { color:'var(--text3)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:10 },
    demoRow: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 },
    demoL:   { color:'var(--text3)', fontSize:12 },
    demoV:   { color:'var(--text2)', fontSize:12, fontFamily:'monospace', background:'rgba(255,255,255,.05)', padding:'2px 8px', borderRadius:4 },
    quickBtn:{ background:'rgba(99,102,241,.1)', border:'1px solid rgba(99,102,241,.25)', borderRadius:6, padding:'3px 10px', color:'var(--accent2)', fontSize:12, fontWeight:600, cursor:'pointer', transition:'background .2s' },
  };

  const quickLogin = (id, pw) => { setIdentifier(id); setPassword(pw); };

  return (
    <div style={s.page}>
      <div style={s.wrap} className="fade-up">
        <div style={s.logoBox}>
          <div style={s.logoIco}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h1 style={s.h1}>WorkForce EMS</h1>
          <p style={s.sub}>Employee Management System</p>
        </div>

        <div style={s.card}>
          <h2 style={s.h2}>Sign in to your account</h2>

          {error && (
            <div style={s.err}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <label style={s.label}>Employee ID, Email, or EMP Number</label>
              <input
                value={identifier} onChange={e => setIdentifier(e.target.value)}
                placeholder="employee10  /  employee10@gmail.com  /  EMP010"
                autoComplete="username" autoFocus
              />
            </div>

            <div style={{ ...s.inputW, marginTop:14 }}>
              <label style={s.label}>Password</label>
              <div style={{ position:'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingRight:42 }}
                  autoComplete="current-password"
                />
                <button type="button" style={s.eye} onClick={() => setShowPw(p => !p)}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ ...s.btn, opacity: loading ? .75 : 1 }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={s.demo}>
            <p style={s.demoT}>Quick Login — Demo Accounts</p>
            {[
              { label:'Admin',      id:'admin@me.com',      pw:'123', color:'#818cf8' },
              { label:'Employee 1', id:'employee1',          pw:'123', color:'#34d399' },
              { label:'Employee 10',id:'employee10',         pw:'123', color:'#34d399' },
              { label:'By EMP#',   id:'EMP005',             pw:'123', color:'#fbbf24' },
            ].map(acc => (
              <div key={acc.id} style={s.demoRow}>
                <span style={{ color: acc.color, fontSize:12, fontWeight:600 }}>{acc.label}</span>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <code style={{ color:'var(--text2)', fontSize:11, background:'rgba(255,255,255,.05)', padding:'2px 7px', borderRadius:4 }}>{acc.id}</code>
                  <button style={s.quickBtn} onClick={() => quickLogin(acc.id, acc.pw)}>Fill</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
