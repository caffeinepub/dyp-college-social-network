import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  CalendarDays,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  HelpCircle,
  Link2,
  Linkedin,
  Mail,
  MessageSquare,
  Save,
  UserCircle,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

/* ============================================================
   TYPES
============================================================ */
interface TeacherProfile {
  fullName: string;
  department: string;
  specialization: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

const INITIAL_TEACHER_PROFILE: TeacherProfile = {
  fullName: "Prof. V. Kulkarni",
  department: "cse",
  specialization: "Machine Learning",
  bio: "Experienced faculty in CSE with a focus on ML and data science research. Passionate about mentoring students.",
  email: "",
  linkedin: "",
  github: "",
  portfolio: "",
};

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
  const [profile, setProfile] = useState<TeacherProfile>(() => {
    try {
      const saved = localStorage.getItem("dyp_teacher_profile");
      return saved
        ? (JSON.parse(saved) as TeacherProfile)
        : INITIAL_TEACHER_PROFILE;
    } catch {
      return INITIAL_TEACHER_PROFILE;
    }
  });

  const updateProfile = (key: keyof TeacherProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem("dyp_teacher_profile", JSON.stringify(profile));
    toast.success("Profile saved successfully");
  };

  const deptLabel: Record<string, string> = {
    cse: "CSE",
    mechanical: "Mechanical",
    civil: "Civil",
    electronics: "Electronics",
    it: "IT",
  };

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
              Welcome, {profile.fullName}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-[11px] border-amber-300 text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-700 font-semibold"
        >
          Faculty - {deptLabel[profile.department] ?? profile.department}
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

      {/* Teacher Profile Edit */}
      <motion.div
        className="neo-card p-5 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <UserCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <h2 className="font-display font-bold text-sm text-foreground">
            My Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Full Name */}
          <div className="space-y-1 sm:col-span-2">
            <Label className="text-xs font-medium">Full Name</Label>
            <Input
              value={profile.fullName}
              onChange={(e) => updateProfile("fullName", e.target.value)}
              placeholder="Prof. Your Name"
              className="rounded-xl text-sm h-9"
              data-ocid="teacher.profile.name.input"
            />
          </div>

          {/* Department */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">Department</Label>
            <Select
              value={profile.department}
              onValueChange={(v) => updateProfile("department", v)}
            >
              <SelectTrigger
                className="rounded-xl h-9 text-sm"
                data-ocid="teacher.profile.department.select"
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent className="neo-card border-0">
                <SelectItem value="cse">CSE</SelectItem>
                <SelectItem value="mechanical">Mechanical</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="it">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Specialization */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">Specialization</Label>
            <Input
              value={profile.specialization}
              onChange={(e) => updateProfile("specialization", e.target.value)}
              placeholder="e.g. Machine Learning"
              className="rounded-xl text-sm h-9"
              data-ocid="teacher.profile.specialization.input"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1 sm:col-span-2">
            <Label className="text-xs font-medium">Short Bio</Label>
            <Textarea
              value={profile.bio}
              onChange={(e) => updateProfile("bio", e.target.value)}
              placeholder="Write a short bio about yourself..."
              className="rounded-xl text-sm resize-none min-h-[70px]"
              data-ocid="teacher.profile.bio.textarea"
            />
          </div>
        </div>

        {/* Contact Links */}
        <div className="pt-2 border-t border-border/50 space-y-3">
          <div className="flex items-center gap-2">
            <Link2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold text-foreground">
              Contact Links
            </span>
            <span className="text-[10px] text-muted-foreground">
              (Optional)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email */}
            <div className="space-y-1">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <Mail className="h-3 w-3 text-muted-foreground" />
                Email
              </Label>
              <Input
                value={profile.email}
                onChange={(e) => updateProfile("email", e.target.value)}
                placeholder="faculty@dypcet.ac.in"
                className="rounded-xl text-sm h-9"
                data-ocid="teacher.profile.email.input"
                type="email"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-1">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <Linkedin className="h-3 w-3 text-muted-foreground" />
                LinkedIn
              </Label>
              <div className="flex gap-2">
                <Input
                  value={profile.linkedin}
                  onChange={(e) => updateProfile("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="rounded-xl text-sm h-9 flex-1"
                  data-ocid="teacher.profile.linkedin.input"
                />
                {profile.linkedin && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl h-9 w-9 shrink-0"
                    onClick={() => window.open(profile.linkedin, "_blank")}
                    data-ocid="teacher.profile.linkedin_visit.button"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* GitHub */}
            <div className="space-y-1">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <Github className="h-3 w-3 text-muted-foreground" />
                GitHub
              </Label>
              <div className="flex gap-2">
                <Input
                  value={profile.github}
                  onChange={(e) => updateProfile("github", e.target.value)}
                  placeholder="https://github.com/username"
                  className="rounded-xl text-sm h-9 flex-1"
                  data-ocid="teacher.profile.github.input"
                />
                {profile.github && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl h-9 w-9 shrink-0"
                    onClick={() => window.open(profile.github, "_blank")}
                    data-ocid="teacher.profile.github_visit.button"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Portfolio */}
            <div className="space-y-1">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <Globe className="h-3 w-3 text-muted-foreground" />
                Portfolio Website
              </Label>
              <div className="flex gap-2">
                <Input
                  value={profile.portfolio}
                  onChange={(e) => updateProfile("portfolio", e.target.value)}
                  placeholder="https://yoursite.com"
                  className="rounded-xl text-sm h-9 flex-1"
                  data-ocid="teacher.profile.portfolio.input"
                />
                {profile.portfolio && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl h-9 w-9 shrink-0"
                    onClick={() => window.open(profile.portfolio, "_blank")}
                    data-ocid="teacher.profile.portfolio_visit.button"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Live contact chips */}
          {(profile.email ||
            profile.linkedin ||
            profile.github ||
            profile.portfolio) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-700"
                >
                  <Mail className="h-3 w-3" />
                  {profile.email}
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-700"
                >
                  <Linkedin className="h-3 w-3" />
                  LinkedIn
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors dark:bg-gray-950/40 dark:text-gray-400 dark:border-gray-700"
                >
                  <Github className="h-3 w-3" />
                  GitHub
                </a>
              )}
              {profile.portfolio && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-700"
                >
                  <Globe className="h-3 w-3" />
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>

        <Button
          size="sm"
          className="rounded-xl gap-1.5 text-xs bg-amber-500 hover:bg-amber-600 text-white border-0"
          onClick={saveProfile}
          data-ocid="teacher.profile.save.button"
        >
          <Save className="h-3.5 w-3.5" />
          Save Profile
        </Button>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Student Doubts */}
        <motion.div
          className="neo-card p-4 lg:col-span-2 space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.38 }}
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
            transition={{ duration: 0.35, delay: 0.44 }}
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
            transition={{ duration: 0.35, delay: 0.5 }}
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
