import { PostCategory } from "@/backend";
import { ActivityPulse } from "@/components/home/ActivityPulse";
import { UpcomingEventsStrip } from "@/components/home/UpcomingEventsStrip";
import { EventActionButtons } from "@/components/shared/EventActionButtons";
import { PostCard } from "@/components/shared/PostCard";
import { StaticCountdown } from "@/components/shared/StaticCountdown";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useActivityFeed,
  useAllClubs,
  usePostsByCategory,
  useRecentPosts,
  useUpcomingEvents,
} from "@/hooks/useQueries";
import {
  Award,
  Bot,
  CalendarDays,
  Code2,
  FlaskConical,
  GraduationCap,
  Home,
  Megaphone,
  RefreshCw,
  Star,
  Trophy,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ProfilePage } from "./ProfilePage";

/* ============================================================
   TYPES
============================================================ */
type MainTab = "home" | "events" | "clubs" | "achievements" | "profile";
type ContentTab = "announcements" | "updates" | "events";

/* ============================================================
   CLUB DATA
============================================================ */
interface ClubBoxData {
  name: string;
  slug: string;
  description: string;
}

const OFFICIAL_CLUBS: ClubBoxData[] = [
  {
    name: "GDG",
    slug: "gdg",
    description:
      "Google Developer Group - explore cutting-edge Google tech and open source.",
  },
  {
    name: "E-Cell",
    slug: "e-cell",
    description:
      "Entrepreneurship Cell - foster startup culture and innovation.",
  },
  {
    name: "Official Theatre",
    slug: "official-theatre",
    description: "Drama and performance - bringing stories to life on stage.",
  },
  {
    name: "Official Dance",
    slug: "official-dance",
    description:
      "Celebrating diverse dance forms, from classical to contemporary.",
  },
  {
    name: "NCC",
    slug: "ncc",
    description:
      "National Cadet Corps - discipline, leadership, and national service.",
  },
  {
    name: "Official Music",
    slug: "official-music",
    description:
      "A space for musicians, vocalists, and music enthusiasts to perform.",
  },
];

const GENERAL_CLUBS: ClubBoxData[] = [
  {
    name: "Student Council",
    slug: "student-council",
    description:
      "The elected student body bridging students and administration.",
  },
  {
    name: "General Clubs",
    slug: "general-clubs",
    description:
      "A collective of hobby clubs: photography, coding, literature and more.",
  },
  {
    name: "NSS",
    slug: "nss",
    description:
      "National Service Scheme - community development and social welfare.",
  },
  {
    name: "SRC",
    slug: "src",
    description:
      "Student Resource Center - academic support and mentorship for all.",
  },
];

const FACULTY_CLUB: ClubBoxData = {
  name: "Faculty",
  slug: "faculty",
  description:
    "Faculty updates, academic communications, and announcements from the teaching staff of DYP COET.",
};

