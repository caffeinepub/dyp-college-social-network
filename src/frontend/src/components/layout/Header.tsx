import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type Language, useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  Bell,
  CalendarCheck,
  ChevronDown,
  Globe,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogIn,
  LogOut,
  Map as MapIcon,
  Menu,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AuthRole = "student" | "teacher" | "admin" | null;

interface AuthState {
  role: AuthRole;
  name: string;
}

interface Props {
  unreadCount: number;
  onNotificationClick: () => void;
  onHelpClick: () => void;
  onMenuClick: () => void;
  auth: AuthState;
  onLogout: () => void;
}

const languages: { value: Language; label: string; short: string }[] = [
  { value: "en", label: "English", short: "EN" },
  { value: "mar", label: "मराठी", short: "MAR" },
  { value: "hin", label: "हिन्दी", short: "HIN" },
];

function navigateTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

const ROLE_LABEL: Record<string, string> = {
  student: "Student",
  teacher: "Faculty",
  admin: "Admin",
};

const ROLE_COLOR: Record<string, { text: string; bg: string; border: string }> =
  {
    student: {
      text: "text-blue-700 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-300 dark:border-blue-700",
    },
    teacher: {
      text: "text-amber-700 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-300 dark:border-amber-700",
    },
    admin: {
      text: "text-slate-700 dark:text-slate-300",
      bg: "bg-slate-100 dark:bg-slate-800/40",
      border: "border-slate-300 dark:border-slate-600",
    },
  };

