import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft } from "lucide-react";
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
}

const ECELL_TEAMS: Record<string, SubteamConfig> = {
  "content-social": {
    name: "Content & Social Media Team",
    color: "#3b82f6",
    description:
      "Creating engaging content and managing our social presence across all platforms",
  },
  management: {
    name: "Management Team",
    color: "#2563eb",
    description:
      "Steering the entrepreneurship cell with vision and strategic excellence",
  },
  "design-tech": {
    name: "Design & Tech Team",
    color: "#60a5fa",
    description:
      "Designing innovative solutions and building digital tools for the startup ecosystem",
  },
  "film-media": {
    name: "Film & Media",
    color: "#93c5fd",
    description:
      "Capturing stories through film, photography, and creative media production",
  },
  documentation: {
    name: "Documentation Team",
    color: "#1d4ed8",
    description:
      "Recording our journey and creating comprehensive resources for entrepreneurs",
  },
  "corporate-relations": {
    name: "Corporate Relations Team",
    color: "#1e40af",
    description:
      "Building bridges between startups and industry leaders to create opportunities",
  },
  "pr-media": {
    name: "PR & Media Team",
    color: "#38bdf8",
    description:
      "Amplifying our impact through strategic communication and media outreach",
  },
};

// ── Member Data ──────────────────────────────────────────────────────────────

interface Member {
  name: string;
  role: string;
}

const TEAM_MEMBERS: Record<string, Member[]> = {
  "content-social": [
    { name: "Megha Sharma", role: "Content Lead" },
    { name: "Aryan Patel", role: "Social Media Manager" },
    { name: "Tanya Singh", role: "Copywriter" },
    { name: "Devraj Iyer", role: "Video Creator" },
    { name: "Prisha Kulkarni", role: "Graphic Designer" },
  ],
  management: [
    { name: "Aakash Mehta", role: "President" },
    { name: "Nidhi Verma", role: "Vice President" },
    { name: "Sahil Joshi", role: "Secretary" },
    { name: "Kritika Nair", role: "Treasurer" },
    { name: "Ankit Rao", role: "Operations Head" },
  ],
  "design-tech": [
    { name: "Yash Desai", role: "Tech Lead" },
    { name: "Simran Bhatt", role: "UI/UX Designer" },
    { name: "Rohan Gupta", role: "Full Stack Dev" },
    { name: "Anjali Tiwari", role: "App Developer" },
    { name: "Chetan Mishra", role: "Systems Architect" },
  ],
  "film-media": [
    { name: "Mansi Reddy", role: "Film Director" },
    { name: "Kartik Singh", role: "Cinematographer" },
    { name: "Pooja Sharma", role: "Video Editor" },
    { name: "Rahul Iyer", role: "Photographer" },
    { name: "Divya Patil", role: "Media Producer" },
  ],
  documentation: [
    { name: "Shreya Kumar", role: "Docs Lead" },
    { name: "Varun Nair", role: "Technical Writer" },
    { name: "Aditi Joshi", role: "Content Curator" },
    { name: "Nikhil Mehta", role: "Knowledge Manager" },
    { name: "Preeti Desai", role: "Research Analyst" },
  ],
  "corporate-relations": [
    { name: "Shivam Gupta", role: "Corp Relations Head" },
    { name: "Meera Verma", role: "Partnership Manager" },
    { name: "Arun Kulkarni", role: "Industry Liaison" },
    { name: "Sonali Rao", role: "Outreach Coordinator" },
    { name: "Vikrant Sharma", role: "Business Development" },
  ],
  "pr-media": [
    { name: "Ravi Patel", role: "PR Lead" },
    { name: "Ishita Singh", role: "Brand Manager" },
    { name: "Kush Bhatt", role: "Media Strategist" },
    { name: "Lavanya Iyer", role: "Communications Officer" },
    { name: "Saurabh Nair", role: "Public Affairs" },
  ],
};

// ── Floating Mortarboards Canvas ─────────────────────────────────────────────

