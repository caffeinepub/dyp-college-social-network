import { PostCategory } from "@/backend";
import { ActivityPulse } from "@/components/home/ActivityPulse";
import { EventCalendarWidget } from "@/components/home/EventCalendarWidget";
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
  Bot,
  CalendarDays,
  Code2,
  FlaskConical,
  Megaphone,
  RefreshCw,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type TabValue = "announcements" | "updates" | "events";

export function HomePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabValue>("announcements");

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

  return (
    <div className="flex gap-5 min-h-[calc(100vh-56px)] relative">
      {/* Fixed background circles - decorative, behind all content */}
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
        style={{
          border: "1.5px solid rgba(244,114,182,0.08)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-20 left-1/4 w-48 h-48 rounded-full pointer-events-none float-fast"
        style={{
          border: "1px solid rgba(219,39,119,0.06)",
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0 py-5 px-1 relative" style={{ zIndex: 1 }}>
        {/* Hero Tab Section */}
        <motion.section
          className="mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="rounded-3xl p-5 mb-5 relative overflow-hidden"
            style={{ background: "var(--gradient-hero)" }}
          >
            {/* Decorative bubble circles - pink, circly theme */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-25 float-medium"
              style={{
                background:
                  "radial-gradient(circle, rgba(219,39,119,0.7), transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-8 left-1/3 w-32 h-32 rounded-full opacity-20 float-slow"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,114,182,0.6), transparent 70%)",
              }}
            />
            <div
              className="absolute top-2 left-1/2 w-20 h-20 rounded-full opacity-15 float-fast"
              style={{
                background:
                  "radial-gradient(circle, rgba(251,207,232,0.9), transparent 70%)",
              }}
            />
            <div
              className="absolute -top-4 left-12 w-16 h-16 rounded-full opacity-20 float-reverse"
              style={{
                border: "2px solid rgba(244,114,182,0.4)",
              }}
            />
            <div
              className="absolute bottom-4 right-8 w-12 h-12 rounded-full opacity-30 float-medium"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,114,182,0.5), transparent 70%)",
              }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full opacity-25 float-slow"
              style={{
                background: "rgba(251,207,232,0.8)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute -bottom-4 right-1/3 w-24 h-24 rounded-full opacity-10 float-drift"
              style={{
                border: "1.5px solid rgba(219,39,119,0.5)",
              }}
            />
            <div
              className="absolute top-6 right-16 w-6 h-6 rounded-full opacity-40 float-fast"
              style={{
                background: "rgba(244,114,182,0.6)",
              }}
            />
            <div className="relative z-10">
              <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-1">
                D.Y. Patil College of Engineering and Technology
              </p>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight mb-2">
                College Social Network
              </h1>
              <p className="text-sm text-muted-foreground max-w-md">
                Stay connected with announcements, events, and updates from all
                clubs and departments.
              </p>
            </div>
          </div>

          {/* Tabs - pill shaped */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabValue)}
            className="w-full"
          >
            <TabsList className="bubble-card border-0 p-1.5 h-auto gap-1 w-full sm:w-auto rounded-full">
              <TabsTrigger
                value="announcements"
                className="rounded-full gap-1.5 font-medium text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none flex-1 sm:flex-none"
                data-ocid="home.announcements.tab"
              >
                <Megaphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t("announcements")}</span>
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
                data-ocid="home.events.tab"
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

            {/* Announcements tab - always shows TECHNOTSAV card at top */}
            <TabsContent value="announcements" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                {/* Static TECHNOTSAV card - always visible */}
                <motion.div
                  data-ocid="home.announcements.technotsav.card"
                  className="bubble-card border-0 overflow-hidden rounded-2xl flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  {/* Banner image */}
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
                    {/* Gradient overlay for readability */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                        borderRadius: "1rem 1rem 0 0",
                      }}
                    />
                    {/* Floating badge on image */}
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

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    {/* Type badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-rose-300 text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700"
                      >
                        National Level Technical Fest
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-base leading-snug text-foreground">
                      TECHNOTSAV 2K25 -- Cosmos of Innovation
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A National Level Technical Fest celebrating innovation and
                      technology at D.Y. Patil College of Engineering and
                      Technology.
                    </p>

                    {/* Activities section */}
                    <div className="mt-auto pt-1">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Activities Include
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                          <Code2 className="h-3 w-3" />
                          Coding Competitions
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300">
                          <Bot className="h-3 w-3" />
                          Robotics Events
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300">
                          <FlaskConical className="h-3 w-3" />
                          Project Exhibitions
                        </span>
                      </div>
                    </div>
                    <StaticCountdown
                      dateMs={new Date("2026-03-20").getTime()}
                      accentClass="text-rose-600 dark:text-rose-400"
                      bgClass="bg-rose-50 dark:bg-rose-950/40"
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
                  className="bubble-card border-0 overflow-hidden rounded-2xl flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  {/* Banner */}
                  <div
                    className="relative w-full overflow-hidden flex items-center justify-center"
                    style={{
                      height: "180px",
                      background:
                        "linear-gradient(135deg, #f97316 0%, #fb923c 40%, #fbbf24 100%)",
                      borderRadius: "1rem 1rem 0 0",
                    }}
                  >
                    {/* Decorative circles */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ borderRadius: "1rem 1rem 0 0" }}
                    >
                      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white opacity-10" />
                      <div className="absolute bottom-0 -left-4 w-20 h-20 rounded-full bg-white opacity-10" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-4 border-white opacity-10" />
                    </div>
                    {/* Sports icon */}
                    <div className="relative flex flex-col items-center gap-2">
                      <span className="text-5xl">🏅</span>
                      <span className="text-white font-bold text-sm tracking-wide opacity-90">
                        ARPAN SPORTS MEET
                      </span>
                    </div>
                    {/* Badge */}
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

                  {/* Card body */}
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
                      The grand annual sports event at D.Y. Patil College of
                      Engineering and Technology, celebrating athletic spirit,
                      teamwork, and college pride.
                    </p>
                    <div className="mt-auto pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                          🏃 Athletics
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                          ⚽ Team Sports
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                          🏆 Championships
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

            {/* Updates tab - always shows ARPAN Annual Gathering card at top */}
            <TabsContent value="updates" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                {/* Static ARPAN Annual Gathering card */}
                <motion.div
                  data-ocid="home.updates.arpan.card"
                  className="bubble-card border-0 overflow-hidden rounded-2xl flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  {/* Banner image */}
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

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 border-pink-300 text-pink-600 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-700"
                      >
                        Annual College Event
                      </Badge>
                    </div>

                    <h3 className="font-display font-bold text-base leading-snug text-foreground">
                      ARPAN Annual Gathering
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The most awaited annual gathering of D.Y. Patil College of
                      Engineering and Technology, bringing together students,
                      faculty, and alumni for a celebration of community,
                      culture, and achievement.
                    </p>

                    <div className="mt-auto pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300">
                          <Users className="h-3 w-3" />
                          Community Celebration
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                          <CalendarDays className="h-3 w-3" />
                          Annual Event
                        </span>
                      </div>
                    </div>
                    <StaticCountdown
                      dateMs={new Date("2026-04-05").getTime()}
                      accentClass="text-pink-600 dark:text-pink-400"
                      bgClass="bg-pink-50 dark:bg-pink-950/40"
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
                  className="bubble-card border-0 overflow-hidden rounded-2xl flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  {/* Banner image */}
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

                  {/* Card body */}
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
                      Students of DYPCET have observed a Partial Lunar Eclipse
                      from DYPCET campus under the Astronomy Club. This eclipse
                      is the first eclipse of the year 2026. Total 67 students,
                      9 faculty members and a number of civilians felt the
                      experience of the lunar eclipse.
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
                  : updates.length === 0
                    ? null
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

            {/* Events tab */}
            <TabsContent value="events" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                {/* Static Hackathon card */}
                <motion.div
                  data-ocid="home.events.hackathon.card"
                  className="bubble-card border-0 overflow-hidden rounded-2xl flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  {/* Banner image */}
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

                  {/* Card body */}
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
                      A National Level 24-Hour Open Innovation Hackathon powered
                      by HAC2KILL. Registrations are open now!
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
                  className="bubble-card border-0 overflow-hidden rounded-2xl flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  {/* Image banner */}
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

                  {/* Card body */}
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
                      POV: Perspective of Voices. Themes include Geopolitical,
                      Sustainability, Artificial Intelligence, Space and Human
                      Psychology. Entry: Solo 100/- | Duo 150/-. Venue: Seminar
                      Hall, DYPCET.
                    </p>

                    <div className="mt-auto pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                          <CalendarDays className="h-3 w-3" />
                          07 March 2026
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300">
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
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Upcoming Events Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <UpcomingEventsStrip
            events={upcomingEvents}
            clubs={clubs}
            isLoading={eventsLoading || clubsLoading}
          />
        </motion.div>

        {/* Recent Posts - full width below */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
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
              className="bubble-card p-10 text-center text-sm text-muted-foreground"
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
      </div>

      {/* Right Sidebar - Calendar Widget + Activity Pulse */}
      <motion.aside
        className="block w-64 lg:w-72 shrink-0 py-5 relative"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="sticky top-20 space-y-4">
          <EventCalendarWidget
            events={upcomingEvents}
            clubs={clubs}
            isLoading={eventsLoading || clubsLoading}
          />
          <ActivityPulse
            entries={activity}
            clubs={clubs}
            isLoading={activityLoading || clubsLoading}
          />
        </div>
      </motion.aside>
    </div>
  );
}