function MenuSheet({
  auth,
  onLogout,
}: {
  auth: AuthState;
  onLogout: () => void;
}) {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const goTo = (path: string) => {
    setSheetOpen(false);
    navigateTo(path);
  };

  const handleLogout = () => {
    setSheetOpen(false);
    onLogout();
    toast.success("Logged out successfully");
  };

  const handleLogin = () => {
    setSheetOpen(false);
    navigateTo("/login");
  };

  const roleColors = auth.role ? ROLE_COLOR[auth.role] : null;

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl h-9 w-9"
          data-ocid="header.menu_sheet.button"
          aria-label="Open options menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-72 sm:max-w-xs p-0 flex flex-col"
        data-ocid="header.menu.sheet"
      >
        {/* Header branding */}
        <SheetHeader className="px-5 pt-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)",
              }}
            >
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <SheetTitle className="font-display font-bold text-sm text-foreground leading-tight">
                DYP COET
              </SheetTitle>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                College Social Network
              </p>
            </div>
          </div>

          {/* Logged in user pill */}
          {auth.role && roleColors && (
            <div
              className={cn(
                "mt-3 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium",
                roleColors.bg,
                roleColors.border,
                roleColors.text,
              )}
            >
              {auth.role === "student" && (
                <User className="h-3.5 w-3.5 shrink-0" />
              )}
              {auth.role === "teacher" && (
                <GraduationCap className="h-3.5 w-3.5 shrink-0" />
              )}
              {auth.role === "admin" && (
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-semibold truncate">{auth.name}</p>
                <p className="text-[10px] opacity-70">
                  {ROLE_LABEL[auth.role]}
                </p>
              </div>
            </div>
          )}
        </SheetHeader>

        {/* Menu items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {/* Dashboard - collapsible sub-options */}
          <Collapsible open={dashboardOpen} onOpenChange={setDashboardOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-foreground text-left"
                data-ocid="header.dashboard.toggle"
              >
                <LayoutDashboard className="h-4 w-4 shrink-0" />
                <span className="flex-1">Dashboard</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                    dashboardOpen && "rotate-180",
                  )}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 mt-1 space-y-0.5">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-slate-50 hover:text-slate-700 dark:hover:bg-slate-800/30 dark:hover:text-slate-300 transition-colors text-left"
                onClick={() => goTo("/dashboard/admin")}
                data-ocid="header.dashboard.admin.button"
              >
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                Admin Dashboard
              </button>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-colors text-left"
                onClick={() => goTo("/dashboard/student")}
                data-ocid="header.dashboard.student.button"
              >
                <User className="h-3.5 w-3.5 shrink-0" />
                Student Dashboard
              </button>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/30 dark:hover:text-amber-400 transition-colors text-left"
                onClick={() => goTo("/dashboard/teacher")}
                data-ocid="header.dashboard.teacher.button"
              >
                <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                Teacher Dashboard
              </button>
            </CollapsibleContent>
          </Collapsible>

          {/* Registered Events */}
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-foreground text-left"
            onClick={() => goTo("/registered-events")}
            data-ocid="header.registered_events.button"
          >
            <CalendarCheck className="h-4 w-4 shrink-0" />
            Registered Events
          </button>

          {/* Settings */}
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-foreground text-left"
            onClick={() => goTo("/settings")}
            data-ocid="header.settings.button"
          >
            <Settings className="h-4 w-4 shrink-0" />
            Settings
          </button>

          {/* Campus Map */}
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-foreground text-left"
            onClick={() =>
              window.open(
                "https://dulcet-kitten-48beb2.netlify.app/",
                "_blank",
                "noopener,noreferrer",
              )
            }
            data-ocid="header.campus_map.button"
          >
            <MapIcon className="h-4 w-4 shrink-0" />
            Campus Map
          </button>

          {/* Separator */}
          <div className="my-2 h-px bg-border/60" />

          {/* Login / Logout - always at the very bottom */}
          <button
            type="button"
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
              auth.role
                ? "text-destructive dark:text-red-400 hover:bg-destructive/10 dark:hover:bg-red-950/30"
                : "text-foreground hover:bg-primary/10 hover:text-primary",
            )}
            onClick={auth.role ? handleLogout : handleLogin}
            data-ocid="header.login.button"
          >
            {auth.role ? (
              <LogOut className="h-4 w-4 shrink-0" />
            ) : (
              <LogIn className="h-4 w-4 shrink-0" />
            )}
            <span>{auth.role ? "Logout" : "Login"}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/60">
          <p className="text-[10px] text-muted-foreground text-center">
            D.Y. Patil College of Engineering and Technology
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header({
  unreadCount,
  onNotificationClick,
  onHelpClick,
  onMenuClick,
  auth,
  onLogout,
}: Props) {
  const { toggleTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header
      className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 bg-background"
      style={{ boxShadow: "var(--neo-shadow-sm)" }}
    >
      {/* Left - hamburger for mobile */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-xl h-9 w-9"
          onClick={onMenuClick}
          data-ocid="header.hamburger.button"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden lg:flex items-center gap-2">
          <span className="font-display font-bold text-sm text-foreground/70 hidden xl:block">
            DYP College Social Network
          </span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {/* Logged-in user badge (desktop) */}
        {auth.role && (
          <div
            className={cn(
              "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold",
              ROLE_COLOR[auth.role].bg,
              ROLE_COLOR[auth.role].border,
              ROLE_COLOR[auth.role].text,
            )}
          >
            {auth.role === "admin" && <ShieldCheck className="h-3 w-3" />}
            {auth.role === "teacher" && <GraduationCap className="h-3 w-3" />}
            {auth.role === "student" && <User className="h-3 w-3" />}
            <span>{auth.name}</span>
          </div>
        )}

        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-xl h-9 px-2.5 font-medium text-xs"
              data-ocid="header.language.select"
              aria-label={t("language")}
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {languages.find((l) => l.value === language)?.short}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="neo-card border-0 min-w-[130px]"
          >
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={cn(
                  "rounded-lg text-sm cursor-pointer",
                  language === lang.value
                    ? "bg-primary/10 text-primary font-semibold"
                    : "",
                )}
              >
                <span className="w-8 text-xs font-bold opacity-60">
                  {lang.short}
                </span>
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-xl h-9 w-9"
          data-ocid="header.theme.toggle"
          aria-label={isDark ? t("lightMode") : t("darkMode")}
        >
          {isDark ? (
            <Sun className="h-4.5 w-4.5" />
          ) : (
            <Moon className="h-4.5 w-4.5" />
          )}
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onHelpClick}
          className="rounded-xl h-9 w-9"
          data-ocid="header.help.button"
          aria-label={t("help")}
        >
          <HelpCircle className="h-4.5 w-4.5" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationClick}
          className="rounded-xl h-9 w-9 relative"
          data-ocid="header.notification.button"
          aria-label={`${t("notifications")}${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>

        {/* Hamburger menu (three dashes) - desktop options sheet */}
        <MenuSheet auth={auth} onLogout={onLogout} />
      </div>
    </header>
  );
}