/* ============================================================
   ACHIEVEMENT DATA
============================================================ */
interface AchievementEntry {
  title: string;
  team: string;
  date: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS: AchievementEntry[] = [
  {
    title: "TECHNOTSAV 2K25 - Best Project",
    team: "GDG Team",
    date: "Mar 2025",
    gradientFrom: "from-amber-300",
    gradientTo: "to-orange-300",
    icon: <Trophy className="h-5 w-5 text-white" />,
  },
  {
    title: "Hackathon Winners",
    team: "E-Cell",
    date: "Feb 2026",
    gradientFrom: "from-violet-400",
    gradientTo: "to-purple-400",
    icon: <Zap className="h-5 w-5 text-white" />,
  },
  {
    title: "Cultural Excellence Award",
    team: "Official Theatre",
    date: "Jan 2026",
    gradientFrom: "from-blue-400",
    gradientTo: "to-indigo-400",
    icon: <Star className="h-5 w-5 text-white" />,
  },
  {
    title: "NSS Outstanding Service",
    team: "NSS Unit",
    date: "Dec 2025",
    gradientFrom: "from-teal-400",
    gradientTo: "to-cyan-400",
    icon: <Award className="h-5 w-5 text-white" />,
  },
  {
    title: "Sports Champion - ARPAN Meet",
    team: "SRC",
    date: "Mar 2026",
    gradientFrom: "from-green-400",
    gradientTo: "to-emerald-400",
    icon: <Trophy className="h-5 w-5 text-white" />,
  },
  {
    title: "Academic Topper - CSE Dept.",
    team: "Faculty",
    date: "Feb 2026",
    gradientFrom: "from-blue-400",
    gradientTo: "to-indigo-400",
    icon: <Star className="h-5 w-5 text-white" />,
  },
];

/* ============================================================
   CLUB CARD
============================================================ */
interface ClubCardProps {
  club: ClubBoxData;
  onNavigate: (path: string) => void;
  index: number;
  delay?: number;
}

function ClubCard({ club, onNavigate, index, delay = 0 }: ClubCardProps) {
  return (
    <motion.button
      className="neo-card p-4 flex flex-col items-start gap-2 text-left cursor-pointer w-full group"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      onClick={() => onNavigate(`/club/${club.slug}`)}
      data-ocid={`home.club.card.${index}`}
      aria-label={`Navigate to ${club.name}`}
    >
      <div>
        <p className="font-display font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors">
          {club.name}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
          {club.description}
        </p>
      </div>
    </motion.button>
  );
}

/* ============================================================
   URL HASH HELPERS
============================================================ */
function getHashTab(): MainTab {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  if (
    hash === "events" ||
    hash === "clubs" ||
    hash === "achievements" ||
    hash === "profile"
  ) {
    return hash as MainTab;
  }
  return "home";
}

/* ============================================================
   HOME PAGE
============================================================ */
interface Props {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: Props) {
  const { t } = useLanguage();
  const [mainTab, setMainTab] = useState<MainTab>(getHashTab);
  const [contentTab, setContentTab] = useState<ContentTab>("announcements");

  // Sync hash on tab change
  useEffect(() => {
    window.location.hash = mainTab === "home" ? "" : mainTab;
  }, [mainTab]);

