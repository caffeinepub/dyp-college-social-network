import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  HelpCircle,
  MessageSquare,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

/* ============================================================
   MOCK DATA
============================================================ */
const STATS = [
  {
    label: "Students Under Guidance",
    value: "45",
    icon: <Users className="h-5 w-5" />,
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    label: "Doubts Received",
    value: "12",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "text-orange-700 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800",
  },
  {
    label: "Events Managed",
    value: "3",
    icon: <CalendarDays className="h-5 w-5" />,
    color: "text-yellow-700 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/40",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  {
    label: "Announcements Posted",
    value: "6",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "text-lime-700 dark:text-lime-400",
    bg: "bg-lime-50 dark:bg-lime-950/40",
    border: "border-lime-200 dark:border-lime-800",
  },
];

const DOUBTS = [
  {
    student: "Rohit Sharma",
    branch: "CSE",
    year: "TY",
    question: "How does dynamic programming differ from greedy algorithms?",
    status: "Answered",
  },
  {
    student: "Priya Kulkarni",
    branch: "IT",
    year: "SY",
    question: "Can you explain the concept of normalization in DBMS?",
    status: "Pending",
  },
  {
    student: "Mehul Patil",
    branch: "Electronics",
    year: "FY",
    question: "What is the difference between AC and DC circuits?",
    status: "Answered",
  },
  {
    student: "Sneha Joshi",
    branch: "CSE",
    year: "BTech",
    question: "How does React's virtual DOM differ from the real DOM?",
    status: "Pending",
  },
];

const DEPT_EVENTS = [
  {
    name: "TECHNOTSAV 2K25",
    date: "20 Mar 2026",
    role: "Coordinator",
    color:
      "bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800",
  },
  {
    name: "Project Exhibition",
    date: "15 Apr 2026",
    role: "Judge",
    color:
      "bg-orange-50 border-orange-200 dark:bg-orange-950/40 dark:border-orange-800",
  },
  {
    name: "Industry Expert Talk",
    date: "30 Mar 2026",
    role: "Organizer",
    color:
      "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/40 dark:border-yellow-800",
  },
];

const FACULTY_DIRECTORY = [
  {
    name: "Prof. V. Kulkarni",
    dept: "CSE",
    specialization: "Machine Learning",
  },
  {
    name: "Dr. S. Patil",
    dept: "Mechanical",
    specialization: "Thermodynamics",
  },
  {
    name: "Prof. A. Sharma",
    dept: "Electronics",
    specialization: "VLSI Design",
  },
  {
    name: "Dr. M. Joshi",
    dept: "Civil",
    specialization: "Structural Engineering",
  },
  { name: "Prof. R. Desai", dept: "IT", specialization: "Cybersecurity" },
];

/* ============================================================
   STATUS PILL
============================================================ */
function StatusPill({ status }: { status: string }) {
  const isAnswered = status === "Answered";
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
        isAnswered
          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
          : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800"
      }`}
    >
      {status}
    </span>
  );
}

/* ============================================================
   TEACHER DASHBOARD PAGE
============================================================ */
export function TeacherDashboardPage() {
  return (
    <div
      className="max-w-5xl mx-auto px-3 py-5 space-y-6"
      data-ocid="teacher.dashboard.page"
    >
      {/* Page Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-amber-100 dark:bg-amber-950/50">
            <GraduationCap className="h-5 w-5 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Teacher Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Welcome, Prof. V. Kulkarni
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-[11px] border-amber-300 text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-700 font-semibold"
        >
          Faculty - CSE
        </Badge>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            data-ocid={`teacher.stats.card.${i + 1}`}
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
        {/* Student Doubts */}
        <motion.div
          className="neo-card p-4 lg:col-span-2 space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h2 className="font-display font-bold text-sm text-foreground">
              Student Doubts
            </h2>
          </div>
          {DOUBTS.map((doubt, i) => (
            <div
              key={doubt.student}
              data-ocid={`teacher.doubts.item.${i + 1}`}
              className="neo-inset p-3 rounded-xl space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">
                    {doubt.student}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {doubt.branch} - {doubt.year}
                  </span>
                </div>
                <StatusPill status={doubt.status} />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {doubt.question}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Department Events + Faculty Directory */}
        <div className="space-y-4">
          {/* Department Events */}
          <motion.div
            className="neo-card p-4 space-y-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-display font-bold text-sm text-foreground">
                Department Events
              </h2>
            </div>
            {DEPT_EVENTS.map((event, i) => (
              <div
                key={event.name}
                data-ocid={`teacher.events.item.${i + 1}`}
                className={`neo-inset px-3 py-2.5 rounded-xl border ${event.color}`}
              >
                <p className="text-xs font-bold text-foreground">
                  {event.name}
                </p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[11px] text-muted-foreground">
                    {event.date}
                  </p>
                  <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                    {event.role}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Faculty Directory */}
          <motion.div
            className="neo-card p-4 space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.46 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-display font-bold text-sm text-foreground">
                Faculty Directory
              </h2>
            </div>
            {FACULTY_DIRECTORY.map((faculty, i) => (
              <div
                key={faculty.name}
                data-ocid={`teacher.faculty.item.${i + 1}`}
                className="flex items-center gap-2.5 py-1"
              >
                <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center shrink-0">
                  <Users className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-foreground truncate">
                    {faculty.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {faculty.dept} - {faculty.specialization}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
