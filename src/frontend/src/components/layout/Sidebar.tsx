import type { Club, Post } from "@/backend";
import { EventCalendarWidget } from "@/components/home/EventCalendarWidget";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Home, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  clubs: Club[];
  isLoading: boolean;
  currentClubSlug?: string;
  onNavigate: (path: string) => void;
  currentPath: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  events?: Post[];
  eventsLoading?: boolean;
}

export function Sidebar({
  clubs: _clubs,
  isLoading: _isLoading,
  currentClubSlug: _currentClubSlug,
  onNavigate,
  currentPath,
  mobileOpen = false,
  onMobileClose,
  events = [],
  eventsLoading = false,
}: Props) {
  const { t } = useLanguage();

  const handleNav = (path: string) => {
    onNavigate(path);
    onMobileClose?.();
  };

  const content = (
    <div className="flex flex-col h-full">
      {/* College Branding */}
      <div
        className="px-4 py-5 border-b border-sidebar-border"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/20 shrink-0 shadow-lg">
            <img
              src="/assets/generated/dyp-college-logo-transparent.dim_120x120.png"
              alt="DYP Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-white font-display font-bold text-sm leading-tight">
              D.Y. Patil College
            </p>
            <p className="text-white/80 text-[10px] leading-snug mt-0.5">
              of Engineering & Technology
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {/* Home */}
        <button
          type="button"
          onClick={() => handleNav("/")}
          className={cn(
            "sidebar-link w-full",
            currentPath === "/" ? "active" : "",
          )}
          data-ocid="nav.home.link"
        >
          <Home className="h-4 w-4 shrink-0" />
          {t("home")}
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => handleNav("/profile")}
          className={cn(
            "sidebar-link w-full",
            currentPath === "/profile" ? "active" : "",
          )}
          data-ocid="nav.profile.link"
        >
          <User className="h-4 w-4 shrink-0" />
          Profile
        </button>

        {/* Event Calendar Widget */}
        <div className="mt-3 px-1">
          <EventCalendarWidget
            events={events}
            clubs={_clubs}
            isLoading={eventsLoading || _isLoading}
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
          © {new Date().getFullYear()} DYP COET
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border overflow-hidden">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-72 z-50 bg-sidebar border-r border-sidebar-border lg:hidden flex flex-col"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
