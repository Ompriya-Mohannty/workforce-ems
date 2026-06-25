import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Sidebar from './components/Shared/Sidebar';
import Toast from './components/Shared/Toast';

// Admin pages
import AdminDashboard   from './components/Admin/AdminDashboard';
import EmployeeList     from './components/Admin/EmployeeList';
import EmployeeDetail   from './components/Admin/EmployeeDetail';
import TaskManager      from './components/Admin/TaskManager';
import AdminAttendance  from './components/Admin/AdminAttendance';

// Employee pages
import EmployeeDashboard   from './components/Employee/EmployeeDashboard';
import EmployeeTasks       from './components/Employee/EmployeeTasks';
import EmployeeAttendance  from './components/Employee/EmployeeAttendance';
import EmployeeProfile     from './components/Employee/EmployeeProfile';

export default function App() {
  const { currentUser, loading } = useAuth();
  const [page, setPage]           = useState('dashboard');
  const [selectedEmp, setSelectedEmp] = useState(null);

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ width:40, height:40, border:'3px solid var(--border)', borderTopColor:'var(--accent)', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }}/>
          <p style={{ color:'var(--text3)', fontSize:14 }}>Loading…</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return <><Login /><Toast /></>;

  const handleSetPage = (p) => { setPage(p); if (p !== 'employees_detail') setSelectedEmp(null); };

  const renderAdminPage = () => {
    if (page === 'employees_detail' && selectedEmp) {
      return <EmployeeDetail emp={selectedEmp} onBack={() => handleSetPage('employees')} />;
    }
    switch (page) {
      case 'dashboard':  return <AdminDashboard  setPage={handleSetPage} />;
      case 'employees':  return <EmployeeList    setPage={handleSetPage} setSelectedEmp={setSelectedEmp} />;
      case 'tasks':      return <TaskManager />;
      case 'attendance': return <AdminAttendance />;
      default:           return <AdminDashboard  setPage={handleSetPage} />;
    }
  };

  const renderEmployeePage = () => {
    switch (page) {
      case 'dashboard':  return <EmployeeDashboard  setPage={handleSetPage} />;
      case 'tasks':      return <EmployeeTasks />;
      case 'attendance': return <EmployeeAttendance />;
      case 'profile':    return <EmployeeProfile />;
      default:           return <EmployeeDashboard  setPage={handleSetPage} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={handleSetPage} />
      <main className="main-content">
        {currentUser.role === 'admin' ? renderAdminPage() : renderEmployeePage()}
      </main>
      <Toast />
    </div>
  );
}
