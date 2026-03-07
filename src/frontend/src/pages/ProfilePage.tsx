import { EventActionButtons } from "@/components/shared/EventActionButtons";
import { StaticCountdown } from "@/components/shared/StaticCountdown";
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
  Award,
  Camera,
  Code2,
  Crown,
  ExternalLink,
  Flame,
  Github,
  Globe,
  ImagePlus,
  Link2,
  Linkedin,
  Lock,
  Mail,
  Plus,
  Save,
  Star,
  Trash2,
  UserCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

/* ============================================================
   TYPES
============================================================ */
interface Repo {
  id: string;
  name: string;
  description: string;
  tech: string;
}

interface ProfileData {
  fullName: string;
  role: string;
  branch: string;
  year: string;
  bio: string;
  githubLink: string;
  coverColor: string;
  avatarInitials: string;
  email: string;
  linkedin: string;
  portfolio: string;
}

const INITIAL_PROFILE: ProfileData = {
  fullName: "Ananya Desai",
  role: "student",
  branch: "cse",
  year: "sy",
  bio: "Passionate about web development and open source. GDG member and hackathon enthusiast. Always learning something new!",
  githubLink: "https://github.com/ananya-desai",
  coverColor: "from-blue-300 via-indigo-200 to-slate-200",
  avatarInitials: "AD",
  email: "",
  linkedin: "",
  portfolio: "",
};

const INITIAL_REPOS: Repo[] = [
  {
    id: "r1",
    name: "DYP-Attendance-Tracker",
    description:
      "A web app to track college attendance with analytics dashboard",
    tech: "React, Node.js",
  },
  {
    id: "r2",
    name: "Campus-Chat-App",
    description: "Real-time chat application for college students",
    tech: "React, WebSockets",
  },
];

const EVENTS_PARTICIPATED = [
  {
    name: "Dimension X Hackathon",
    date: "28 Mar 2026",
    dateMs: new Date("2026-03-28").getTime(),
    description: "National Level 24-Hour Open Innovation Hackathon",
    accentClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    name: "Cultural Fest / ECHO Got Talent",
    date: "07 Mar 2026",
    dateMs: new Date("2026-03-07").getTime(),
    description: "POV: Perspective of Voices - Cultural Talent Show at DYPCET",
    accentClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-50 dark:bg-purple-950/40",
  },
  {
    name: "TECHNOTSAV 2K25",
    date: "20 Mar 2026",
    dateMs: new Date("2026-03-20").getTime(),
    description: "National Level Technical Fest at DYPCET",
    accentClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/40",
  },
];