  // Listen for back/forward
  useEffect(() => {
    const onHashChange = () => setMainTab(getHashTab());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* Queries */
  const { data: clubs = [], isLoading: clubsLoading } = useAllClubs();
  const { data: recentPosts = [], isLoading: recentLoading } =
    useRecentPosts(30);
  const { data: upcomingEvents = [], isLoading: eventsLoading } =
    useUpcomingEvents();
  const { data: activity = [], isLoading: activityLoading } = useActivityFeed();
  const { data: announcements = [], isLoading: annLoading } =
    usePostsByCategory(PostCategory.Announcement);
  const { data: updates = [], isLoading: updLoading } = usePostsByCategory(
    PostCategory.Update,
  );
  const { data: eventPosts = [], isLoading: evtLoading } = usePostsByCategory(
    PostCategory.Event,
  );

  /* ============================================================
     MAIN NAV TABS CONFIG
  ============================================================ */
  const mainTabs: { key: MainTab; label: string; icon: React.ReactNode }[] = [
    { key: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
    {
      key: "events",
      label: "Events",
      icon: <CalendarDays className="h-4 w-4" />,
    },
    { key: "clubs", label: "Clubs", icon: <Users className="h-4 w-4" /> },
    {
      key: "achievements",
      label: "Achievements",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserCircle className="h-4 w-4" />,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-56px)]">
      {/* Background decorative circles */}
      <div
        className="fixed top-20 left-10 w-96 h-96 rounded-full pointer-events-none float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.07), transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-32 right-20 w-80 h-80 rounded-full pointer-events-none float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(219,39,119,0.06), transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none float-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(251,207,232,0.05), transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed top-60 right-1/4 w-64 h-64 rounded-full pointer-events-none float-medium"
        style={{ border: "1.5px solid rgba(244,114,182,0.08)", zIndex: 0 }}
      />
      <div
        className="fixed bottom-20 left-1/4 w-48 h-48 rounded-full pointer-events-none float-fast"
        style={{ border: "1px solid rgba(219,39,119,0.06)", zIndex: 0 }}
      />

      {/* ============================================================
          STICKY MAIN NAV TAB BAR
      ============================================================ */}
      <div
        className="sticky top-14 z-30 px-3 pt-3 pb-2"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid rgba(244,114,182,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="neo-card p-1.5 rounded-full flex items-center gap-1">
            {mainTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                data-ocid={`main.nav.${tab.key}.tab`}
                onClick={() => setMainTab(tab.key)}
                className={[
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                  mainTab === tab.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/8",
                ].join(" ")}
                aria-current={mainTab === tab.key ? "page" : undefined}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          TAB CONTENT AREA
      ============================================================ */}
      <div
        className="max-w-5xl mx-auto px-3 py-5 relative"
        style={{ zIndex: 1 }}
      >
        <AnimatePresence mode="wait">
          {/* ==================== HOME TAB ==================== */}
          {mainTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {/* Announcements / Updates / Events sub-tabs */}
              <motion.section
                className="mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Tabs
                  value={contentTab}
                  onValueChange={(v) => setContentTab(v as ContentTab)}
                  className="w-full"
                >
                  <TabsList className="neo-inset p-1.5 h-auto gap-1 w-full sm:w-auto rounded-full">
                    <TabsTrigger
                      value="announcements"
                      className="rounded-full gap-1.5 font-medium text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none flex-1 sm:flex-none"
                      data-ocid="home.announcements.tab"
                    >
                      <Megaphone className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">
                        {t("announcements")}
                      </span>
                      <span className="sm:hidden">Announce</span>
                      {announcements.length > 0 && (
                        <span className="text-[10px] font-bold opacity-70">
                          {announcements.length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="updates"
                      className="rounded-full gap-1.5 font-medium text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none flex-1 sm:flex-none"
                      data-ocid="home.updates.tab"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      {t("updates")}
                      {updates.length > 0 && (
                        <span className="text-[10px] font-bold opacity-70">
                          {updates.length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="events"
                      className="rounded-full gap-1.5 font-medium text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none flex-1 sm:flex-none"
                      data-ocid="home.events.sub_tab"
                    >
                      <CalendarDays className="h-3.5 w-3.5" />
                      {t("events")}
                      {eventPosts.length > 0 && (
                        <span className="text-[10px] font-bold opacity-70">
                          {eventPosts.length}
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  {/* Announcements tab */}
                  <TabsContent value="announcements" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {/* Static TECHNOTSAV card */}
                      <motion.div
                        data-ocid="home.announcements.technotsav.card"
                        className="neo-card overflow-hidden flex flex-col"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{ height: "180px" }}
                        >
                          <img
                            src="/assets/uploads/image-1.png"
                            alt="TECHNOTSAV 2K25 - Cosmos of Innovation"
                            className="w-full h-full object-cover"
                            style={{ borderRadius: "1rem 1rem 0 0" }}
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                              borderRadius: "1rem 1rem 0 0",
                            }}
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm"
                              style={{
                                background: "rgba(244,63,94,0.92)",
                                color: "#fff",
                                backdropFilter: "blur(6px)",
                              }}
                            >
                              Announcement
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-4 gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-700"
                            >
                              National Level Technical Fest
                            </Badge>
                          </div>
                          <h3 className="font-display font-bold text-base leading-snug text-foreground">
                            TECHNOTSAV 2K25 - Cosmos of Innovation
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            A National Level Technical Fest celebrating
                            innovation and technology at D.Y. Patil College of
                            Engineering and Technology.
                          </p>
                          <div className="mt-auto pt-1">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              Activities Include
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                <Code2 className="h-3 w-3" />
                                Coding Competitions
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                                <Bot className="h-3 w-3" />
                                Robotics Events
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                                <FlaskConical className="h-3 w-3" />
                                Project Exhibitions
                              </span>
                            </div>
                          </div>
                          <StaticCountdown
                            dateMs={new Date("2026-03-20").getTime()}
                            accentClass="text-blue-600 dark:text-blue-400"
                            bgClass="bg-blue-50 dark:bg-blue-950/40"
                          />
                          <EventActionButtons
                            title="TECHNOTSAV 2K25 - Cosmos of Innovation"
                            description="A National Level Technical Fest celebrating innovation and technology at D.Y. Patil College of Engineering and Technology. Activities: Coding Competitions, Robotics Events, Project Exhibitions."
                            dateMs={new Date("2026-03-20").getTime()}
                          />
                        </div>
                      </motion.div>

                      {/* Static ARPAN Annual Sports Meet card */}
                      <motion.div
                        data-ocid="home.announcements.arpan_sports.card"
                        className="neo-card overflow-hidden flex flex-col"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <div
                          className="relative w-full overflow-hidden flex items-center justify-center"
                          style={{
                            height: "180px",
                            background:
                              "linear-gradient(135deg, #f97316 0%, #fb923c 40%, #fbbf24 100%)",
                            borderRadius: "1rem 1rem 0 0",
                          }}
                        >
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ borderRadius: "1rem 1rem 0 0" }}
                          >
                            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white opacity-10" />
                            <div className="absolute bottom-0 -left-4 w-20 h-20 rounded-full bg-white opacity-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-4 border-white opacity-10" />
                          </div>
                          <div className="relative flex flex-col items-center gap-2">
                            <span className="text-white font-bold text-sm tracking-wide opacity-90">
                              ARPAN SPORTS MEET
                            </span>
                          </div>
                          <div className="absolute top-3 left-3">
                            <span
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm"
                              style={{
                                background: "rgba(234,88,12,0.92)",
                                color: "#fff",
                                backdropFilter: "blur(6px)",
                              }}
                            >
                              Announcement
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-4 gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-orange-300 text-orange-600 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-700"
                            >
                              Annual Sports Event
                            </Badge>
                          </div>
                          <h3 className="font-display font-bold text-base leading-snug text-foreground">
                            The ARPAN Annual Sports Meet
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            The grand annual sports event at D.Y. Patil College
                            of Engineering and Technology, celebrating athletic
                            spirit, teamwork, and college pride.
                          </p>
                          <div className="mt-auto pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                                Athletics
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                                Team Sports
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                                Championships
                              </span>
                            </div>
                          </div>
                          <StaticCountdown
                            dateMs={new Date("2026-03-25").getTime()}
                            accentClass="text-orange-600 dark:text-orange-400"
                            bgClass="bg-orange-50 dark:bg-orange-950/40"
                          />
                          <EventActionButtons
                            title="The ARPAN Annual Sports Meet"
                            description="The grand annual sports event at D.Y. Patil College of Engineering and Technology, celebrating athletic spirit, teamwork, and college pride."
                            dateMs={new Date("2026-03-25").getTime()}
                          />
                        </div>
                      </motion.div>

                      {/* Dynamic announcement posts */}
                      {annLoading
                        ? ["sk1", "sk2", "sk3"].map((k) => (
                            <Skeleton key={k} className="h-44 rounded-2xl" />
                          ))
                        : announcements.map((post, i) => (
                            <PostCard
                              key={post.id.toString()}
                              post={post}
                              clubs={clubs}
                              index={i + 1}
                            />
                          ))}
                    </div>
                  </TabsContent>

                  {/* Updates tab */}
                  <TabsContent value="updates" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {/* Static ARPAN Annual Gathering card */}
                      <motion.div
                        data-ocid="home.updates.arpan.card"
                        className="neo-card overflow-hidden flex flex-col"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{ height: "180px" }}
                        >
                          <img
                            src="/assets/generated/arpan-gathering.dim_800x450.jpg"
                            alt="ARPAN Annual Gathering"
                            className="w-full h-full object-cover"
                            style={{ borderRadius: "1rem 1rem 0 0" }}
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.38) 100%)",
                              borderRadius: "1rem 1rem 0 0",
                            }}
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm"
                              style={{
                                background: "rgba(236,72,153,0.92)",
                                color: "#fff",
                                backdropFilter: "blur(6px)",
                              }}
                            >
                              Update
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-4 gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-sky-300 text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-700"
                            >
                              Annual College Event
                            </Badge>
                          </div>
                          <h3 className="font-display font-bold text-base leading-snug text-foreground">
                            ARPAN Annual Gathering
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            The most awaited annual gathering of D.Y. Patil
                            College of Engineering and Technology, bringing
                            together students, faculty, and alumni for a
                            celebration of community, culture, and achievement.
                          </p>
                          <div className="mt-auto pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                                <Users className="h-3 w-3" />
                                Community Celebration
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
                                <CalendarDays className="h-3 w-3" />
                                Annual Event
                              </span>
                            </div>
                          </div>
                          <StaticCountdown
                            dateMs={new Date("2026-04-05").getTime()}
                            accentClass="text-sky-600 dark:text-sky-400"
                            bgClass="bg-sky-50 dark:bg-sky-950/40"
                          />
                          <EventActionButtons
                            title="ARPAN Annual Gathering"
                            description="The most awaited annual gathering of D.Y. Patil College of Engineering and Technology, bringing together students, faculty, and alumni for a celebration of community, culture, and achievement."
                            dateMs={new Date("2026-04-05").getTime()}
                          />
                        </div>
                      </motion.div>

                      {/* Static Partial Lunar Eclipse card */}
                      <motion.div
                        data-ocid="home.updates.lunar_eclipse.card"
                        className="neo-card overflow-hidden flex flex-col"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{ height: "180px" }}
                        >
                          <img
                            src="/assets/uploads/image-3-1.png"
                            alt="Partial Lunar Eclipse observed at DYPCET"
                            className="w-full h-full object-cover"
                            style={{ borderRadius: "1rem 1rem 0 0" }}
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
                              borderRadius: "1rem 1rem 0 0",
                            }}
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm"
                              style={{
                                background: "rgba(99,102,241,0.92)",
                                color: "#fff",
                                backdropFilter: "blur(6px)",
                              }}
                            >
                              Astronomy Club
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-4 gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-indigo-300 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-700"
                            >
                              First Eclipse of 2026
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-violet-300 text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-700"
                            >
                              Very Rare Image
                            </Badge>
                          </div>
                          <h3 className="font-display font-bold text-base leading-snug text-foreground">
                            Partial Lunar Eclipse at DYPCET Campus
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Students of DYPCET have observed a Partial Lunar
                            Eclipse from DYPCET campus under the Astronomy Club.
                            This eclipse is the first eclipse of the year 2026.
                            Total 67 students, 9 faculty members and a number of
                            civilians felt the experience of the lunar eclipse.
                          </p>
                          <div className="mt-auto pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                                <Users className="h-3 w-3" />
                                67 Students
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                                <Users className="h-3 w-3" />9 Faculty Members
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                <CalendarDays className="h-3 w-3" />
                                Year 2026
                              </span>
                            </div>
                          </div>
                          <StaticCountdown
                            dateMs={new Date("2026-03-14").getTime()}
                            accentClass="text-indigo-600 dark:text-indigo-400"
                            bgClass="bg-indigo-50 dark:bg-indigo-950/40"
                          />
                          <EventActionButtons
                            title="Partial Lunar Eclipse at DYPCET Campus"
                            description="Students of DYPCET observed a Partial Lunar Eclipse from DYPCET campus under the Astronomy Club. First eclipse of 2026. 67 students, 9 faculty members and civilians participated."
                            dateMs={new Date("2026-03-14").getTime()}
                          />
                        </div>
                      </motion.div>

