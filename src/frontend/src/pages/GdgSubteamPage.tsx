import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Code, Crown, FileText, Megaphone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

interface Props {
  subteamSlug: string;
  onNavigate: (path: string) => void;
}

// ── Team Config ──────────────────────────────────────────────────────────────

interface SubteamConfig {
  name: string;
  color: string;
  description: string;
  icon: React.ElementType;
}

const GDG_TEAMS: Record<string, SubteamConfig> = {
  "technical-team": {
    name: "Technical Team",
    color: "#22c55e",
    description:
      "Building cutting-edge solutions and technical projects for the GDG community",
    icon: Code,
  },
  "pr-team": {
    name: "PR Team",
    color: "#10b981",
    description:
      "Crafting our story and amplifying GDG's voice across platforms",
    icon: Megaphone,
  },
  "documentation-team": {
    name: "Documentation Team",
    color: "#84cc16",
    description: "Capturing knowledge and creating guides for the community",
    icon: FileText,
  },
  "management-team": {
    name: "Management Team",
    color: "#4ade80",
    description:
      "Leading the chapter and driving its vision forward with excellence",
    icon: Crown,
  },
};

// ── Member Data ──────────────────────────────────────────────────────────────

interface Member {
  name: string;
  role: string;
}

const TEAM_MEMBERS: Record<string, Member[]> = {
  "technical-team": [
    { name: "Arjun Sharma", role: "Lead Developer" },
    { name: "Priya Patel", role: "Backend Dev" },
    { name: "Rohit Desai", role: "Frontend Dev" },
    { name: "Sneha Kulkarni", role: "DevOps Engineer" },
    { name: "Amit Joshi", role: "Mobile Dev" },
  ],
  "pr-team": [
    { name: "Neha Gupta", role: "PR Lead" },
    { name: "Varun Mehta", role: "Content Strategist" },
    { name: "Kavya Nair", role: "Social Media Manager" },
    { name: "Rahul Singh", role: "Brand Ambassador" },
    { name: "Pooja Verma", role: "Community Liaison" },
  ],
  "documentation-team": [
    { name: "Siddharth Rao", role: "Docs Lead" },
    { name: "Ananya Iyer", role: "Technical Writer" },
    { name: "Kiran Patil", role: "Content Editor" },
    { name: "Divya Sharma", role: "Knowledge Manager" },
    { name: "Vikram Tiwari", role: "Wiki Curator" },
  ],
  "management-team": [
    { name: "Aditya Kumar", role: "Chairperson" },
    { name: "Ishaan Mishra", role: "Vice Chair" },
    { name: "Riya Bhatt", role: "Secretary" },
    { name: "Suresh Nair", role: "Treasurer" },
    { name: "Tanvi Reddy", role: "Event Coordinator" },
  ],
};

// ── Floating Computers Canvas ────────────────────────────────────────────────

interface Computer {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  colorIdx: number;
}

const GREEN_COLORS = ["#22c55e", "#4ade80", "#86efac", "#16a34a", "#15803d"];

function drawComputer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  opacity: number,
  colorIndex: number,
) {
  const color = GREEN_COLORS[colorIndex % GREEN_COLORS.length];
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-7, -6, 14, 10, 1.5);
  ctx.fill();

  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.roundRect(-5.5, -4.5, 11, 7, 1);
  ctx.fill();

  ctx.fillStyle = "#a7f3d0";
  ctx.beginPath();
  ctx.roundRect(-3, -3, 6, 4, 0.5);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.fillRect(-2, 4, 4, 3);

  ctx.beginPath();
  ctx.roundRect(-5, 7, 10, 2, 1);
  ctx.fill();

  ctx.restore();
}

function FloatingComputersCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const computersRef = useRef<Computer[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initComputers = (w: number, h: number) => {
      computersRef.current = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.55,
        scale: 0.8 + Math.random() * 1.0,
        opacity: 0.18 + Math.random() * 0.27,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        colorIdx: i % GREEN_COLORS.length,
      }));
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect?.width ?? window.innerWidth;
      const h = rect?.height ?? window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initComputers(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const comp of computersRef.current) {
        comp.x += comp.vx;
        comp.y += comp.vy;
        comp.rotation += comp.rotSpeed;

        if (comp.x < -20) comp.x = w + 20;
        if (comp.x > w + 20) comp.x = -20;
        if (comp.y < -20) comp.y = h + 20;
        if (comp.y > h + 20) comp.y = -20;

        ctx.save();
        ctx.translate(comp.x, comp.y);
        ctx.rotate(comp.rotation);
        ctx.translate(-comp.x, -comp.y);
        drawComputer(
          ctx,
          comp.x,
          comp.y,
          comp.scale,
          comp.opacity,
          comp.colorIdx,
        );
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function GdgSubteamPage({ subteamSlug, onNavigate }: Props) {
  const { isDark } = useTheme();

  const team = GDG_TEAMS[subteamSlug] ?? GDG_TEAMS["technical-team"];
  const members = TEAM_MEMBERS[subteamSlug] ?? TEAM_MEMBERS["technical-team"];
  const TeamIcon = team.icon;

  const pageBg = isDark
    ? "linear-gradient(160deg, #030f07 0%, #071a0e 50%, #0a2410 100%)"
    : "linear-gradient(160deg, #f0fdf4 0%, #f7fef9 50%, #ecfdf5 100%)";

  const heroGradient = isDark
    ? "linear-gradient(160deg, #052e16 0%, #14532d 50%, #166534 100%)"
    : "linear-gradient(160deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 100%)";

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  };

  return (
    <AnimatePresence>
      <div
        className="py-5 px-1 max-w-4xl relative min-h-screen"
        style={{ background: pageBg }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl"
          style={{ zIndex: 0 }}
        >
          <FloatingComputersCanvas />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,5 55,50 5,50' fill='%2316a34a' /%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative" style={{ zIndex: 1 }}>
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("/club/gdg")}
            className="gap-1.5 mb-4 rounded-xl text-sm hover:text-foreground"
            style={{ color: isDark ? "#4ade80" : "#16a34a" }}
            data-ocid="gdg.subteam.back.button"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to GDG
          </Button>

          {/* Hero */}
          <motion.div
            className="rounded-3xl p-6 mb-6 relative overflow-hidden"
            style={{ background: heroGradient }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Triangle decorations */}
            <div
              className="absolute -top-4 -right-4 opacity-15"
              style={{
                width: 100,
                height: 100,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                background: "#16a34a",
              }}
            />
            <div
              className="absolute bottom-2 left-6 opacity-10"
              style={{
                width: 70,
                height: 70,
                clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                background: team.color,
              }}
            />
            <div
              className="absolute top-1/2 right-16 -translate-y-1/2 opacity-20"
              style={{
                width: 40,
                height: 40,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                background: team.color,
              }}
            />
            <div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-15"
              style={{ border: `2px solid ${team.color}` }}
            />

            <div className="relative z-10 flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: isDark ? `${team.color}33` : `${team.color}22`,
                  border: `1px solid ${team.color}4d`,
                }}
              >
                <TeamIcon className="h-7 w-7" style={{ color: team.color }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{
                      color: isDark ? "#4ade80" : "#16a34a",
                      opacity: 0.8,
                    }}
                  >
                    GDG Team
                  </p>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${team.color}30`,
                      color: team.color,
                    }}
                  >
                    5 Members
                  </span>
                </div>
                <h1
                  className="font-display font-bold text-2xl leading-tight"
                  style={{ color: isDark ? "#f0fdf4" : "#14532d" }}
                >
                  {team.name}
                </h1>
                <p
                  className="text-sm mt-1 max-w-lg"
                  style={{
                    color: isDark ? "#86efac" : "#166534",
                    opacity: 0.85,
                  }}
                >
                  {team.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Members Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="opacity-60"
                style={{
                  width: 14,
                  height: 14,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: isDark ? "#4ade80" : "#16a34a",
                  flexShrink: 0,
                }}
              />
              <h2
                className="font-display font-bold text-base"
                style={{ color: isDark ? "#f0fdf4" : "#14532d" }}
              >
                Team Members
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {members.map((member, idx) => (
                <motion.div
                  key={member.name}
                  className="rounded-2xl p-4 text-center relative overflow-hidden"
                  style={{
                    background: isDark
                      ? `linear-gradient(135deg, ${team.color}18 0%, ${team.color}0a 100%)`
                      : `linear-gradient(135deg, ${team.color}14 0%, white 100%)`,
                    border: `1px solid ${team.color}${isDark ? "35" : "28"}`,
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.07 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  data-ocid={`gdg.subteam.member.card.${idx + 1}`}
                >
                  {/* Small triangle decoration */}
                  <div
                    className="absolute top-1.5 right-1.5 opacity-20"
                    style={{
                      width: 12,
                      height: 12,
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                      background: team.color,
                    }}
                  />

                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm"
                    style={{
                      background: `${team.color}30`,
                      color: team.color,
                      border: `2px solid ${team.color}50`,
                    }}
                  >
                    {getInitials(member.name)}
                  </div>

                  <p
                    className="font-semibold text-xs leading-tight mb-0.5"
                    style={{ color: isDark ? "#f0fdf4" : "#14532d" }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: isDark ? "#86efac" : "#166534",
                      opacity: 0.75,
                    }}
                  >
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
