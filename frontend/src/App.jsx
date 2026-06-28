import { useState, useMemo } from "react";
import "./App.css";
import {
  ClipboardList,
  Plus,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
  ArrowRight,
  LayoutDashboard,
  Home as HomeIcon,
  Folder,
} from "lucide-react";

const COLORS = {
  bg: "#1C1917",
  surface: "#24201E",
  surfaceRaised: "#2C2624",
  border: "#3A332F",
  accent: "#9A5243",
  accentLight: "#C98A6D",
  textHi: "#F5ECE6",
  textLo: "#AE9F94",
};

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
    ::selection { background: ${COLORS.accent}; color: ${COLORS.textHi}; }
    input::placeholder { color: ${COLORS.textLo}; opacity: 0.55; }
  `}</style>
);

const Brand = ({ size = "md" }) => (
  <div className="flex items-center gap-3">
    <div
      style={{ backgroundColor: COLORS.accent }}
      className={`rounded-md flex items-center justify-center shrink-0 ${size === "lg" ? "w-12 h-12" : "w-10 h-10"}`}
    >
      <ClipboardList size={size === "lg" ? 24 : 20} color={COLORS.textHi} />
    </div>
    <div>
      <p
        style={{ color: COLORS.textHi, fontFamily: FONT_DISPLAY }}
        className={`font-bold tracking-tight leading-none ${size === "lg" ? "text-2xl" : "text-lg"}`}
      >
        Ledger
      </p>
      <p style={{ color: COLORS.textLo }} className="text-xs leading-none mt-1">
        Task &amp; Project Management
      </p>
    </div>
  </div>
);

/* ---------------- LOGIN PAGE ---------------- */

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());

    if (!emailValid) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setError("");
    onLogin(email.trim());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#14100f",
        padding: "16px",
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#211b19]/90 p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Brand size="lg" />
        </div>

        {/* Heading */}
        <h1
          style={{
            color: COLORS.textHi,
            fontFamily: FONT_DISPLAY,
          }}
          className="text-3xl font-bold text-center mb-2"
        >
          Admin sign in
        </h1>

        <p
          style={{ color: COLORS.textLo }}
          className="text-sm text-center mb-6"
        >
          Enter your email and password to access the dashboard.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              style={{ color: COLORS.textLo }}
              className="block mb-2 text-xs uppercase tracking-wide"
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              style={{
                backgroundColor: COLORS.surfaceRaised,
                borderColor: COLORS.border,
                color: COLORS.textHi,
              }}
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{ color: COLORS.textLo }}
              className="block mb-2 text-xs uppercase tracking-wide"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  backgroundColor: COLORS.surfaceRaised,
                  borderColor: COLORS.border,
                  color: COLORS.textHi,
                }}
                className="w-full rounded-lg border px-4 py-3 pr-10 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={{ color: COLORS.textLo }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: COLORS.accentLight }} className="text-xs">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            style={{
              backgroundColor: COLORS.accent,
              color: COLORS.textHi,
            }}
            className="w-full rounded-lg py-3 font-semibold hover:opacity-90 flex items-center justify-center gap-2"
          >
            Sign in
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer */}
        <p
          style={{ color: COLORS.textLo }}
          className="text-xs text-center mt-6"
        >
          Demo access — any valid-looking email and a 4+ character password will
          work.
        </p>
      </div>
    </div>
  );
}
/* ---------------- NAV BAR (shared) ---------------- */

function NavBar({ page, setPage, onLogout }) {
  const navItem = (key, label, Icon) => {
    const isActive = page === key;
    return (
      <button
        onClick={() => setPage(key)}
        style={{
          backgroundColor: isActive ? COLORS.accent : "transparent",
          color: isActive ? COLORS.textHi : COLORS.textLo,
        }}
        className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-md transition-colors"
      >
        <Icon size={15} />
        {label}
      </button>
    );
  };

  return (
    <header
      style={{ borderColor: COLORS.border }}
      className="border-b px-6 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-4"
    >
      <Brand />
      <div className="flex items-center gap-2">
        {navItem("home", "Home", HomeIcon)}
        {navItem("dashboard", "Dashboard", LayoutDashboard)}
        <button
          onClick={onLogout}
          style={{ color: COLORS.textLo, borderColor: COLORS.border }}
          className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-md border ml-1 transition-colors"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
}

/* ---------------- HOME PAGE ---------------- */

function HomePage({ adminEmail, tasks, projects, setPage }) {
  const name = adminEmail.split("@")[0];
  const recent = tasks.slice(-5).reverse();

  return (
    <div className="px-6 sm:px-10 py-10">
      <h1
        style={{ color: COLORS.textHi, fontFamily: FONT_DISPLAY }}
        className="text-2xl sm:text-3xl font-bold mb-1"
      >
        Welcome back, {name}
      </h1>
      <p style={{ color: COLORS.textLo }} className="text-sm mb-8">
        Here's the current state of your task ledger.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 max-w-2xl">
        <div
          style={{
            backgroundColor: COLORS.surface,
            borderColor: COLORS.border,
          }}
          className="border rounded-lg p-5"
        >
          <p
            style={{ color: COLORS.textLo }}
            className="text-xs uppercase tracking-wide mb-2"
          >
            Total tasks
          </p>
          <p
            style={{ color: COLORS.accentLight, fontFamily: FONT_MONO }}
            className="text-2xl font-medium"
          >
            {String(tasks.length).padStart(2, "0")}
          </p>
        </div>
        <div
          style={{
            backgroundColor: COLORS.surface,
            borderColor: COLORS.border,
          }}
          className="border rounded-lg p-5"
        >
          <p
            style={{ color: COLORS.textLo }}
            className="text-xs uppercase tracking-wide mb-2"
          >
            Projects
          </p>
          <p
            style={{ color: COLORS.accentLight, fontFamily: FONT_MONO }}
            className="text-2xl font-medium"
          >
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>
        <div
          style={{
            backgroundColor: COLORS.surface,
            borderColor: COLORS.border,
          }}
          className="border rounded-lg p-5 hidden sm:block"
        >
          <p
            style={{ color: COLORS.textLo }}
            className="text-xs uppercase tracking-wide mb-2"
          >
            Role
          </p>
          <p
            style={{ color: COLORS.textHi, fontFamily: FONT_MONO }}
            className="text-2xl font-medium"
          >
            Admin
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-8">
        <div className="flex-1 min-w-0 max-w-xl">
          <h2
            style={{ color: COLORS.textHi, fontFamily: FONT_DISPLAY }}
            className="text-sm font-bold uppercase tracking-wide mb-3"
          >
            Recent tasks
          </h2>
          {recent.length === 0 ? (
            <div
              style={{ borderColor: COLORS.border, color: COLORS.textLo }}
              className="border border-dashed rounded-lg py-10 text-center text-sm"
            >
              No tasks yet. Open the dashboard to add the first one.
            </div>
          ) : (
            <div className="space-y-2">
              {recent.map((t) => (
                <div
                  key={t.id}
                  style={{
                    backgroundColor: COLORS.surface,
                    borderColor: COLORS.border,
                  }}
                  className="flex items-center gap-3 border rounded-md px-4 py-3"
                >
                  <Folder
                    size={14}
                    color={COLORS.accentLight}
                    className="shrink-0"
                  />
                  <p
                    style={{ color: COLORS.textHi }}
                    className="text-sm truncate flex-1"
                  >
                    {t.title}
                  </p>
                  <span
                    style={{ color: COLORS.textLo, fontFamily: FONT_MONO }}
                    className="text-xs shrink-0"
                  >
                    {t.project}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setPage("dashboard")}
          style={{ backgroundColor: COLORS.accent, color: COLORS.textHi }}
          className="flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
          <LayoutDashboard size={16} />
          Open admin dashboard
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- ADMIN DASHBOARD ---------------- */

function AdminDashboard({ tasks, setTasks }) {
  const [activeProject, setActiveProject] = useState("All");
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [error, setError] = useState("");

  const projects = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.project))),
    [tasks],
  );

  const visibleTasks =
    activeProject === "All"
      ? tasks
      : tasks.filter((t) => t.project === activeProject);

  const grouped = useMemo(() => {
    const map = {};
    visibleTasks.forEach((t) => {
      if (!map[t.project]) map[t.project] = [];
      map[t.project].push(t);
    });
    return map;
  }, [visibleTasks]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("A task needs a title.");
      return;
    }
    if (!project.trim()) {
      setError("Assign the task to a project.");
      return;
    }
    const nextTicket = tasks.length
      ? Math.max(...tasks.map((t) => t.ticket)) + 1
      : 1;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ticket: nextTicket,
        title: title.trim(),
        project: project.trim(),
      },
    ]);
    setTitle("");
    setProject("");
    setError("");
  };

  const handleDelete = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="px-6 sm:px-10 py-8">
      <div className="mb-6">
        <h1
          style={{ color: COLORS.textHi, fontFamily: FONT_DISPLAY }}
          className="text-2xl font-bold mb-1"
        >
          Admin Dashboard
        </h1>
        <p style={{ color: COLORS.textLo }} className="text-sm">
          Add a task or remove one from the ledger.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Add task */}
        <section
          style={{
            backgroundColor: COLORS.surface,
            borderColor: COLORS.border,
          }}
          className="border rounded-lg p-6 h-fit w-full lg:w-80 shrink-0 lg:sticky lg:top-8"
        >
          <h2
            style={{ color: COLORS.textHi, fontFamily: FONT_DISPLAY }}
            className="text-base font-bold mb-4"
          >
            Add task
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label
                style={{ color: COLORS.textLo }}
                className="text-xs uppercase tracking-wide block mb-1.5"
              >
                Task title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Repaint loading bay door"
                style={{
                  backgroundColor: COLORS.surfaceRaised,
                  borderColor: COLORS.border,
                  color: COLORS.textHi,
                }}
                className="w-full rounded-md border px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label
                style={{ color: COLORS.textLo }}
                className="text-xs uppercase tracking-wide block mb-1.5"
              >
                Project
              </label>
              <input
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="e.g. Workshop Build"
                list="project-options"
                style={{
                  backgroundColor: COLORS.surfaceRaised,
                  borderColor: COLORS.border,
                  color: COLORS.textHi,
                }}
                className="w-full rounded-md border px-3 py-2.5 text-sm outline-none"
              />
              <datalist id="project-options">
                {projects.map((p) => (
                  <option value={p} key={p} />
                ))}
              </datalist>
            </div>

            {error && (
              <p style={{ color: COLORS.accentLight }} className="text-xs">
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{ backgroundColor: COLORS.accent, color: COLORS.textHi }}
              className="w-full flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> Add task
            </button>
          </form>
        </section>

        {/* Task list */}
        <section className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {["All", ...projects].map((p) => {
              const isActive = activeProject === p;
              const count =
                p === "All"
                  ? tasks.length
                  : tasks.filter((t) => t.project === p).length;
              return (
                <button
                  key={p}
                  onClick={() => setActiveProject(p)}
                  style={{
                    backgroundColor: isActive ? COLORS.accent : COLORS.surface,
                    color: isActive ? COLORS.textHi : COLORS.textLo,
                    borderColor: COLORS.border,
                  }}
                  className="whitespace-nowrap text-sm px-4 py-2 rounded-md border flex items-center gap-2 transition-colors"
                >
                  {p}
                  <span
                    style={{ fontFamily: FONT_MONO, opacity: 0.8 }}
                    className="text-xs"
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {Object.keys(grouped).length === 0 && (
            <div
              style={{ borderColor: COLORS.border, color: COLORS.textLo }}
              className="border border-dashed rounded-lg py-16 text-center text-sm"
            >
              No tasks yet. Add the first one from the form on the left.
            </div>
          )}

          <div className="space-y-8">
            {Object.entries(grouped).map(([proj, items]) => (
              <div key={proj}>
                <div className="flex items-center gap-3 mb-3">
                  <h3
                    style={{ color: COLORS.textHi, fontFamily: FONT_DISPLAY }}
                    className="text-sm font-bold tracking-wide uppercase"
                  >
                    {proj}
                  </h3>
                  <div
                    style={{ backgroundColor: COLORS.border }}
                    className="h-px flex-1"
                  />
                  <span
                    style={{ color: COLORS.textLo, fontFamily: FONT_MONO }}
                    className="text-xs"
                  >
                    {items.length} {items.length === 1 ? "task" : "tasks"}
                  </span>
                </div>

                <div className="space-y-2">
                  {items.map((t) => (
                    <div
                      key={t.id}
                      style={{
                        backgroundColor: COLORS.surface,
                        borderColor: COLORS.border,
                      }}
                      className="flex items-stretch border rounded-md overflow-hidden"
                    >
                      <div
                        style={{
                          backgroundColor: COLORS.surfaceRaised,
                          color: COLORS.accentLight,
                          fontFamily: FONT_MONO,
                          borderColor: COLORS.border,
                        }}
                        className="w-16 sm:w-20 flex items-center justify-center text-xs sm:text-sm border-r shrink-0"
                      >
                        #{String(t.ticket).padStart(3, "0")}
                      </div>
                      <div className="flex-1 flex items-center justify-between gap-3 px-4 py-3 min-w-0">
                        <p
                          style={{ color: COLORS.textHi }}
                          className="text-sm font-medium truncate"
                        >
                          {t.title}
                        </p>
                        <button
                          onClick={() => handleDelete(t.id)}
                          aria-label={`Delete ${t.title}`}
                          style={{ color: COLORS.textLo }}
                          className="p-1.5 rounded-md hover:bg-white/5 transition-colors shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- APP ROOT ---------------- */

export default function App() {
  const [page, setPage] = useState("login");
  const [adminEmail, setAdminEmail] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      ticket: 1,
      title: "Draft Q3 client proposal",
      project: "Atlas Rebrand",
    },
    {
      id: 2,
      ticket: 2,
      title: "Fix checkout overflow bug",
      project: "Storefront",
    },
    {
      id: 3,
      ticket: 3,
      title: "Source oak veneer samples",
      project: "Workshop Build",
    },
    {
      id: 4,
      ticket: 4,
      title: "Schedule plumber for unit 4",
      project: "Workshop Build",
    },
  ]);

  const projects = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.project))),
    [tasks],
  );

  const handleLogin = (email) => {
    setAdminEmail(email);
    setPage("home");
  };

  const handleLogout = () => {
    setAdminEmail("");
    setPage("login");
  };

  if (page === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  <button
    onClick={async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/");
        const data = await res.json();
        console.log(data);
        alert("Backend connected!");
      } catch (err) {
        console.error(err);
        alert("Backend NOT connected");
      }
    }}
  >
    Test Backend
  </button>;

  return (
    <div
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: FONT_BODY,
        minHeight: "100vh",
      }}
    >
      <FontImport />
      <NavBar page={page} setPage={setPage} onLogout={handleLogout} />
      {page === "home" && (
        <HomePage
          adminEmail={adminEmail}
          tasks={tasks}
          projects={projects}
          setPage={setPage}
        />
      )}
      {page === "dashboard" && (
        <AdminDashboard tasks={tasks} setTasks={setTasks} />
      )}
    </div>
  );
}
