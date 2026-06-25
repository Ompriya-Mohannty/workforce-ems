// ─── Storage Keys ───────────────────────────────────────────────
export const KEYS = {
  EMPLOYEES: "ems_employees",
  ADMIN: "ems_admin",
  SESSION: "ems_session",
  ATTENDANCE: "ems_attendance",
};

// ─── Seed Data ──────────────────────────────────────────────────
const SEED_EMPLOYEES = [
  {
    id: "employee1",
    employeeId: "EMP001",
    firstName: "Aarav",
    lastName: "Sharma",
    email: "employee1@gmail.com",
    password: "123",
    phone: "+91-9876543201",
    department: "Engineering",
    role: "Frontend Developer",
    avatar: "AA",
    joinDate: "2024-01-15",
    status: "active",
    salary: 75000,
    tasks: [
      {
        id: "t1a",
        title: "Design Login Page",
        description: "Create responsive login UI with modern design patterns.",
        category: "Design",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-25",
        assignedAt: "2026-06-20",
      },
      {
        id: "t1b",
        title: "API Integration",
        description: "Connect frontend with backend REST API endpoints.",
        category: "Backend",
        status: "pending",
        priority: "medium",
        dueDate: "2026-06-28",
        assignedAt: "2026-06-21",
      },
      {
        id: "t1c",
        title: "Fix Navbar Bug",
        description: "Resolve navbar alignment issue on mobile viewports.",
        category: "Development",
        status: "completed",
        priority: "low",
        dueDate: "2026-06-20",
        assignedAt: "2026-06-18",
      },
      {
        id: "t1d",
        title: "Dark Mode Toggle",
        description: "Implement dark/light theme switcher.",
        category: "UI",
        status: "in-progress",
        priority: "medium",
        dueDate: "2026-06-27",
        assignedAt: "2026-06-22",
      },
      {
        id: "t1e",
        title: "Unit Tests Setup",
        description: "Setup Jest and write unit tests for utility functions.",
        category: "Testing",
        status: "completed",
        priority: "low",
        dueDate: "2026-06-18",
        assignedAt: "2026-06-15",
      },
    ],
  },
  {
    id: "employee2",
    employeeId: "EMP002",
    firstName: "Vivaan",
    lastName: "Mehta",
    email: "employee2@gmail.com",
    password: "123",
    phone: "+91-9876543202",
    department: "Design",
    role: "UI/UX Designer",
    avatar: "VI",
    joinDate: "2024-02-01",
    status: "active",
    salary: 68000,
    tasks: [
      {
        id: "t2a",
        title: "Dashboard Wireframes",
        description: "Design admin dashboard wireframes in Figma.",
        category: "UI/UX",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-26",
        assignedAt: "2026-06-20",
      },
      {
        id: "t2b",
        title: "Mobile Prototypes",
        description: "Create interactive mobile prototypes for the app.",
        category: "Design",
        status: "pending",
        priority: "medium",
        dueDate: "2026-06-30",
        assignedAt: "2026-06-21",
      },
      {
        id: "t2c",
        title: "Icon Set Design",
        description: "Design a consistent icon set for the EMS application.",
        category: "Design",
        status: "pending",
        priority: "low",
        dueDate: "2026-07-01",
        assignedAt: "2026-06-22",
      },
      {
        id: "t2d",
        title: "Color Palette",
        description: "Define corporate color palette and typography.",
        category: "Branding",
        status: "completed",
        priority: "high",
        dueDate: "2026-06-15",
        assignedAt: "2026-06-10",
      },
      {
        id: "t2e",
        title: "Onboarding Screens",
        description: "Design onboarding flow screens for new employees.",
        category: "UI/UX",
        status: "failed",
        priority: "medium",
        dueDate: "2026-06-10",
        assignedAt: "2026-06-05",
      },
    ],
  },
  {
    id: "employee3",
    employeeId: "EMP003",
    firstName: "Aditya",
    lastName: "Singh",
    email: "employee3@gmail.com",
    password: "123",
    phone: "+91-9876543203",
    department: "Engineering",
    role: "Backend Developer",
    avatar: "AD",
    joinDate: "2024-01-20",
    status: "active",
    salary: 80000,
    tasks: [
      {
        id: "t3a",
        title: "MongoDB Schema Design",
        description: "Design database schemas for employees and tasks.",
        category: "Database",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-27",
        assignedAt: "2026-06-21",
      },
      {
        id: "t3b",
        title: "JWT Auth System",
        description: "Implement JWT-based authentication with refresh tokens.",
        category: "Security",
        status: "pending",
        priority: "high",
        dueDate: "2026-06-29",
        assignedAt: "2026-06-22",
      },
      {
        id: "t3c",
        title: "REST API Endpoints",
        description: "Build CRUD endpoints for employee management.",
        category: "Backend",
        status: "completed",
        priority: "medium",
        dueDate: "2026-06-19",
        assignedAt: "2026-06-15",
      },
      {
        id: "t3d",
        title: "Email Notifications",
        description: "Integrate NodeMailer for task assignment alerts.",
        category: "Integration",
        status: "in-progress",
        priority: "medium",
        dueDate: "2026-06-28",
        assignedAt: "2026-06-22",
      },
      {
        id: "t3e",
        title: "Error Handling",
        description: "Add global error handling and logging middleware.",
        category: "Backend",
        status: "completed",
        priority: "low",
        dueDate: "2026-06-17",
        assignedAt: "2026-06-14",
      },
    ],
  },
  {
    id: "employee4",
    employeeId: "EMP004",
    firstName: "Krishna",
    lastName: "Patel",
    email: "employee4@gmail.com",
    password: "123",
    phone: "+91-9876543204",
    department: "Engineering",
    role: "Full Stack Developer",
    avatar: "KR",
    joinDate: "2023-11-10",
    status: "active",
    salary: 90000,
    tasks: [
      {
        id: "t4a",
        title: "Dark Mode Support",
        description: "Add dark mode support with CSS variables.",
        category: "UI",
        status: "completed",
        priority: "medium",
        dueDate: "2026-06-16",
        assignedAt: "2026-06-12",
      },
      {
        id: "t4b",
        title: "Global Search Feature",
        description: "Implement global search with debounce and filters.",
        category: "Frontend",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-27",
        assignedAt: "2026-06-21",
      },
      {
        id: "t4c",
        title: "PDF Report Export",
        description: "Build PDF export functionality for task reports.",
        category: "Feature",
        status: "pending",
        priority: "medium",
        dueDate: "2026-06-30",
        assignedAt: "2026-06-22",
      },
      {
        id: "t4d",
        title: "Role-based Access",
        description: "Implement RBAC for admin/employee differentiation.",
        category: "Security",
        status: "pending",
        priority: "high",
        dueDate: "2026-07-02",
        assignedAt: "2026-06-23",
      },
      {
        id: "t4e",
        title: "CI/CD Pipeline",
        description: "Setup GitHub Actions for automated deployments.",
        category: "DevOps",
        status: "failed",
        priority: "low",
        dueDate: "2026-06-12",
        assignedAt: "2026-06-08",
      },
    ],
  },
  {
    id: "employee5",
    employeeId: "EMP005",
    firstName: "Arjun",
    lastName: "Nair",
    email: "employee5@gmail.com",
    password: "123",
    phone: "+91-9876543205",
    department: "Analytics",
    role: "Data Analyst",
    avatar: "AR",
    joinDate: "2024-03-05",
    status: "active",
    salary: 72000,
    tasks: [
      {
        id: "t5a",
        title: "Analytics Charts",
        description: "Integrate Recharts for real-time analytics graphs.",
        category: "Analytics",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-26",
        assignedAt: "2026-06-20",
      },
      {
        id: "t5b",
        title: "CSV Export Feature",
        description: "Add CSV export for employee task summary reports.",
        category: "Feature",
        status: "pending",
        priority: "medium",
        dueDate: "2026-06-29",
        assignedAt: "2026-06-22",
      },
      {
        id: "t5c",
        title: "Performance Audit",
        description: "Audit and optimize Core Web Vitals.",
        category: "Performance",
        status: "completed",
        priority: "high",
        dueDate: "2026-06-18",
        assignedAt: "2026-06-14",
      },
      {
        id: "t5d",
        title: "Notification System",
        description: "Build in-app notification system for task updates.",
        category: "Backend",
        status: "in-progress",
        priority: "medium",
        dueDate: "2026-06-28",
        assignedAt: "2026-06-21",
      },
      {
        id: "t5e",
        title: "Image Optimization",
        description: "Compress and lazy-load all website images.",
        category: "Performance",
        status: "completed",
        priority: "low",
        dueDate: "2026-06-14",
        assignedAt: "2026-06-10",
      },
    ],
  },
  {
    id: "employee6",
    employeeId: "EMP006",
    firstName: "Priya",
    lastName: "Reddy",
    email: "employee6@gmail.com",
    password: "123",
    phone: "+91-9876543206",
    department: "QA",
    role: "QA Engineer",
    avatar: "PR",
    joinDate: "2024-02-15",
    status: "active",
    salary: 65000,
    tasks: [
      {
        id: "t6a",
        title: "Regression Testing",
        description: "Run full regression test suite on latest build.",
        category: "Testing",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-27",
        assignedAt: "2026-06-21",
      },
      {
        id: "t6b",
        title: "Automation Scripts",
        description: "Write Cypress E2E automation scripts.",
        category: "Automation",
        status: "pending",
        priority: "medium",
        dueDate: "2026-07-01",
        assignedAt: "2026-06-22",
      },
      {
        id: "t6c",
        title: "API Testing",
        description: "Test all REST endpoints using Postman.",
        category: "Testing",
        status: "pending",
        priority: "medium",
        dueDate: "2026-06-30",
        assignedAt: "2026-06-22",
      },
      {
        id: "t6d",
        title: "Bug Report Dashboard",
        description: "Create bug tracking spreadsheet for dev team.",
        category: "Documentation",
        status: "completed",
        priority: "high",
        dueDate: "2026-06-17",
        assignedAt: "2026-06-13",
      },
      {
        id: "t6e",
        title: "Load Testing",
        description: "Load test using k6 to simulate 1000 concurrent users.",
        category: "Testing",
        status: "failed",
        priority: "medium",
        dueDate: "2026-06-11",
        assignedAt: "2026-06-07",
      },
      {
        id: "t6f",
        title: "Cross-browser Testing",
        description: "Verify compatibility across Chrome, Firefox, Safari.",
        category: "Testing",
        status: "completed",
        priority: "low",
        dueDate: "2026-06-15",
        assignedAt: "2026-06-11",
      },
    ],
  },
  {
    id: "employee7",
    employeeId: "EMP007",
    firstName: "Sneha",
    lastName: "Kumar",
    email: "employee7@gmail.com",
    password: "123",
    phone: "+91-9876543207",
    department: "Infrastructure",
    role: "DevOps Engineer",
    avatar: "SN",
    joinDate: "2023-12-01",
    status: "active",
    salary: 85000,
    tasks: [
      {
        id: "t7a",
        title: "Docker Containerization",
        description: "Dockerize the EMS app with multi-stage builds.",
        category: "DevOps",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-26",
        assignedAt: "2026-06-20",
      },
      {
        id: "t7b",
        title: "Kubernetes Deployment",
        description:
          "Deploy on Kubernetes with auto-scaling and health checks.",
        category: "DevOps",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-28",
        assignedAt: "2026-06-21",
      },
      {
        id: "t7c",
        title: "Monitoring Setup",
        description: "Setup Prometheus and Grafana for monitoring.",
        category: "Monitoring",
        status: "pending",
        priority: "medium",
        dueDate: "2026-07-02",
        assignedAt: "2026-06-23",
      },
      {
        id: "t7d",
        title: "SSL Certificate Setup",
        description: "Configure SSL/TLS using Let's Encrypt.",
        category: "Security",
        status: "completed",
        priority: "high",
        dueDate: "2026-06-16",
        assignedAt: "2026-06-12",
      },
      {
        id: "t7e",
        title: "DB Backup Automation",
        description: "Automate nightly MongoDB backups to AWS S3.",
        category: "Database",
        status: "failed",
        priority: "medium",
        dueDate: "2026-06-13",
        assignedAt: "2026-06-09",
      },
    ],
  },
  {
    id: "employee8",
    employeeId: "EMP008",
    firstName: "Rahul",
    lastName: "Verma",
    email: "employee8@gmail.com",
    password: "123",
    phone: "+91-9876543208",
    department: "Mobile",
    role: "Mobile Developer",
    avatar: "RA",
    joinDate: "2024-04-01",
    status: "active",
    salary: 78000,
    tasks: [
      {
        id: "t8a",
        title: "React Native Setup",
        description: "Bootstrap React Native app with navigation.",
        category: "Mobile",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-27",
        assignedAt: "2026-06-21",
      },
      {
        id: "t8b",
        title: "Push Notifications",
        description: "Integrate Firebase Cloud Messaging for push alerts.",
        category: "Mobile",
        status: "pending",
        priority: "medium",
        dueDate: "2026-07-01",
        assignedAt: "2026-06-22",
      },
      {
        id: "t8c",
        title: "Offline Mode",
        description: "Implement offline sync using AsyncStorage.",
        category: "Mobile",
        status: "pending",
        priority: "medium",
        dueDate: "2026-07-03",
        assignedAt: "2026-06-23",
      },
      {
        id: "t8d",
        title: "App Splash Screen",
        description: "Design and implement branded splash screen.",
        category: "Design",
        status: "completed",
        priority: "low",
        dueDate: "2026-06-18",
        assignedAt: "2026-06-14",
      },
      {
        id: "t8e",
        title: "Biometric Login",
        description: "Add Face ID / fingerprint authentication.",
        category: "Security",
        status: "completed",
        priority: "high",
        dueDate: "2026-06-15",
        assignedAt: "2026-06-11",
      },
    ],
  },
  {
    id: "employee9",
    employeeId: "EMP009",
    firstName: "Ananya",
    lastName: "Joshi",
    email: "employee9@gmail.com",
    password: "123",
    phone: "+91-9876543209",
    department: "HR",
    role: "HR Manager",
    avatar: "AN",
    joinDate: "2023-10-15",
    status: "active",
    salary: 70000,
    tasks: [
      {
        id: "t9a",
        title: "Onboarding Process Update",
        description: "Update employee onboarding checklist for 2026.",
        category: "HR",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-27",
        assignedAt: "2026-06-21",
      },
      {
        id: "t9b",
        title: "Performance Review Setup",
        description: "Design mid-year performance review criteria.",
        category: "HR",
        status: "pending",
        priority: "high",
        dueDate: "2026-06-30",
        assignedAt: "2026-06-22",
      },
      {
        id: "t9c",
        title: "Leave Policy Document",
        description: "Update company leave policy and distribute.",
        category: "HR",
        status: "completed",
        priority: "medium",
        dueDate: "2026-06-19",
        assignedAt: "2026-06-15",
      },
      {
        id: "t9d",
        title: "Team Building Event",
        description: "Organize quarterly team building activity.",
        category: "Events",
        status: "completed",
        priority: "low",
        dueDate: "2026-06-14",
        assignedAt: "2026-06-10",
      },
      {
        id: "t9e",
        title: "Salary Revision Report",
        description: "Prepare annual salary revision for management.",
        category: "Payroll",
        status: "completed",
        priority: "high",
        dueDate: "2026-06-10",
        assignedAt: "2026-06-05",
      },
    ],
  },
  {
    id: "employee10",
    employeeId: "EMP010",
    firstName: "Rohan",
    lastName: "Gupta",
    email: "employee10@gmail.com",
    password: "123",
    phone: "+91-9876543210",
    department: "Product",
    role: "Product Manager",
    avatar: "RO",
    joinDate: "2023-09-01",
    status: "active",
    salary: 95000,
    tasks: [
      {
        id: "t10a",
        title: "Q3 Product Roadmap",
        description: "Finalize Q3 product roadmap with stakeholder sign-off.",
        category: "Planning",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-26",
        assignedAt: "2026-06-20",
      },
      {
        id: "t10b",
        title: "Sprint Planning",
        description: "Plan and facilitate the next two-week sprint.",
        category: "Agile",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-06-28",
        assignedAt: "2026-06-21",
      },
      {
        id: "t10c",
        title: "Competitor Analysis",
        description: "Analyze 5 competing EMS products and present findings.",
        category: "Research",
        status: "pending",
        priority: "medium",
        dueDate: "2026-07-01",
        assignedAt: "2026-06-22",
      },
      {
        id: "t10d",
        title: "User Story Docs",
        description: "Write user stories and acceptance criteria for features.",
        category: "Documentation",
        status: "completed",
        priority: "medium",
        dueDate: "2026-06-17",
        assignedAt: "2026-06-13",
      },
      {
        id: "t10e",
        title: "Investor Demo Deck",
        description: "Prepare product demo for Series A investor meeting.",
        category: "Business",
        status: "failed",
        priority: "high",
        dueDate: "2026-06-09",
        assignedAt: "2026-06-05",
      },
    ],
  },
];

