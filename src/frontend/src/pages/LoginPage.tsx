import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  GraduationCap,
  LogIn,
  Moon,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

/* ============================================================
   TYPES
============================================================ */
type Role = "student" | "teacher" | "admin";

interface LoginState {
  role: Role;
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
}

interface Props {
  onLogin: (role: Role, name: string) => void;
}

/* ============================================================
   ROLE OPTIONS
============================================================ */
const ROLES: {
  id: Role;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  description: string;
}[] = [
  {
    id: "student",
    label: "Student",
    icon: <User className="h-5 w-5" />,
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/40",
    border: "border-pink-200 dark:border-pink-800",
    activeBg: "bg-pink-100 dark:bg-pink-900/50",
    activeBorder: "border-pink-400 dark:border-pink-500",
    activeText: "text-pink-700 dark:text-pink-300",
    description: "Access courses, events, and clubs",
  },
  {
    id: "teacher",
    label: "Teacher",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    activeBg: "bg-amber-100 dark:bg-amber-900/50",
    activeBorder: "border-amber-400 dark:border-amber-500",
    activeText: "text-amber-700 dark:text-amber-300",
    description: "Manage doubts, events, and students",
  },
  {
    id: "admin",
    label: "Admin",
    icon: <ShieldCheck className="h-5 w-5" />,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800",
    activeBg: "bg-rose-100 dark:bg-rose-900/50",
    activeBorder: "border-rose-400 dark:border-rose-500",
    activeText: "text-rose-700 dark:text-rose-300",
    description: "Full control over all content",
  },
];

/* ============================================================
   DEMO CREDENTIALS
============================================================ */
const DEMO: Record<Role, { email: string; password: string; name: string }> = {
  student: {
    email: "student@gmail.com",
    password: "student123",
    name: "Ananya Desai",
  },
  teacher: {
    email: "faculty@dypcet.ac.in",
    password: "teacher123",
    name: "Prof. V. Kulkarni",
  },
  admin: {
    email: "admin@dypcet.ac.in",
    password: "admin123",
    name: "Admin",
  },
};

/* ============================================================
   LOGIN PAGE
============================================================ */
export function LoginPage({ onLogin }: Props) {
  const { toggleTheme, isDark } = useTheme();
  const [state, setState] = useState<LoginState>({
    role: "student",
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  });

  const set = (patch: Partial<LoginState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const handleLogin = () => {
    if (!state.email.trim() || !state.password.trim()) {
      toast.error("Please enter your email and password");
      return;
    }

    set({ loading: true });

    // Simulate auth delay
    setTimeout(() => {
      const demo = DEMO[state.role];
      if (state.email === demo.email && state.password === demo.password) {
        toast.success(`Welcome back, ${demo.name}!`);
        localStorage.setItem(
          "dyp_auth",
          JSON.stringify({ role: state.role, name: demo.name }),
        );
        onLogin(state.role, demo.name);
      } else {
        toast.error("Invalid credentials. Try the demo credentials below.");
        set({ loading: false });
      }
    }, 900);
  };

  const fillDemo = () => {
    const demo = DEMO[state.role];
    set({ email: demo.email, password: demo.password });
    toast.info("Demo credentials filled");
  };

  const selectedRole = ROLES.find((r) => r.id === state.role)!;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden"
      data-ocid="login.page"
    >
      {/* Background decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pink-100/60 dark:bg-pink-950/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-rose-100/50 dark:bg-rose-950/15 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-fuchsia-100/40 dark:bg-fuchsia-950/10 blur-2xl" />
      </div>

      {/* Theme toggle top-right */}
      <button
        type="button"
        onClick={toggleTheme}
        className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center neo-card hover:scale-105 transition-transform"
        aria-label="Toggle theme"
        data-ocid="login.theme.toggle"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-500" />
        ) : (
          <Moon className="h-4 w-4 text-slate-600" />
        )}
      </button>

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="neo-card p-8 space-y-6">
          {/* Logo + Title */}
          <div className="text-center space-y-3">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #f472b6, #ec4899, #be185d)",
              }}
            >
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                DYP COET
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                D.Y. Patil College of Engineering and Technology
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                College Social Network
              </p>
            </div>
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Login as</Label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() =>
                    set({ role: role.id, email: "", password: "" })
                  }
                  data-ocid={`login.role_${role.id}.button`}
                  className={cn(
                    "flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl border-2 text-center transition-all",
                    state.role === role.id
                      ? `${role.activeBg} ${role.activeBorder} ${role.activeText} shadow-md scale-[1.02]`
                      : `${role.bg} ${role.border} ${role.color} hover:scale-[1.01]`,
                  )}
                >
                  {role.icon}
                  <span className="text-xs font-semibold">{role.label}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground text-center">
              {selectedRole.description}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Email</Label>
            <Input
              type="email"
              value={state.email}
              onChange={(e) => set({ email: e.target.value })}
              placeholder={DEMO[state.role].email}
              className="rounded-xl text-sm h-10"
              data-ocid="login.email.input"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Password</Label>
            <div className="relative">
              <Input
                type={state.showPassword ? "text" : "password"}
                value={state.password}
                onChange={(e) => set({ password: e.target.value })}
                placeholder="Enter your password"
                className="rounded-xl text-sm h-10 pr-10"
                data-ocid="login.password.input"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                type="button"
                onClick={() => set({ showPassword: !state.showPassword })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="login.toggle_password.button"
              >
                {state.showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Demo credentials hint */}
          <div className="neo-inset rounded-xl p-3 space-y-1.5">
            <p className="text-[11px] font-semibold text-muted-foreground text-center">
              Demo Credentials
            </p>
            <div className="text-[11px] text-muted-foreground text-center space-y-0.5">
              <p>
                Email:{" "}
                <span className="font-mono text-foreground">
                  {DEMO[state.role].email}
                </span>
              </p>
              <p>
                Password:{" "}
                <span className="font-mono text-foreground">
                  {DEMO[state.role].password}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="w-full text-[11px] text-primary font-semibold hover:underline"
              data-ocid="login.fill_demo.button"
            >
              Fill demo credentials
            </button>
          </div>

          {/* Login Button */}
          <Button
            className="w-full rounded-xl h-10 gap-2 font-semibold"
            onClick={handleLogin}
            disabled={state.loading}
            data-ocid="login.submit.button"
            style={{
              background: "linear-gradient(135deg, #f472b6, #ec4899, #be185d)",
            }}
          >
            {state.loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Login as {selectedRole.label}
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
