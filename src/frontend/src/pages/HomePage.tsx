import { PostCategory } from "@/backend";
import { ActivityPulse } from "@/components/home/ActivityPulse";
import { EventCalendarWidget } from "@/components/home/EventCalendarWidget";
import { UpcomingEventsStrip } from "@/components/home/UpcomingEventsStrip";
import { PostCard } from "@/components/shared/PostCard";
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
                      src="/assets/uploads/image-1-1.png"
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
