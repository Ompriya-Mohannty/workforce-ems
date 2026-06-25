import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getEmployees,
  getAdmin,
  getSession,
  saveSession,
  clearSession,
  findEmployee,
  saveEmployees,
  getAttendance,
  saveAttendance,
  updateEmployee,
  todayKey,
} from "../utils/storage";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // { role:'admin'|'employee', ...data }
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  // ── Boot ──────────────────────────────────────────────────────
  useEffect(() => {
    setEmployees(getEmployees());
    setAttendanceMap(getAttendance());
    const session = getSession();
    if (session) setCurrentUser(session);
    setLoading(false);
  }, []);

  // ── Toast ─────────────────────────────────────────────────────
  const toast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);

  // ── Login ─────────────────────────────────────────────────────
  const login = (identifier, password) => {
    // Admin check
    const admin = getAdmin();
    if (
      (identifier.trim().toLowerCase() === admin.email.toLowerCase() ||
        identifier.trim().toLowerCase() === "admin") &&
      password === admin.password
    ) {
      const user = { role: "admin", ...admin };
      setCurrentUser(user);
      saveSession(user);
      return { ok: true };
    }

    // Employee check — by id, email, or employeeId
    const emp = findEmployee(identifier, password);
    if (emp) {
      const user = { role: "employee", ...emp };
      setCurrentUser(user);
      saveSession(user);
      return { ok: true };
    }

    return {
      ok: false,
      error: "Invalid credentials. Try your Employee ID, email, or EMP number.",
    };
  };

  // ── Logout ────────────────────────────────────────────────────
  const logout = () => {
    clearSession();
    setCurrentUser(null);
  };

  // ── Refresh employee data from storage ────────────────────────
  const refreshEmployees = () => {
    const fresh = getEmployees();
    setEmployees(fresh);
    // If logged-in user is an employee, sync their data too
    if (currentUser?.role === "employee") {
      const me = fresh.find((e) => e.id === currentUser.id);
      if (me) {
        const updated = { ...currentUser, ...me };
        setCurrentUser(updated);
        saveSession(updated);
      }
    }
    return fresh;
  };

  // ── Update a single employee ──────────────────────────────────
  const updateEmp = (updatedEmp) => {
    const newList = updateEmployee(updatedEmp);
    setEmployees(newList);
    if (currentUser?.role === "employee" && currentUser.id === updatedEmp.id) {
      const user = { ...currentUser, ...updatedEmp };
      setCurrentUser(user);
      saveSession(user);
    }
    return newList;
  };

  // ── Assign task (admin) ───────────────────────────────────────
  const assignTask = (employeeId, task) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return false;
    const newTask = {
      id: `t${Date.now()}`,
      ...task,
      status: "pending",
      assignedAt: new Date().toISOString().split("T")[0],
    };
    updateEmp({ ...emp, tasks: [...(emp.tasks || []), newTask] });
    toast(`Task "${task.title}" assigned to ${emp.firstName}`);
    return true;
  };

  // ── Update task status (employee) ─────────────────────────────
  const updateTaskStatus = (taskId, newStatus) => {
    if (!currentUser || currentUser.role !== "employee") return;
    const emp = employees.find((e) => e.id === currentUser.id);
    if (!emp) return;
    const updatedTasks = emp.tasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus } : t,
    );
    updateEmp({ ...emp, tasks: updatedTasks });
    toast(`Task marked as ${newStatus}`);
  };

  // ── Attendance ────────────────────────────────────────────────
  const checkIn = () => {
    if (!currentUser?.id) return;
    const today = todayKey();
    const key = `${currentUser.id}_${today}`;
    const rec = attendance[key];
    if (rec?.checkIn) {
      toast("Already checked in today", "warning");
      return;
    }
    const now = new Date().toISOString();
    const updated = { ...attendance, [key]: { checkIn: now, checkOut: null } };
    setAttendanceMap(updated);
    saveAttendance(updated);
    toast("Check-in recorded ✓");
  };

  const checkOut = () => {
    if (!currentUser?.id) return;
    const today = todayKey();
    const key = `${currentUser.id}_${today}`;
    const rec = attendance[key];
    if (!rec?.checkIn) {
      toast("Please check in first", "warning");
      return;
    }
    if (rec?.checkOut) {
      toast("Already checked out today", "warning");
      return;
    }
    const now = new Date().toISOString();
    const updated = { ...attendance, [key]: { ...rec, checkOut: now } };
    setAttendanceMap(updated);
    saveAttendance(updated);
    toast("Check-out recorded ✓");
  };

  const getTodayAttendance = (empId) => {
    const key = `${empId || currentUser?.id}_${todayKey()}`;
    return attendance[key] || null;
  };

  const calcHours = (rec) => {
    if (!rec?.checkIn) return null;
    const end = rec.checkOut ? new Date(rec.checkOut) : new Date();
    const mins = Math.floor((end - new Date(rec.checkIn)) / 60000);
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        employees,
        loading,
        toasts,
        login,
        logout,
        refreshEmployees,
        updateEmp,
        assignTask,
        updateTaskStatus,
        checkIn,
        checkOut,
        getTodayAttendance,
        calcHours,
        toast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