const SEED_ADMIN = {
  id: "admin1",
  email: "admin@me.com",
  password: "123",
  name: "Admin",
};

// ─── Init ────────────────────────────────────────────────────────
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.EMPLOYEES)) {
    localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(SEED_EMPLOYEES));
  }
  if (!localStorage.getItem(KEYS.ADMIN)) {
    localStorage.setItem(KEYS.ADMIN, JSON.stringify(SEED_ADMIN));
  }
};

// ─── Getters ─────────────────────────────────────────────────────
export const getEmployees = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.EMPLOYEES)) || SEED_EMPLOYEES;
  } catch {
    return SEED_EMPLOYEES;
  }
};

export const getAdmin = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.ADMIN)) || SEED_ADMIN;
  } catch {
    return SEED_ADMIN;
  }
};

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.SESSION));
  } catch {
    return null;
  }
};

export const getAttendance = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.ATTENDANCE)) || {};
  } catch {
    return {};
  }
};

// ─── Setters ─────────────────────────────────────────────────────
export const saveEmployees = (employees) =>
  localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(employees));

export const saveSession = (user) =>
  localStorage.setItem(KEYS.SESSION, JSON.stringify(user));

export const clearSession = () => localStorage.removeItem(KEYS.SESSION);

export const saveAttendance = (data) =>
  localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(data));

// ─── Auth ────────────────────────────────────────────────────────
// Supports login by: employee ID (employee10), email, or employeeId (EMP010)
export const findEmployee = (identifier, password) => {
  const employees = getEmployees();
  const id = identifier.trim().toLowerCase();
  return (
    employees.find(
      (e) =>
        (e.id?.toLowerCase() === id ||
          e.email?.toLowerCase() === id ||
          e.employeeId?.toLowerCase() === id) &&
        e.password === password,
    ) || null
  );
};

// ─── Helpers ─────────────────────────────────────────────────────
export const updateEmployee = (updatedEmp) => {
  const employees = getEmployees();
  const updated = employees.map((e) =>
    e.id === updatedEmp.id ? updatedEmp : e,
  );
  saveEmployees(updated);
  return updated;
};

export const getTaskStats = (employee) => {
  const tasks = employee?.tasks || [];
  return {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    failed: tasks.filter((t) => t.status === "failed").length,
  };
};

export const todayKey = () => new Date().toISOString().split("T")[0];