interface Particle {
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

const BLUE_COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#2563eb", "#1d4ed8"];

function drawMortarboard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  opacity: number,
  color: string,
) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = color;
  ctx.fillRect(-9, -4, 18, 3);
  ctx.fillRect(-5, -1, 10, 5);

  ctx.beginPath();
  ctx.arc(0, -5.5, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, -5.5);
  ctx.lineTo(6, -2);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(6.5, -1.5, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function FloatingMortarboardsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = (w: number, h: number) => {
      particlesRef.current = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.55,
        scale: 0.8 + Math.random() * 1.0,
        opacity: 0.18 + Math.random() * 0.27,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        colorIdx: i % BLUE_COLORS.length,
      }));
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect?.width ?? window.innerWidth;
      const h = rect?.height ?? window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initParticles(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.x < -25) p.x = w + 25;
        if (p.x > w + 25) p.x = -25;
        if (p.y < -25) p.y = h + 25;
        if (p.y > h + 25) p.y = -25;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.translate(-p.x, -p.y);
        const color = BLUE_COLORS[p.colorIdx % BLUE_COLORS.length];
        drawMortarboard(ctx, p.x, p.y, p.scale, p.opacity, color);
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

export function ECellSubteamPage({ subteamSlug, onNavigate }: Props) {
  const { isDark } = useTheme();

  const team = ECELL_TEAMS[subteamSlug] ?? ECELL_TEAMS["content-social"];
  const members = TEAM_MEMBERS[subteamSlug] ?? TEAM_MEMBERS["content-social"];

  const pageBg = isDark
    ? "linear-gradient(160deg, #050f26 0%, #0c1a3a 50%, #0a1628 100%)"
    : "linear-gradient(160deg, #eff6ff 0%, #f0f7ff 50%, #e8f0fe 100%)";

  const heroGradient = isDark
    ? "linear-gradient(160deg, #0c1a3a 0%, #1e3a8a 50%, #1d4ed8 100%)"
    : "linear-gradient(160deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 100%)";

  const encodedColor = encodeURIComponent(team.color);

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
          <FloatingMortarboardsCanvas />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,5 55,50 5,50' fill='${encodedColor}' /%3E%3C/svg%3E")`,
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
            onClick={() => onNavigate("/club/e-cell")}
            className="gap-1.5 mb-4 rounded-xl text-sm hover:text-foreground"
            style={{ color: isDark ? "#60a5fa" : "#1d4ed8" }}
            data-ocid="ecell.subteam.back.button"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to E-Cell
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
                background: "#1d4ed8",
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
              className="absolute top-4 left-1/3 opacity-15"
              style={{
                width: 30,
                height: 30,
                clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                background: "#2563eb",
              }}
            />
            <div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-15"
              style={{ border: `2px solid ${team.color}` }}
            />

            <div className="relative z-10 flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg"
                style={{
                  background: isDark ? `${team.color}33` : `${team.color}22`,
                  border: `1px solid ${team.color}4d`,
                  color: team.color,
                }}
              >
                {team.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{
                      color: isDark ? "#60a5fa" : "#1d4ed8",
                      opacity: 0.8,
                    }}
                  >
                    E-Cell — Team
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
                  style={{ color: isDark ? "#eff6ff" : "#0c1a3a" }}
                >
                  {team.name}
                </h1>
                <p
                  className="text-sm mt-1 max-w-lg"
                  style={{
                    color: isDark ? "#bfdbfe" : "#1e40af",
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
                  background: isDark ? "#60a5fa" : "#1d4ed8",
                  flexShrink: 0,
                }}
              />
              <h2
                className="font-display font-bold text-base"
                style={{ color: isDark ? "#eff6ff" : "#0c1a3a" }}
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
                  data-ocid={`ecell.subteam.member.card.${idx + 1}`}
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
                    style={{ color: isDark ? "#eff6ff" : "#0c1a3a" }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: isDark ? "#bfdbfe" : "#1e40af",
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
