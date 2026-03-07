import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { FloatingGitHubButton } from "./components/shared/FloatingGitHubButton";
import { FlowerMenu } from "./components/shared/FlowerMenu";
import { HelpModal } from "./components/shared/HelpModal";
import { NotificationPanel } from "./components/shared/NotificationPanel";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { useActor } from "./hooks/useActor";
import {
  useAllClubs,
  useNotifications,
  usePreSeedData,
  useUnreadCount,
  useUpcomingEvents,
} from "./hooks/useQueries";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { ClubPage } from "./pages/ClubPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisteredEventsPage } from "./pages/RegisteredEventsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { StudentDashboardPage } from "./pages/StudentDashboardPage";
import { TeacherDashboardPage } from "./pages/TeacherDashboardPage";

function AppInner() {
  const [currentPath, setCurrentPath] = useState(
    () => window.location.pathname,
  );
  const [notifOpen, setNotifOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  const { isDark } = useTheme();
  const { actor, isFetching } = useActor();
  const { data: notifications = [] } = useNotifications();
  const { data: unreadCount = BigInt(0) } = useUnreadCount();
  const { data: clubs = [], isLoading: clubsLoading } = useAllClubs();
  const { data: upcomingEvents = [], isLoading: eventsLoading } =
    useUpcomingEvents();
  const preSeed = usePreSeedData();

  // Seed data once
  useEffect(() => {
    if (!actor || isFetching) return;
    const seeded = localStorage.getItem("dyp_seeded_v2");
    if (!seeded) {
      preSeed.mutate(undefined, {
        onSuccess: () => {
          localStorage.setItem("dyp_seeded_v2", "true");
        },
      });
    }
  }, [actor, isFetching, preSeed.mutate]);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Parse current route
  const clubSlugMatch = currentPath.match(/^\/club\/([^/]+)(?:\/([^/]+))?/);
  const clubSlug = clubSlugMatch ? clubSlugMatch[1] : undefined;
  const subteamSlug = clubSlugMatch ? clubSlugMatch[2] : undefined;

  const renderPage = () => {
    if (clubSlug) {
      return (
        <ClubPage
          slug={clubSlug}
          subteamSlug={subteamSlug}
          onNavigate={navigate}
        />
      );
    }
    if (currentPath === "/dashboard/admin") return <AdminDashboardPage />;
    if (currentPath === "/dashboard/student") return <StudentDashboardPage />;
    if (currentPath === "/dashboard/teacher") return <TeacherDashboardPage />;
    if (currentPath === "/registered-events") return <RegisteredEventsPage />;
    if (currentPath === "/settings") return <SettingsPage />;
    if (currentPath === "/profile") return <ProfilePage />;
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Sidebar with Event Calendar */}
      <Sidebar
        clubs={clubs}
        isLoading={clubsLoading}
        onNavigate={navigate}
        currentPath={currentPath}
        mobileOpen={sidebarMobileOpen}
        onMobileClose={() => setSidebarMobileOpen(false)}
        events={upcomingEvents}
        eventsLoading={eventsLoading}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          unreadCount={Number(unreadCount)}
          onNotificationClick={() => setNotifOpen(true)}
          onHelpClick={() => setHelpOpen(true)}
          onMenuClick={() => setSidebarMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6">
          {renderPage()}
        </main>
      </div>

      {/* Floating GitHub button */}
      <FloatingGitHubButton />

      {/* Flower menu - bottom left: complaint, suggestion, live chat */}
      <FlowerMenu isDark={isDark} />

      {/* Panels & Modals */}
      <NotificationPanel
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
      />
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />

      <Toaster richColors position="bottom-left" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  );
}
