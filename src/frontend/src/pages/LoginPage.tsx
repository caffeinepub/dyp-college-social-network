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
  Phone,
  ShieldCheck,
  Sun,
  User,
  UserPlus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

/* ============================================================
   TYPES
============================================================ */
type Role = "student" | "teacher" | "admin";
type Mode = "login" | "register";

interface LoginState {
  role: Role;
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
}

interface RegisterState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  role: Role;
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
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    activeBg: "bg-blue-100 dark:bg-blue-900/50",
    activeBorder: "border-blue-400 dark:border-blue-500",
    activeText: "text-blue-700 dark:text-blue-300",
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
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-50 dark:bg-slate-800/40",
    border: "border-slate-200 dark:border-slate-700",
    activeBg: "bg-slate-100 dark:bg-slate-700/50",
    activeBorder: "border-slate-400 dark:border-slate-500",
    activeText: "text-slate-700 dark:text-slate-300",
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
   GOOGLE LOGO SVG
============================================================ */
function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ============================================================
   LOGIN PAGE
============================================================ */
export function LoginPage({ onLogin }: Props) {
  const { toggleTheme, isDark } = useTheme();
  const [mode, setMode] = useState<Mode>("login");

  // Login state
  const [loginState, setLoginState] = useState<LoginState>({
    role: "student",
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  });

  // Register state
  const [registerState, setRegisterState] = useState<RegisterState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    role: "student",
    loading: false,
  });

  // Mobile OTP state
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const setLogin = (patch: Partial<LoginState>) =>
    setLoginState((prev) => ({ ...prev, ...patch }));
  const setRegister = (patch: Partial<RegisterState>) =>
    setRegisterState((prev) => ({ ...prev, ...patch }));

  const handleLogin = () => {
    if (!loginState.email.trim() || !loginState.password.trim()) {
      toast.error("Please enter your email and password");
      return;
    }

    setLogin({ loading: true });

    setTimeout(() => {
      const demo = DEMO[loginState.role];
      if (
        loginState.email === demo.email &&
        loginState.password === demo.password
      ) {
        toast.success(`Welcome back, ${demo.name}!`);
        localStorage.setItem(
          "dyp_auth",
          JSON.stringify({ role: loginState.role, name: demo.name }),
        );
        onLogin(loginState.role, demo.name);
      } else {
        toast.error("Invalid credentials. Try the demo credentials below.");
        setLogin({ loading: false });
      }
    }, 900);
  };

  const handleRegister = () => {
    if (!registerState.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!registerState.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!registerState.password.trim()) {
      toast.error("Please enter a password");
      return;
    }
    if (registerState.password !== registerState.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (registerState.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setRegister({ loading: true });
    setTimeout(() => {
      toast.success("Account created! Please sign in with your credentials.");
      setRegister({ loading: false });
      setMode("login");
      setLoginState((prev) => ({
        ...prev,
        email: registerState.email,
        password: "",
      }));
    }, 1000);
  };

  const fillDemo = () => {
    const demo = DEMO[loginState.role];
    setLogin({ email: demo.email, password: demo.password });
    toast.info("Demo credentials filled");
  };

  const handleGoogleSignIn = () => {
    toast.info("Google sign-in coming soon");
  };

  const handleSendOTP = () => {
    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    toast.info("OTP feature coming soon");
  };

  const selectedLoginRole = ROLES.find((r) => r.id === loginState.role)!;
  const selectedRegisterRole = ROLES.find((r) => r.id === registerState.role)!;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden"
      data-ocid="login.page"
    >
      {/* Background decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-100/60 dark:bg-blue-950/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-slate-100/50 dark:bg-slate-900/30 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-sky-100/40 dark:bg-sky-950/10 blur-2xl" />
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
        <div className="neo-card p-8 space-y-5">
          {/* Logo + Title */}
          <div className="text-center space-y-3">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)",
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

          {/* Mode Switcher */}
          <div className="neo-inset p-1 rounded-2xl flex gap-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              data-ocid="login.mode_signin.button"
              className={cn(
                "flex-1 py-2 rounded-xl text-sm font-semibold transition-all",
                mode === "login"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              data-ocid="login.mode_register.button"
              className={cn(
                "flex-1 py-2 rounded-xl text-sm font-semibold transition-all",
                mode === "register"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Create Account
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                {/* Role Selector */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Login as</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {ROLES.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() =>
                          setLogin({ role: role.id, email: "", password: "" })
                        }
                        data-ocid={`login.role_${role.id}.button`}
                        className={cn(
                          "flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl border-2 text-center transition-all",
                          loginState.role === role.id
                            ? `${role.activeBg} ${role.activeBorder} ${role.activeText} shadow-md scale-[1.02]`
                            : `${role.bg} ${role.border} ${role.color} hover:scale-[1.01]`,
                        )}
                      >
                        {role.icon}
                        <span className="text-xs font-semibold">
                          {role.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center">
                    {selectedLoginRole.description}
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Email</Label>
                  <Input
                    type="email"
                    value={loginState.email}
                    onChange={(e) => setLogin({ email: e.target.value })}
                    placeholder={DEMO[loginState.role].email}
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
                      type={loginState.showPassword ? "text" : "password"}
                      value={loginState.password}
                      onChange={(e) => setLogin({ password: e.target.value })}
                      placeholder="Enter your password"
                      className="rounded-xl text-sm h-10 pr-10"
                      data-ocid="login.password.input"
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setLogin({ showPassword: !loginState.showPassword })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid="login.toggle_password.button"
                    >
                      {loginState.showPassword ? (
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
                        {DEMO[loginState.role].email}
                      </span>
                    </p>
                    <p>
                      Password:{" "}
                      <span className="font-mono text-foreground">
                        {DEMO[loginState.role].password}
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

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[11px] text-muted-foreground font-medium whitespace-nowrap">
                    or continue with
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Google Sign-In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  data-ocid="login.google.button"
                  className="w-full neo-card flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:scale-[1.01] transition-all"
                >
                  <GoogleLogo />
                  Continue with Google
                </button>

                {/* Mobile Number */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowMobilePanel((p) => !p)}
                    data-ocid="login.mobile.button"
                    className="w-full neo-card flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:scale-[1.01] transition-all"
                  >
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Continue with Mobile Number
                  </button>

                  <AnimatePresence>
                    {showMobilePanel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 space-y-2">
                          <Input
                            type="tel"
                            maxLength={10}
                            value={mobileNumber}
                            onChange={(e) =>
                              setMobileNumber(
                                e.target.value.replace(/\D/g, "").slice(0, 10),
                              )
                            }
                            placeholder="Enter 10-digit mobile number"
                            className="rounded-xl text-sm h-10"
                            data-ocid="login.mobile_number.input"
                          />
                          <Button
                            size="sm"
                            className="w-full rounded-xl h-9 text-xs font-semibold"
                            onClick={handleSendOTP}
                            data-ocid="login.send_otp.button"
                            style={{
                              background:
                                "linear-gradient(135deg, #3b82f6, #2563eb)",
                            }}
                          >
                            Send OTP
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Login Button */}
                <Button
                  className="w-full rounded-xl h-10 gap-2 font-semibold"
                  onClick={handleLogin}
                  disabled={loginState.loading}
                  data-ocid="login.submit.button"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  }}
                >
                  {loginState.loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Login as {selectedLoginRole.label}
                    </>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Full Name</Label>
                  <Input
                    type="text"
                    value={registerState.fullName}
                    onChange={(e) => setRegister({ fullName: e.target.value })}
                    placeholder="Your full name"
                    className="rounded-xl text-sm h-10"
                    data-ocid="register.fullname.input"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Email</Label>
                  <Input
                    type="email"
                    value={registerState.email}
                    onChange={(e) => setRegister({ email: e.target.value })}
                    placeholder="yourname@gmail.com"
                    className="rounded-xl text-sm h-10"
                    data-ocid="register.email.input"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      type={registerState.showPassword ? "text" : "password"}
                      value={registerState.password}
                      onChange={(e) =>
                        setRegister({ password: e.target.value })
                      }
                      placeholder="Create a password"
                      className="rounded-xl text-sm h-10 pr-10"
                      data-ocid="register.password.input"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setRegister({
                          showPassword: !registerState.showPassword,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid="register.toggle_password.button"
                    >
                      {registerState.showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={
                        registerState.showConfirmPassword ? "text" : "password"
                      }
                      value={registerState.confirmPassword}
                      onChange={(e) =>
                        setRegister({ confirmPassword: e.target.value })
                      }
                      placeholder="Repeat your password"
                      className="rounded-xl text-sm h-10 pr-10"
                      data-ocid="register.confirm_password.input"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setRegister({
                          showConfirmPassword:
                            !registerState.showConfirmPassword,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid="register.toggle_confirm_password.button"
                    >
                      {registerState.showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Role Selector */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Register as</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {ROLES.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setRegister({ role: role.id })}
                        data-ocid={`register.role_${role.id}.button`}
                        className={cn(
                          "flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl border-2 text-center transition-all",
                          registerState.role === role.id
                            ? `${role.activeBg} ${role.activeBorder} ${role.activeText} shadow-md scale-[1.02]`
                            : `${role.bg} ${role.border} ${role.color} hover:scale-[1.01]`,
                        )}
                      >
                        {role.icon}
                        <span className="text-xs font-semibold">
                          {role.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center">
                    {selectedRegisterRole.description}
                  </p>
                </div>

                {/* Create Account Button */}
                <Button
                  className="w-full rounded-xl h-10 gap-2 font-semibold"
                  onClick={handleRegister}
                  disabled={registerState.loading}
                  data-ocid="register.submit.button"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  }}
                >
                  {registerState.loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>

                <p className="text-center text-[11px] text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-primary font-semibold hover:underline"
                    data-ocid="register.goto_login.button"
                  >
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
