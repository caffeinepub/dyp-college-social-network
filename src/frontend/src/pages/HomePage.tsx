import { PostCategory } from "@/backend";
import { ActivityPulse } from "@/components/home/ActivityPulse";
import { EventCalendarWidget } from "@/components/home/EventCalendarWidget";
import { UpcomingEventsStrip } from "@/components/home/UpcomingEventsStrip";
import { PostCard } from "@/components/shared/PostCard";
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
import { CalendarDays, Megaphone, RefreshCw } from "lucide-react";
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

  const tabData: Record<
    TabValue,
    {
      posts: typeof recentPosts;
      isLoading: boolean;
      icon: React.ElementType;
      label: string;
    }
  > = {
    announcements: {
      posts: announcements,
      isLoading: annLoading,
      icon: Megaphone,
      label: t("announcements"),
    },
    updates: {
      posts: updates,
      isLoading: updLoading,
      icon: RefreshCw,
      label: t("updates"),
    },
    events: {
      posts: eventPosts,
      isLoading: evtLoading,
      icon: CalendarDays,
      label: t("events"),
    },
  };

  return (
    <div className="flex gap-5 min-h-[calc(100vh-56px)] relative">
      {/* Fixed background circles - decorative, behind all content */}
      <div
        className="fixed top-20 left-10 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.07), transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-32 right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(219,39,119,0.06), transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,207,232,0.05), transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed top-60 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          border: "1.5px solid rgba(244,114,182,0.08)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-20 left-1/4 w-48 h-48 rounded-full pointer-events-none"
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
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-25"
              style={{
                background:
                  "radial-gradient(circle, rgba(219,39,119,0.7), transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-8 left-1/3 w-32 h-32 rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,114,182,0.6), transparent 70%)",
              }}
            />
            <div
              className="absolute top-2 left-1/2 w-20 h-20 rounded-full opacity-15"
              style={{
                background:
                  "radial-gradient(circle, rgba(251,207,232,0.9), transparent 70%)",
              }}
            />
            <div
              className="absolute -top-4 left-12 w-16 h-16 rounded-full opacity-20"
              style={{
                border: "2px solid rgba(244,114,182,0.4)",
              }}
            />
            <div
              className="absolute bottom-4 right-8 w-12 h-12 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,114,182,0.5), transparent 70%)",
              }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full opacity-25"
              style={{
                background: "rgba(251,207,232,0.8)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute -bottom-4 right-1/3 w-24 h-24 rounded-full opacity-10"
              style={{
                border: "1.5px solid rgba(219,39,119,0.5)",
              }}
            />
            <div
              className="absolute top-6 right-16 w-6 h-6 rounded-full opacity-40"
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

            {(["announcements", "updates", "events"] as TabValue[]).map(
              (tab) => (
                <TabsContent key={tab} value={tab} className="mt-4">
                  {tabData[tab].isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                      {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                        <Skeleton key={k} className="h-44 rounded-2xl" />
                      ))}
                    </div>
                  ) : tabData[tab].posts.length === 0 ? (
                    <div
                      className="bubble-card p-10 text-center text-sm text-muted-foreground"
                      data-ocid={`home.${tab}.empty_state`}
                    >
                      {(() => {
                        const TabIcon = tabData[tab].icon;
                        return (
                          <TabIcon className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        );
                      })()}
                      <p>{t("noPosts")}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                      {tabData[tab].posts.map((post, i) => (
                        <PostCard
                          key={post.id.toString()}
                          post={post}
                          clubs={clubs}
                          index={i + 1}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              ),
            )}
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
