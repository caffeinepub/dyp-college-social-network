import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  Edit2,
  Megaphone,
  Plus,
  Settings,
  ShieldCheck,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

/* ============================================================
   MOCK DATA
============================================================ */
const STATS = [
  {
    label: "Total Students",
    value: "1,240",
    icon: <Users className="h-5 w-5" />,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800",
  },
  {
    label: "Active Events",
    value: "8",
    icon: <CalendarDays className="h-5 w-5" />,
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/40",
    border: "border-pink-200 dark:border-pink-800",
  },
  {
    label: "Clubs",
    value: "11",
    icon: <UserCheck className="h-5 w-5" />,
    color: "text-fuchsia-600 dark:text-fuchsia-400",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40",
    border: "border-fuchsia-200 dark:border-fuchsia-800",
  },
  {
    label: "Posts This Month",
    value: "34",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
  },
];

const RECENT_POSTS = [
  {
    title: "TECHNOTSAV 2K25 Cosmos of Innovation",
    category: "Announcement",
    club: "GDG",
    date: "Mar 15, 2026",
    status: "Published",
  },
  {
    title: "Dimension X Hackathon Registration",
    category: "Event",
    club: "E-Cell",
    date: "Mar 18, 2026",
    status: "Published",
  },
  {
    title: "Partial Lunar Eclipse - Astronomy Club",
    category: "Update",
    club: "General",
    date: "Mar 6, 2026",
    status: "Published",
  },
  {
    title: "ARPAN Annual Sports Meet",
    category: "Announcement",
    club: "SRC",
    date: "Mar 12, 2026",
    status: "Draft",
  },
  {
    title: "ECHO Got Talent Registration Open",
    category: "Event",
    club: "Music",
    date: "Feb 28, 2026",
    status: "Published",
  },
];

const EVENTS = [
  {
    name: "Dimension X Hackathon",
    date: "28 Mar 2026",
    registrations: 124,
    status: "Active",
  },
  {
    name: "TECHNOTSAV 2K25",
    date: "20 Mar 2026",
    registrations: 89,
    status: "Active",
  },
  {
    name: "ECHO Got Talent",
    date: "07 Mar 2026",
    registrations: 46,
    status: "Completed",
  },
  {
    name: "ARPAN Annual Gathering",
    date: "05 Apr 2026",
    registrations: 211,
    status: "Upcoming",
  },
];

const USERS = [
  {
    name: "Ananya Desai",
    role: "Student",
    year: "SY",
    branch: "CSE",
    status: "Active",
  },
  {
    name: "Rohit Sharma",
    role: "Student",
    year: "TY",
    branch: "Mechanical",
    status: "Active",
  },
  {
    name: "Prof. V. Kulkarni",
    role: "Faculty",
    year: "N/A",
    branch: "CSE",
    status: "Active",
  },
  {
    name: "Mehul Patil",
    role: "Club Member",
    year: "FY",
    branch: "Electronics",
    status: "Pending",
  },
  {
    name: "Sneha Joshi",
    role: "Student",
    year: "BTech",
    branch: "IT",
    status: "Active",
  },
];

/* ============================================================
   STATUS BADGE
============================================================ */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Published:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
    Draft:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
    Active:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800",
    Completed:
      "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-900/40 dark:text-gray-400 dark:border-gray-700",
    Upcoming:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800",
    Pending:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800",
  };
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border ${map[status] ?? map.Active}`}
    >
      {status}
    </span>
  );
}

/* ============================================================
   ADMIN DASHBOARD PAGE
============================================================ */
export function AdminDashboardPage() {
  return (
    <div
      className="max-w-5xl mx-auto px-3 py-5 space-y-6"
      data-ocid="admin.dashboard.page"
    >
      {/* Page Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-rose-100 dark:bg-rose-950/50">
            <ShieldCheck className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              DYP COET - Site Management
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-[11px] border-rose-300 text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-700 font-semibold"
        >
          Admin Access
        </Badge>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            data-ocid={`admin.stats.card.${i + 1}`}
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

      {/* Admin Actions */}
      <motion.div
        className="neo-card p-4 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.32 }}
      >
        <Button
          size="sm"
          className="rounded-xl gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs"
          data-ocid="admin.create_announcement.button"
        >
          <Megaphone className="h-3.5 w-3.5" />
          Create Announcement
        </Button>
        <Button
          size="sm"
          className="rounded-xl gap-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs"
          data-ocid="admin.add_event.button"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Event
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-xl gap-1.5 border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/30 text-xs"
          data-ocid="admin.manage_clubs.button"
        >
          <Settings className="h-3.5 w-3.5" />
          Manage Clubs
        </Button>
      </motion.div>

      {/* Recent Posts Table */}
      <motion.div
        className="neo-card overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.38 }}
      >
        <div className="px-5 py-3.5 border-b border-border/50">
          <h2 className="font-display font-bold text-sm text-foreground">
            Recent Posts
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Title
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                Category
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground hidden md:table-cell">
                Club
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                Date
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_POSTS.map((post, i) => (
              <TableRow
                key={post.title}
                data-ocid={`admin.posts.row.${i + 1}`}
                className="border-border/40"
              >
                <TableCell className="text-xs font-medium text-foreground max-w-[180px] truncate py-3">
                  {post.title}
                </TableCell>
                <TableCell className="hidden sm:table-cell py-3">
                  <StatusBadge status={post.category} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground hidden md:table-cell py-3">
                  {post.club}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground hidden sm:table-cell py-3">
                  {post.date}
                </TableCell>
                <TableCell className="py-3">
                  <StatusBadge status={post.status} />
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-lg hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
                      data-ocid={`admin.posts.edit_button.${i + 1}`}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                      data-ocid={`admin.posts.delete_button.${i + 1}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Event Management */}
      <motion.div
        className="neo-card overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.44 }}
      >
        <div className="px-5 py-3.5 border-b border-border/50">
          <h2 className="font-display font-bold text-sm text-foreground">
            Event Management
          </h2>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EVENTS.map((event, i) => (
            <div
              key={event.name}
              data-ocid={`admin.events.item.${i + 1}`}
              className="neo-inset p-3 rounded-xl flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {event.name}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {event.date} &bull; {event.registrations} registered
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <StatusBadge status={event.status} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-lg hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
                  data-ocid={`admin.events.edit_button.${i + 1}`}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                  data-ocid={`admin.events.delete_button.${i + 1}`}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* User Management */}
      <motion.div
        className="neo-card overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.5 }}
      >
        <div className="px-5 py-3.5 border-b border-border/50">
          <h2 className="font-display font-bold text-sm text-foreground">
            User Management
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Role
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                Year
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground hidden md:table-cell">
                Branch
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((user, i) => (
              <TableRow
                key={user.name}
                data-ocid={`admin.users.row.${i + 1}`}
                className="border-border/40"
              >
                <TableCell className="text-xs font-medium text-foreground py-3">
                  {user.name}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground py-3">
                  {user.role}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground hidden sm:table-cell py-3">
                  {user.year}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground hidden md:table-cell py-3">
                  {user.branch}
                </TableCell>
                <TableCell className="py-3">
                  <StatusBadge status={user.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