const MY_CLUBS = [
  {
    name: "GDG",
    color:
      "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-700",
  },
  {
    name: "E-Cell",
    color:
      "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-700",
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
   PROFILE PAGE
============================================================ */
export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem("dyp_profile");
      return saved ? (JSON.parse(saved) as ProfileData) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [repos, setRepos] = useState<Repo[]>(() => {
    try {
      const saved = localStorage.getItem("dyp_repos");
      return saved ? (JSON.parse(saved) as Repo[]) : INITIAL_REPOS;
    } catch {
      return INITIAL_REPOS;
    }
  });

  const [addRepoOpen, setAddRepoOpen] = useState(false);
  const [newRepo, setNewRepo] = useState({
    name: "",
    description: "",
    tech: "",
  });
  const coverInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const updateProfile = (key: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem("dyp_profile", JSON.stringify(profile));
    localStorage.setItem("dyp_repos", JSON.stringify(repos));
    toast.success("Profile saved successfully");
  };

  const addRepo = () => {
    if (!newRepo.name.trim()) {
      toast.error("Repository name is required");
      return;
    }
    const repo: Repo = {
      id: `r${Date.now()}`,
      ...newRepo,
    };
    setRepos((prev) => [...prev, repo]);
    setNewRepo({ name: "", description: "", tech: "" });
    setAddRepoOpen(false);
    toast.success("Repository added");
  };

  const removeRepo = (id: string) => {
    setRepos((prev) => prev.filter((r) => r.id !== id));
    toast.success("Repository removed");
  };

  const roleLabel: Record<string, string> = {
    student: "Student",
    faculty: "Faculty",
    club_member: "Club Member",
    admin: "Admin",
  };
  const branchLabel: Record<string, string> = {
    cse: "CSE",
    mechanical: "Mechanical",
    civil: "Civil",
    electronics: "Electronics",
    it: "IT",
  };
  const yearLabel: Record<string, string> = {
    fy: "FY",
    sy: "SY",
    ty: "TY",
    btech: "BTech",
    mtech: "MTech",
  };

  return (
    <div
      className="max-w-3xl mx-auto px-3 py-5 space-y-5"
      data-ocid="profile.page"
    >
      {/* Cover Photo Banner */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{ height: "200px" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`w-full h-full bg-gradient-to-br ${profile.coverColor}`}
        />
        <div className="absolute top-4 right-8 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-12 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2" />

        <button
          type="button"
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all"
          onClick={() => coverInputRef.current?.click()}
          data-ocid="profile.edit_cover.button"
        >
          <ImagePlus className="h-3 w-3" />
          Edit Cover
        </button>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={() => toast.info("Cover photo update coming soon")}
        />
      </motion.div>

      {/* Profile Identity Section */}
      <motion.div
        className="neo-card p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #f472b6, #ec4899, #be185d)",
              }}
            >
              {profile.avatarInitials || <UserCircle className="h-10 w-10" />}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
              onClick={() => photoInputRef.current?.click()}
              data-ocid="profile.edit_photo.button"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => toast.info("Photo upload coming soon")}
            />
          </div>

          {/* Fields grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {/* Full Name */}
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-xs font-medium">Full Name</Label>
              <Input
                value={profile.fullName}
                onChange={(e) => updateProfile("fullName", e.target.value)}
                placeholder="Your full name"
                className="rounded-xl text-sm h-9"
                data-ocid="profile.name.input"
              />
            </div>

            {/* Role */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Role</Label>
              <Select
                value={profile.role}
                onValueChange={(v) => updateProfile("role", v)}
              >
                <SelectTrigger
                  className="rounded-xl h-9 text-sm"
                  data-ocid="profile.role.select"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="neo-card border-0">
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="club_member">Club Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Branch */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Branch / Department</Label>
              <Select
                value={profile.branch}
                onValueChange={(v) => updateProfile("branch", v)}
              >
                <SelectTrigger
                  className="rounded-xl h-9 text-sm"
                  data-ocid="profile.branch.select"
                >
                  <SelectValue placeholder="Select branch" />
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

            {/* Year */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Year</Label>
              <Select
                value={profile.year}
                onValueChange={(v) => updateProfile("year", v)}
              >
                <SelectTrigger
                  className="rounded-xl h-9 text-sm"
                  data-ocid="profile.year.select"
                >
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="neo-card border-0">
                  <SelectItem value="fy">FY</SelectItem>
                  <SelectItem value="sy">SY</SelectItem>
                  <SelectItem value="ty">TY</SelectItem>
                  <SelectItem value="btech">BTech</SelectItem>
                  <SelectItem value="mtech">MTech</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bio */}
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-xs font-medium">Short Bio</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => updateProfile("bio", e.target.value)}
                placeholder="Write a short bio about yourself..."
                className="rounded-xl text-sm resize-none min-h-[80px]"
                data-ocid="profile.bio.textarea"
              />
            </div>

            {/* Identity chips */}
            <div className="sm:col-span-2 flex flex-wrap gap-1.5">
              {profile.role && (
                <Badge
                  variant="outline"
                  className="text-[11px] rounded-full px-2.5 border-primary/40 text-primary bg-primary/8"
                >
                  {roleLabel[profile.role] ?? profile.role}
                </Badge>
              )}
              {profile.branch && (
                <Badge
                  variant="outline"
                  className="text-[11px] rounded-full px-2.5 border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-700"
                >
                  {branchLabel[profile.branch] ?? profile.branch}
                </Badge>
              )}
              {profile.year && (
                <Badge
                  variant="outline"
                  className="text-[11px] rounded-full px-2.5 border-slate-300 text-slate-600 bg-slate-50 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-600"
                >
                  {yearLabel[profile.year] ?? profile.year}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <Button
            size="sm"
            className="rounded-xl gap-1.5 text-xs"
            onClick={saveProfile}
            data-ocid="profile.save.button"
          >
            <Save className="h-3.5 w-3.5" />
            Save Profile
          </Button>
        </div>
      </motion.div>

      {/* Contact Links */}
      <motion.div
        className="neo-card p-5 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.13 }}
      >
        <div className="flex items-center gap-2">
          <Link2 className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold text-sm text-foreground">
            Contact Links
          </h2>
          <span className="text-[10px] text-muted-foreground ml-1">
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
              placeholder="you@example.com"
              className="rounded-xl text-sm h-9"
              data-ocid="profile.email.input"
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
                data-ocid="profile.linkedin.input"
              />
              {profile.linkedin && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl h-9 w-9 shrink-0"
                  onClick={() => window.open(profile.linkedin, "_blank")}
                  data-ocid="profile.linkedin_visit.button"
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
                value={profile.githubLink}
                onChange={(e) => updateProfile("githubLink", e.target.value)}
                placeholder="https://github.com/username"
                className="rounded-xl text-sm h-9 flex-1"
                data-ocid="profile.github_link.input"
              />
              {profile.githubLink && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl h-9 w-9 shrink-0"
                  onClick={() => window.open(profile.githubLink, "_blank")}
                  data-ocid="profile.github_visit.button"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Portfolio Website */}
          <div className="space-y-1">
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <Globe className="h-3 w-3 text-muted-foreground" />
              Portfolio Website
            </Label>
            <div className="flex gap-2">
              <Input
                value={profile.portfolio}
                onChange={(e) => updateProfile("portfolio", e.target.value)}
                placeholder="https://yourportfolio.dev"
                className="rounded-xl text-sm h-9 flex-1"
                data-ocid="profile.portfolio.input"
              />
              {profile.portfolio && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl h-9 w-9 shrink-0"
                  onClick={() => window.open(profile.portfolio, "_blank")}
                  data-ocid="profile.portfolio_visit.button"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Live contact link chips (shown when filled) */}
        {(profile.email ||
          profile.linkedin ||
          profile.githubLink ||
          profile.portfolio) && (
          <div className="pt-2 flex flex-wrap gap-2">
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
            {profile.githubLink && (
              <a
                href={profile.githubLink}
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

        <div className="pt-1">
          <Button
            size="sm"
            className="rounded-xl gap-1.5 text-xs"
            onClick={saveProfile}
            data-ocid="profile.contact_save.button"
          >
            <Save className="h-3.5 w-3.5" />
            Save Links
          </Button>
        </div>
      </motion.div>

      {/* Events Participated */}
      <motion.div
        className="neo-card p-5 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.18 }}
      >
        <h2 className="font-display font-bold text-sm text-foreground">
          Events Participated
        </h2>
        {EVENTS_PARTICIPATED.map((event, i) => (
          <div
            key={event.name}
            data-ocid={`profile.events.item.${i + 1}`}
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
              accentClass={event.accentClass}
              bgClass={event.bgClass}
            />
            <EventActionButtons
              title={event.name}
              description={event.description}
              dateMs={event.dateMs}
            />
          </div>
        ))}
      </motion.div>

      {/* GitHub Projects */}
      <motion.div
        className="neo-card p-5 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.22 }}
      >
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4 text-foreground" />
          <h2 className="font-display font-bold text-sm text-foreground">
            GitHub Projects
          </h2>
        </div>

        {/* Repo List */}
        <div className="space-y-2">
          {repos.map((repo, i) => (
            <div
              key={repo.id}
              data-ocid={`profile.repo.item.${i + 1}`}
              className="neo-inset p-3 rounded-xl flex items-start justify-between gap-2"
            >
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <p className="text-xs font-bold text-foreground truncate">
                    {repo.name}
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {repo.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {repo.tech.split(",").map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 shrink-0"
                onClick={() => removeRepo(repo.id)}
                data-ocid={`profile.repo.delete_button.${i + 1}`}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add Repo */}
        {addRepoOpen ? (
          <motion.div
            className="neo-inset p-3 rounded-xl space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
          >
            <Input
              placeholder="Repository name"
              value={newRepo.name}
              onChange={(e) =>
                setNewRepo((p) => ({ ...p, name: e.target.value }))
              }
              className="rounded-xl text-sm h-8"
            />
            <Input
              placeholder="Short description"
              value={newRepo.description}
              onChange={(e) =>
                setNewRepo((p) => ({ ...p, description: e.target.value }))
              }
              className="rounded-xl text-sm h-8"
            />
            <Input
              placeholder="Tech stack (e.g. React, Node.js)"
              value={newRepo.tech}
              onChange={(e) =>
                setNewRepo((p) => ({ ...p, tech: e.target.value }))
              }
              className="rounded-xl text-sm h-8"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                className="rounded-xl text-xs"
                onClick={addRepo}
                data-ocid="profile.repo.add_confirm.button"
              >
                Add Repository
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-xl text-xs"
                onClick={() => setAddRepoOpen(false)}
                data-ocid="profile.repo.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-1.5 text-xs border-dashed"
            onClick={() => setAddRepoOpen(true)}
            data-ocid="profile.add_repo.button"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Repository
          </Button>
        )}
      </motion.div>

      {/* Clubs / Communities Joined */}
      <motion.div
        className="neo-card p-5 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.28 }}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display font-bold text-sm text-foreground">
            Clubs / Communities Joined
          </h2>
          <button
            type="button"
            className="text-[11px] text-primary font-medium hover:underline"
            onClick={() => toast.info("Navigate to Clubs section")}
            data-ocid="profile.browse_clubs.button"
          >
            Browse Clubs
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {MY_CLUBS.map((club) => (
            <span
              key={club.name}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${club.color}`}
            >
              {club.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Badges / Recognition */}
      <motion.div
        className="neo-card p-5 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.34 }}
      >
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold text-sm text-foreground">
            Badges / Recognition
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES.map((badge, i) => (
            <div
              key={badge.name}
              data-ocid={`profile.badges.item.${i + 1}`}
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