                      {/* Dynamic update posts */}
                      {updLoading
                        ? ["sk1", "sk2", "sk3"].map((k) => (
                            <Skeleton key={k} className="h-44 rounded-2xl" />
                          ))
                        : updates.map((post, i) => (
                            <PostCard
                              key={post.id.toString()}
                              post={post}
                              clubs={clubs}
                              index={i + 1}
                            />
                          ))}
                    </div>
                  </TabsContent>

                  {/* Events sub-tab inside Home */}
                  <TabsContent value="events" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {/* Static Hackathon card */}
                      <motion.div
                        data-ocid="home.events.hackathon.card"
                        className="neo-card overflow-hidden flex flex-col"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{ height: "180px" }}
                        >
                          <img
                            src="/assets/uploads/image-2-1.png"
                            alt="Dimension X Hackathon"
                            className="w-full h-full object-cover"
                            style={{ borderRadius: "1rem 1rem 0 0" }}
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.38) 100%)",
                              borderRadius: "1rem 1rem 0 0",
                            }}
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm"
                              style={{
                                background: "rgba(16,185,129,0.92)",
                                color: "#fff",
                                backdropFilter: "blur(6px)",
                              }}
                            >
                              Event
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-4 gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-emerald-300 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700"
                            >
                              National Level Innovation Hackathon
                            </Badge>
                          </div>
                          <h3 className="font-display font-bold text-base leading-snug text-foreground">
                            Dimension X Hackathon
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            A National Level 24-Hour Open Innovation Hackathon
                            powered by HAC2KILL. Registrations are open now!
                          </p>
                          <div className="mt-auto pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                <Code2 className="h-3 w-3" />
                                Open Innovation
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                                <Users className="h-3 w-3" />
                                No Registration Fee
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                <CalendarDays className="h-3 w-3" />
                                24 Hours
                              </span>
                            </div>
                          </div>
                          <StaticCountdown
                            dateMs={new Date("2026-03-28").getTime()}
                            accentClass="text-emerald-600 dark:text-emerald-400"
                            bgClass="bg-emerald-50 dark:bg-emerald-950/40"
                          />
                          <EventActionButtons
                            title="Dimension X Hackathon"
                            description="A National Level 24-Hour Open Innovation Hackathon powered by HAC2KILL. No registration fee. Registrations are open now!"
                            dateMs={new Date("2026-03-28").getTime()}
                          />
                        </div>
                      </motion.div>

                      {/* Static ECHO Got Talent card */}
                      <motion.div
                        data-ocid="home.events.echo_got_talent.card"
                        className="neo-card overflow-hidden flex flex-col"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{
                            height: "180px",
                            borderRadius: "1rem 1rem 0 0",
                          }}
                        >
                          <img
                            src="/assets/uploads/image-4-1.png"
                            alt="Cultural Fest / ECHO Got Talent - POV: Perspective of Voices"
                            className="w-full h-full object-cover object-top"
                            style={{ borderRadius: "1rem 1rem 0 0" }}
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm"
                              style={{
                                background: "rgba(168,85,247,0.92)",
                                color: "#fff",
                                backdropFilter: "blur(6px)",
                              }}
                            >
                              Event
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-4 gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-purple-300 text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-700"
                            >
                              Cultural Talent Show
                            </Badge>
                          </div>
                          <h3 className="font-display font-bold text-base leading-snug text-foreground">
                            Cultural Fest / ECHO Got Talent
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            POV: Perspective of Voices. Themes include
                            Geopolitical, Sustainability, Artificial
                            Intelligence, Space and Human Psychology. Entry:
                            Solo 100/- | Duo 150/-. Venue: Seminar Hall, DYPCET.
                          </p>
                          <div className="mt-auto pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                <CalendarDays className="h-3 w-3" />
                                07 March 2026
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                <Megaphone className="h-3 w-3" />
                                Cultural Fest
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                                <Users className="h-3 w-3" />
                                Open to All
                              </span>
                            </div>
                          </div>
                          <StaticCountdown
                            dateMs={new Date("2026-03-07").getTime()}
                            accentClass="text-purple-600 dark:text-purple-400"
                            bgClass="bg-purple-50 dark:bg-purple-950/40"
                          />
                          <EventActionButtons
                            title="Cultural Fest / ECHO Got Talent"
                            description="POV: Perspective of Voices. Themes: Geopolitical, Sustainability, Artificial Intelligence, Space and Human Psychology. Entry: Solo 100/- | Duo 150/-. Venue: Seminar Hall, DYPCET."
                            dateMs={new Date("2026-03-07").getTime()}
                          />
                        </div>
                      </motion.div>

                      {/* Dynamic event posts in sub-tab */}
                      {evtLoading
                        ? ["sk1", "sk2", "sk3"].map((k) => (
                            <Skeleton key={k} className="h-44 rounded-2xl" />
                          ))
                        : eventPosts.map((post, i) => (
                            <PostCard
                              key={post.id.toString()}
                              post={post}
                              clubs={clubs}
                              index={i + 1}
                            />
                          ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.section>

              {/* Upcoming Events Strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="mb-6"
              >
                <UpcomingEventsStrip
                  events={upcomingEvents}
                  clubs={clubs}
                  isLoading={eventsLoading || clubsLoading}
                />
              </motion.div>

              {/* Recent Posts */}
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-display font-bold text-base text-foreground">
                    {t("recentPosts")}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    ({recentPosts.length})
                  </span>
                </div>
                {recentLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
                      <Skeleton key={k} className="h-44 rounded-2xl" />
                    ))}
                  </div>
                ) : recentPosts.length === 0 ? (
                  <div
                    className="neo-card p-10 text-center text-sm text-muted-foreground"
                    data-ocid="home.posts.empty_state"
                  >
                    {t("noPosts")}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {recentPosts.map((post, i) => (
                      <PostCard
                        key={post.id.toString()}
                        post={post}
                        clubs={clubs}
                        index={i + 1}
                      />
                    ))}
                  </div>
                )}
              </motion.section>

              {/* Activity Pulse at the bottom of Home tab */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className="mt-6"
              >
                <ActivityPulse
                  entries={activity}
                  clubs={clubs}
                  isLoading={activityLoading || clubsLoading}
                />
              </motion.div>
            </motion.div>
          )}

          {/* ==================== EVENTS TAB ==================== */}
          {mainTab === "events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <CalendarDays className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-xl text-foreground">
                  Events
                </h2>
              </div>

              {/* Upcoming events strip */}
              <div className="mb-6">
                <UpcomingEventsStrip
                  events={upcomingEvents}
                  clubs={clubs}
                  isLoading={eventsLoading || clubsLoading}
                />
              </div>

              {/* All event cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {/* Static Hackathon */}
                <motion.div
                  data-ocid="events.hackathon.card"
                  className="neo-card overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: "180px" }}
                  >
                    <img
                      src="/assets/uploads/image-2-1.png"
                      alt="Dimension X Hackathon"
                      className="w-full h-full object-cover"
                      style={{ borderRadius: "1rem 1rem 0 0" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.38) 100%)",
                        borderRadius: "1rem 1rem 0 0",
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm"
                        style={{
                          background: "rgba(16,185,129,0.92)",
                          color: "#fff",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        Event
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-emerald-300 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700"
                    >
                      National Level Innovation Hackathon
                    </Badge>
                    <h3 className="font-display font-bold text-base leading-snug text-foreground">
                      Dimension X Hackathon
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A National Level 24-Hour Open Innovation Hackathon powered
                      by HAC2KILL. Registrations are open now!
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        <Code2 className="h-3 w-3" />
                        Open Innovation
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                        <Users className="h-3 w-3" />
                        No Registration Fee
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                        <CalendarDays className="h-3 w-3" />
                        24 Hours
                      </span>
                    </div>
                    <StaticCountdown
                      dateMs={new Date("2026-03-28").getTime()}
                      accentClass="text-emerald-600 dark:text-emerald-400"
                      bgClass="bg-emerald-50 dark:bg-emerald-950/40"
                    />
                    <EventActionButtons
                      title="Dimension X Hackathon"
                      description="A National Level 24-Hour Open Innovation Hackathon powered by HAC2KILL. No registration fee. Registrations are open now!"
                      dateMs={new Date("2026-03-28").getTime()}
                    />
                  </div>
                </motion.div>

                {/* Static ECHO Got Talent */}
                <motion.div
                  data-ocid="events.echo_got_talent.card"
                  className="neo-card overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: "180px", borderRadius: "1rem 1rem 0 0" }}
                  >
                    <img
                      src="/assets/uploads/image-4-1.png"
                      alt="Cultural Fest / ECHO Got Talent"
                      className="w-full h-full object-cover object-top"
                      style={{ borderRadius: "1rem 1rem 0 0" }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm"
                        style={{
                          background: "rgba(168,85,247,0.92)",
                          color: "#fff",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        Event
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-purple-300 text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-700"
                    >
                      Cultural Talent Show
                    </Badge>
                    <h3 className="font-display font-bold text-base leading-snug text-foreground">
                      Cultural Fest / ECHO Got Talent
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      POV: Perspective of Voices. Themes include Geopolitical,
                      Sustainability, AI, Space and Human Psychology. Entry:
                      Solo 100/- | Duo 150/-. Venue: Seminar Hall, DYPCET.
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                        <CalendarDays className="h-3 w-3" />
                        07 March 2026
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                        <Users className="h-3 w-3" />
                        Open to All
                      </span>
                    </div>
                    <StaticCountdown
                      dateMs={new Date("2026-03-07").getTime()}
                      accentClass="text-purple-600 dark:text-purple-400"
                      bgClass="bg-purple-50 dark:bg-purple-950/40"
                    />
                    <EventActionButtons
                      title="Cultural Fest / ECHO Got Talent"
                      description="POV: Perspective of Voices. Themes: Geopolitical, Sustainability, AI, Space and Human Psychology. Entry: Solo 100/- | Duo 150/-. Venue: Seminar Hall, DYPCET."
                      dateMs={new Date("2026-03-07").getTime()}
                    />
                  </div>
                </motion.div>

                {/* Dynamic event posts */}
                {evtLoading
                  ? ["sk1", "sk2", "sk3"].map((k) => (
                      <Skeleton key={k} className="h-44 rounded-2xl" />
                    ))
                  : eventPosts.map((post, i) => (
                      <PostCard
                        key={post.id.toString()}
                        post={post}
                        clubs={clubs}
                        index={i + 1}
                      />
                    ))}
              </div>
            </motion.div>
          )}

          {/* ==================== CLUBS TAB ==================== */}
          {mainTab === "clubs" && (
            <motion.div
              key="clubs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-xl text-foreground">
                  Clubs
                </h2>
              </div>

              {/* Official Clubs */}
              <motion.section
                className="mb-7"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                data-ocid="clubs.official_clubs.section"
              >
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-display font-bold text-base text-foreground">
                    Official Clubs
                  </h3>
                  <span className="ml-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Official
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {OFFICIAL_CLUBS.map((club, i) => (
                    <ClubCard
                      key={club.slug}
                      club={club}
                      onNavigate={onNavigate}
                      index={i + 1}
                      delay={0.05 + i * 0.06}
                    />
                  ))}
                </div>
              </motion.section>

              {/* General Clubs */}
              <motion.section
                className="mb-7"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                data-ocid="clubs.general_clubs.section"
              >
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-display font-bold text-base text-foreground">
                    General Clubs
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {GENERAL_CLUBS.map((club, i) => (
                    <ClubCard
                      key={club.slug}
                      club={club}
                      onNavigate={onNavigate}
                      index={i + 7}
                      delay={0.2 + i * 0.06}
                    />
                  ))}
                </div>
              </motion.section>

              {/* Faculty - highlighted card */}
              <motion.button
                className="neo-card w-full p-5 flex items-center gap-5 text-left cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.28 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                onClick={() => onNavigate(`/club/${FACULTY_CLUB.slug}`)}
                data-ocid="clubs.faculty.card"
                aria-label="Navigate to Faculty"
              >
                <div
                  className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(251,191,36,0.2), transparent 70%)",
                  }}
                />
                <div
                  className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.18))",
                    border: "1.5px solid rgba(251,191,36,0.4)",
                  }}
                >
                  <GraduationCap className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-bold text-base text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Faculty
                    </p>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                      style={{
                        background: "rgba(251,191,36,0.2)",
                        color: "#d97706",
                        border: "1px solid rgba(251,191,36,0.4)",
                      }}
                    >
                      Special
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {FACULTY_CLUB.description}
                  </p>
                </div>
              </motion.button>
            </motion.div>
          )}

          {/* ==================== PROFILE TAB ==================== */}
          {mainTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <ProfilePage />
            </motion.div>
          )}

          {/* ==================== ACHIEVEMENTS TAB ==================== */}
          {mainTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-xl text-foreground">
                  Achievements
                </h2>
                <span className="ml-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {ACHIEVEMENTS.length} recent
                </span>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                data-ocid="achievements.list"
              >
                {ACHIEVEMENTS.map((ach, i) => (
                  <motion.div
                    key={ach.title}
                    data-ocid={`achievements.item.${i + 1}`}
                    className="neo-card p-5 flex items-start gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  >
                    {/* Icon circle */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${ach.gradientFrom} ${ach.gradientTo} flex items-center justify-center shadow-md`}
                    >
                      {ach.icon}
                    </div>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-bold text-sm text-foreground leading-snug mb-1">
                        {ach.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {ach.team}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/8 text-primary">
                          <CalendarDays className="h-3 w-3" />
                          {ach.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty state note */}
              <motion.p
                className="mt-8 text-center text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                More achievements will appear here as clubs and teams submit
                their records.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
