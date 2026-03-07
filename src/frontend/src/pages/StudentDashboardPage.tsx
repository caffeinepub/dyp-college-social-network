import { EventActionButtons } from "@/components/shared/EventActionButtons";
import { StaticCountdown } from "@/components/shared/StaticCountdown";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookOpen,
  CalendarDays,
  Code2,
  Crown,
  Flame,
  Lock,
  Star,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

/* ============================================================
   MOCK DATA
============================================================ */
const STATS = [
  {
    label: "Events Registered",
    value: "3",
    icon: <CalendarDays className="h-5 w-5" />,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    label: "Clubs Joined",
    value: "2",
    icon: <User className="h-5 w-5" />,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    border: "border-indigo-200 dark:border-indigo-800",
  },
  {
    label: "Badges Earned",
    value: "2",
    icon: <Award className="h-5 w-5" />,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    label: "GitHub Projects",
    value: "1",
    icon: <Code2 className="h-5 w-5" />,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    border: "border-violet-200 dark:border-violet-800",
  },
];

const MY_EVENTS = [
  {
    name: "Dimension X Hackathon",
    date: "28 Mar 2026",
    dateMs: new Date("2026-03-28").getTime(),
    description: "National Level 24-Hour Open Innovation Hackathon by HAC2KILL",
    statusColor: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    name: "TECHNOTSAV 2K25",
    date: "20 Mar 2026",
    dateMs: new Date("2026-03-20").getTime(),
    description: "National Level Technical Fest at DYPCET",
    statusColor: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    name: "Cultural Fest / ECHO Got Talent",
    date: "07 Mar 2026",
    dateMs: new Date("2026-03-07").getTime(),
    description: "POV: Perspective of Voices - Cultural Talent Show",
    statusColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/40",
  },
];

const MY_CLUBS = [
  {
    name: "GDG",
    description: "Google Developer Group - technology and open source.",
    color:
      "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400",
  },
  {
    name: "E-Cell",
    description: "Entrepreneurship Cell - startup culture and innovation.",
    color:
      "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400",
  },
];

const ACTIVITY = [
  {
    text: "Registered for Dimension X Hackathon",
    time: "2 days ago",
    dot: "bg-emerald-400",
  },
  { text: "Joined GDG club community", time: "1 week ago", dot: "bg-blue-400" },
  {
    text: "Attended ECHO Got Talent cultural fest",
    time: "2 weeks ago",
    dot: "bg-purple-400",
  },
  {
    text: "Submitted GitHub project to showcase",
    time: "3 weeks ago",
    dot: "bg-blue-400",
  },
];

const BADGES = [
  {
    name: "Event Enthusiast",
    description: "Registered for 3+ events",
    icon: <Star className="h-6 w-6" />,
    earned: true,
    gradient: "from-amber-300 to-orange-300",
  },
  {
    name: "Hackathon Participant",
    description: "Joined a hackathon",
    icon: <Zap className="h-6 w-6" />,
    earned: true,
    gradient: "from-violet-400 to-purple-400",
  },
  {
    name: "Club Leader",
    description: "Join a club and lead it",
    icon: <Crown className="h-6 w-6" />,
    earned: false,
    gradient: "from-gray-300 to-gray-400",
  },
  {
    name: "Top Contributor",
    description: "Post 10 times to unlock",
    icon: <Flame className="h-6 w-6" />,
    earned: false,
    gradient: "from-gray-300 to-gray-400",
  },
];

/* ============================================================
   STUDENT DASHBOARD PAGE
============================================================ */
export function StudentDashboardPage() {
  return (
    <div
      className="max-w-5xl mx-auto px-3 py-5 space-y-6"
      data-ocid="student.dashboard.page"
    >
      {/* Page Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-100 dark:bg-blue-950/50">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Student Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Welcome back, Ananya Desai
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-[11px] border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-700 font-semibold"
        >
          SY - CSE
        </Badge>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            data-ocid={`student.stats.card.${i + 1}`}
            className="neo-card p-4 flex flex-col gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg} border ${stat.border}`}
            >
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <div>
              <p className="font-display font-bold text-2xl text-foreground leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* My Upcoming Events */}
        <motion.div
          className="neo-card p-4 lg:col-span-2 space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="h-4 w-4 text-primary" />
            <h2 className="font-display font-bold text-sm text-foreground">
              My Upcoming Events
            </h2>
          </div>
          {MY_EVENTS.map((event, i) => (
            <div
              key={event.name}
              data-ocid={`student.events.item.${i + 1}`}
              className="neo-inset p-3 rounded-xl space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {event.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {event.date}
                  </p>
                </div>
              </div>
              <StaticCountdown
                dateMs={event.dateMs}
                accentClass={event.statusColor}
                bgClass={event.bgColor}
              />
              <EventActionButtons
                title={event.name}
                description={event.description}
                dateMs={event.dateMs}
              />
            </div>
          ))}
        </motion.div>

        {/* Right column: clubs + activity */}
        <div className="space-y-4">
          {/* My Clubs */}
          <motion.div
            className="neo-card p-4 space-y-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <h2 className="font-display font-bold text-sm text-foreground">
                My Clubs
              </h2>
            </div>
            {MY_CLUBS.map((club, i) => (
              <div
                key={club.name}
                data-ocid={`student.clubs.item.${i + 1}`}
                className={`neo-inset px-3 py-2.5 rounded-xl border ${club.color}`}
              >
                <p className="text-xs font-bold">{club.name}</p>
                <p className="text-[11px] opacity-80 mt-0.5 leading-snug">
                  {club.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="neo-card p-4 space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.46 }}
          >
            <h2 className="font-display font-bold text-sm text-foreground mb-1">
              Recent Activity
            </h2>
            {ACTIVITY.map((item, i) => (
              <div
                key={item.text}
                data-ocid={`student.activity.item.${i + 1}`}
                className="flex items-start gap-2.5"
              >
                <div
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`}
                />
                <div>
                  <p className="text-[11px] text-foreground leading-snug">
                    {item.text}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Badges */}
      <motion.div
        className="neo-card p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.52 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Award className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold text-sm text-foreground">
            My Badges
          </h2>
          <span className="text-[11px] text-muted-foreground">
            2 earned / 4 total
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES.map((badge, i) => (
            <div
              key={badge.name}
              data-ocid={`student.badges.item.${i + 1}`}
              className={`neo-inset p-3 rounded-xl flex flex-col items-center gap-2 text-center relative ${!badge.earned ? "opacity-50" : ""}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center shadow-md ${badge.earned ? "" : "grayscale"}`}
              >
                <span className="text-white">{badge.icon}</span>
              </div>
              {!badge.earned && (
                <Lock className="h-3 w-3 text-muted-foreground absolute top-2 right-2" />
              )}
              <div>
                <p className="text-[11px] font-bold text-foreground leading-tight">
                  {badge.name}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
