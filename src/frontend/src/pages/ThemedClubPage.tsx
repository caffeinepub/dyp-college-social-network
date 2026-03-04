import type { Club } from "@/backend";
import { PostCard } from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CLUBS_CONFIG } from "@/config/clubs";
import { useTheme } from "@/contexts/ThemeContext";
import { useAllClubs, usePostsByClub } from "@/hooks/useQueries";
import { ArrowLeft, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

// ─── Theme definitions ────────────────────────────────────────────────────────

export interface ClubTheme {
  primary: string;
  mid: string;
  light: string;
  darkBg: string;
  lightBg: string;
  darkHero: string;
  lightHero: string;
  accentColors: string[];
}

export const CLUB_THEMES: Record<string, ClubTheme> = {
  "e-cell": {
    primary: "#3b82f6",
    mid: "#2563eb",
    light: "#bfdbfe",
    darkBg: "#0c1a3a",
    lightBg: "#eff6ff",
    darkHero: "linear-gradient(160deg, #0c1a3a 0%, #1e3a8a 50%, #1d4ed8 100%)",
    lightHero: "linear-gradient(160deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 100%)",
    accentColors: ["#3b82f6", "#60a5fa", "#93c5fd", "#2563eb", "#1d4ed8"],
  },
  "official-theatre": {
    primary: "#ef4444",
    mid: "#dc2626",
    light: "#fecaca",
    darkBg: "#3a0c0c",
    lightBg: "#fef2f2",
    darkHero: "linear-gradient(160deg, #3a0c0c 0%, #7f1d1d 50%, #991b1b 100%)",
    lightHero: "linear-gradient(160deg, #fef2f2 0%, #fee2e2 40%, #fecaca 100%)",
    accentColors: ["#ef4444", "#f87171", "#fca5a5", "#dc2626", "#b91c1c"],
  },
  "official-dance": {
    primary: "#eab308",
    mid: "#ca8a04",
    light: "#fef08a",
    darkBg: "#2a1f00",
    lightBg: "#fefce8",
    darkHero: "linear-gradient(160deg, #2a1f00 0%, #713f12 50%, #92400e 100%)",
    lightHero: "linear-gradient(160deg, #fefce8 0%, #fef9c3 40%, #fef08a 100%)",
    accentColors: ["#eab308", "#facc15", "#fde047", "#ca8a04", "#a16207"],
  },
  ncc: {
    primary: "#22c55e",
    mid: "#16a34a",
    light: "#fed7aa",
    darkBg: "#0a1f0f",
    lightBg: "#f0fdf4",
    darkHero:
      "linear-gradient(160deg, #0a1f0f 0%, #14532d 40%, #1a3a10 70%, #7c2d12 100%)",
    lightHero:
      "linear-gradient(160deg, #f0fdf4 0%, #dcfce7 40%, #fff7ed 70%, #fed7aa 100%)",
    accentColors: ["#22c55e", "#f97316", "#ffffff", "#16a34a", "#ea580c"],
  },
  "official-music": {
    primary: "#f97316",
    mid: "#ea580c",
    light: "#fed7aa",
    darkBg: "#2a0f00",
    lightBg: "#fff7ed",
    darkHero: "linear-gradient(160deg, #2a0f00 0%, #7c2d12 50%, #9a3412 100%)",
    lightHero: "linear-gradient(160deg, #fff7ed 0%, #ffedd5 40%, #fed7aa 100%)",
    accentColors: ["#f97316", "#fb923c", "#fdba74", "#ea580c", "#c2410c"],
  },
  "student-council": {
    primary: "#9f1239",
    mid: "#881337",
    light: "#fecdd3",
    darkBg: "#1f0009",
    lightBg: "#fff1f2",
    darkHero: "linear-gradient(160deg, #1f0009 0%, #4c0519 50%, #6b0020 100%)",
    lightHero: "linear-gradient(160deg, #fff1f2 0%, #ffe4e6 40%, #fecdd3 100%)",
    accentColors: ["#9f1239", "#be123c", "#e11d48", "#881337", "#fb7185"],
  },
  "general-clubs": {
    primary: "#a855f7",
    mid: "#7e22ce",
    light: "#e9d5ff",
    darkBg: "#1a0030",
    lightBg: "#faf5ff",
    darkHero: "linear-gradient(160deg, #1a0030 0%, #3b0764 50%, #4c1d95 100%)",
    lightHero: "linear-gradient(160deg, #faf5ff 0%, #f3e8ff 40%, #e9d5ff 100%)",
    accentColors: ["#a855f7", "#c084fc", "#d8b4fe", "#7e22ce", "#6b21a8"],
  },
  nss: {
    primary: "#06b6d4",
    mid: "#0e7490",
    light: "#a5f3fc",
    darkBg: "#001f26",
    lightBg: "#ecfeff",
    darkHero: "linear-gradient(160deg, #001f26 0%, #164e63 50%, #155e75 100%)",
    lightHero: "linear-gradient(160deg, #ecfeff 0%, #cffafe 40%, #a5f3fc 100%)",
    accentColors: ["#06b6d4", "#22d3ee", "#67e8f9", "#0e7490", "#0891b2"],
  },
  src: {
    primary: "#1e40af",
    mid: "#1e3a8a",
    light: "#bfdbfe",
    darkBg: "#050f26",
    lightBg: "#eff6ff",
    darkHero: "linear-gradient(160deg, #050f26 0%, #1e3a8a 50%, #1e40af 100%)",
    lightHero: "linear-gradient(160deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 100%)",
    accentColors: ["#1e40af", "#2563eb", "#3b82f6", "#1e3a8a", "#1d4ed8"],
  },
  faculty: {
    primary: "#ca8a04",
    mid: "#92400e",
    light: "#fef3c7",
    darkBg: "#1a1000",
    lightBg: "#fffbeb",
    darkHero: "linear-gradient(160deg, #1a1000 0%, #78350f 50%, #92400e 100%)",
    lightHero: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)",
    accentColors: ["#ca8a04", "#d97706", "#f59e0b", "#92400e", "#fbbf24"],
  },
};

// ─── Particle interface ───────────────────────────────────────────────────────

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

// ─── Per-club draw functions ──────────────────────────────────────────────────

/** E-Cell: Mortarboard / graduation hat */
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

  // Cap top (flat board)
  ctx.fillStyle = color;
  ctx.fillRect(-9, -4, 18, 3);

  // Cap body (below the board)
  ctx.fillStyle = color;
  ctx.fillRect(-5, -1, 10, 5);

  // Button on top center
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, -5.5, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Tassel (diagonal line + ball)
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

/** Official Theatre: Comedy/Tragedy masks */
function drawTheatreMasks(
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

  // Comedy mask (left, smiling)
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.fillStyle = `${color}33`;
  ctx.beginPath();
  ctx.ellipse(-4.5, 0, 5.5, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Comedy eyes
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(-6.2, -1.5, 0.9, 0, Math.PI * 2);
  ctx.arc(-2.8, -1.5, 0.9, 0, Math.PI * 2);
  ctx.fill();
  // Comedy smile (arc up)
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(-4.5, 1.5, 2.5, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();

  // Tragedy mask (right, frowning)
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.fillStyle = `${color}22`;
  ctx.beginPath();
  ctx.ellipse(4.5, 0, 5.5, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Tragedy eyes (sad shape)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(2.8, -1.5, 0.9, 0, Math.PI * 2);
  ctx.arc(6.2, -1.5, 0.9, 0, Math.PI * 2);
  ctx.fill();
  // Tragedy frown (arc down)
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(4.5, 3.5, 2.5, 1.1 * Math.PI, 1.9 * Math.PI);
  ctx.stroke();

  ctx.restore();
}

/** Official Dance: Circles (filled + ring) */
function drawCircles(
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

  // Large ring
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.stroke();

  // Medium filled circle (offset)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(3, 2, 4, 0, Math.PI * 2);
  ctx.fill();

  // Small ring (accent)
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = opacity * 0.6;
  ctx.beginPath();
  ctx.arc(-5, -4, 2.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/** NCC: Small flag on a pole */
function drawFlag(
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

  // Pole (vertical rectangle)
  ctx.fillStyle = color;
  ctx.fillRect(-1, -8, 2, 16);

  // Flag body (rectangle on right of pole)
  ctx.fillStyle = color;
  ctx.fillRect(1, -8, 11, 7);

  // Stripe detail on flag
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fillRect(1, -5.5, 11, 2);

  // Flagpole base
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 8, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/** Official Music: Eighth note */
function drawMusicNote(
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

  // Note head (filled oval, tilted)
  ctx.fillStyle = color;
  ctx.save();
  ctx.translate(-2, 5);
  ctx.rotate(-0.4);
  ctx.beginPath();
  ctx.ellipse(0, 0, 3.5, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Stem (vertical line from note head)
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(1.2, 4.2);
  ctx.lineTo(1.2, -6);
  ctx.stroke();

  // Flag on stem top
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(1.2, -6);
  ctx.bezierCurveTo(8, -6, 9, -2, 5, 0);
  ctx.stroke();

  ctx.restore();
}

/** Student Council: Pen / pencil */
function drawPen(
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
  ctx.rotate(-Math.PI / 6); // slight tilt

  // Pencil body (long rectangle)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-2, -9, 4, 14, 0.5);
  ctx.fill();

  // Pencil tip (triangle)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-2, 5);
  ctx.lineTo(2, 5);
  ctx.lineTo(0, 10);
  ctx.closePath();
  ctx.fill();

  // Tip point
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.moveTo(-0.8, 7.5);
  ctx.lineTo(0.8, 7.5);
  ctx.lineTo(0, 10);
  ctx.closePath();
  ctx.fill();

  // Eraser (small rect at top)
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillRect(-2, -11, 4, 3);

  // Band between eraser and body
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(-2, -9.5, 4, 1.2);

  // Highlight stripe on body
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(-0.5, -9, 1, 14);

  ctx.restore();
}

/** General Clubs: Paintbrush */
function drawPaintbrush(
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
  ctx.rotate(Math.PI / 8); // slight tilt

  // Handle (long thin rectangle)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-1.5, -10, 3, 13, 0.8);
  ctx.fill();

  // Ferrule (metal band)
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillRect(-2, 2, 4, 2.5);

  // Bristle tip (tapered triangle)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-2.5, 4.5);
  ctx.lineTo(2.5, 4.5);
  ctx.lineTo(0, 10);
  ctx.closePath();
  ctx.fill();

  // Highlight on handle
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.roundRect(-0.5, -10, 1, 13, 0.5);
  ctx.fill();

  ctx.restore();
}

/** NSS: Tent */
function drawTent(
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

  // Main tent body (large triangle)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(-10, 6);
  ctx.lineTo(10, 6);
  ctx.closePath();
  ctx.fill();

  // Left tent panel slightly lighter
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(-10, 6);
  ctx.lineTo(0, 6);
  ctx.closePath();
  ctx.fill();

  // Door entrance cutout
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.moveTo(-2.5, 6);
  ctx.lineTo(-2.5, 1);
  ctx.arc(0, 1, 2.5, Math.PI, 0);
  ctx.lineTo(2.5, 6);
  ctx.closePath();
  ctx.fill();

  // Ground line
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-11, 6);
  ctx.lineTo(11, 6);
  ctx.stroke();

  // Ridge pole line at top
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(0, 6);
  ctx.stroke();

  ctx.restore();
}

/** SRC: Football / soccer ball */
function drawFootball(
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

  // Ball outline
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.fillStyle = `${color}22`;
  ctx.beginPath();
  ctx.arc(0, 0, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Central pentagon patch
  ctx.fillStyle = color;
  const pentR = 3.5;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    if (i === 0) ctx.moveTo(pentR * Math.cos(angle), pentR * Math.sin(angle));
    else ctx.lineTo(pentR * Math.cos(angle), pentR * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();

  // Surrounding hex/patch lines (curved seams)
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const nx = 7 * Math.cos(angle);
    const ny = 7 * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(pentR * Math.cos(angle), pentR * Math.sin(angle));
    ctx.lineTo(nx, ny);
    ctx.stroke();
  }

  ctx.restore();
}

/** Faculty: Book */
function drawBook(
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

  // Book cover (main rectangle)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-8, -9, 16, 18, 1.5);
  ctx.fill();

  // Spine (slightly darker strip on left)
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.roundRect(-8, -9, 3.5, 18, [1.5, 0, 0, 1.5]);
  ctx.fill();

  // Pages (white area on right of spine)
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  ctx.roundRect(-4, -8, 11.5, 16, [0, 1, 1, 0]);
  ctx.fill();

  // Text lines on pages
  ctx.fillStyle = `${color}55`;
  for (let i = 0; i < 5; i++) {
    const lineY = -5 + i * 3;
    const lineW = i === 2 ? 7 : 9; // shorter middle line for variety
    ctx.fillRect(-3, lineY, lineW, 1);
  }

  // Bookmark ribbon
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(3, -9);
  ctx.lineTo(5.5, -9);
  ctx.lineTo(5.5, -3);
  ctx.lineTo(4.25, -4.5);
  ctx.lineTo(3, -3);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// ─── FloatingSymbolsCanvas ─────────────────────────────────────────────────────

interface SymbolCanvasProps {
  slug: string;
  colors: string[];
}

type DrawFn = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  opacity: number,
  color: string,
) => void;

function getDrawFn(slug: string): DrawFn {
  switch (slug) {
    case "e-cell":
      return drawMortarboard;
    case "official-theatre":
      return drawTheatreMasks;
    case "official-dance":
      return drawCircles;
    case "ncc":
      return drawFlag;
    case "official-music":
      return drawMusicNote;
    case "student-council":
      return drawPen;
    case "general-clubs":
      return drawPaintbrush;
    case "nss":
      return drawTent;
    case "src":
      return drawFootball;
    case "faculty":
      return drawBook;
    default:
      return drawMortarboard;
  }
}

function FloatingSymbolsCanvas({ slug, colors }: SymbolCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const colorsRef = useRef<string[]>(colors);
  colorsRef.current = colors;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFn = getDrawFn(slug);

    const initParticles = (w: number, h: number) => {
      const count = 20;
      particlesRef.current = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.55,
        scale: 0.8 + Math.random() * 1.0,
        opacity: 0.18 + Math.random() * 0.27,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        colorIdx: i % (colorsRef.current.length || 1),
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

        const color =
          colorsRef.current[p.colorIdx % colorsRef.current.length] ?? "#888888";
        drawFn(ctx, p.x, p.y, p.scale, p.opacity, color);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [slug]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ─── ThemedClubPage props ─────────────────────────────────────────────────────

interface ThemedClubPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  clubs: Club[];
  clubsLoading: boolean;
}

// ─── ThemedClubPage ───────────────────────────────────────────────────────────

export function ThemedClubPage({
  slug,
  onNavigate,
  clubs,
  clubsLoading,
}: ThemedClubPageProps) {
  const { isDark } = useTheme();
  const allClubs = useAllClubs();
  const resolvedClubs = clubs.length > 0 ? clubs : (allClubs.data ?? []);

  const theme = CLUB_THEMES[slug] ?? CLUB_THEMES["e-cell"];

  const backendClub = resolvedClubs.find((c) => c.slug === slug);
  const staticClub = CLUBS_CONFIG.find((c) => c.slug === slug);

  const club = backendClub
    ? backendClub
    : staticClub
      ? {
          id: BigInt(0),
          name: staticClub.name,
          slug: staticClub.slug,
          description: staticClub.description,
        }
      : {
          id: BigInt(0),
          name: slug,
          slug,
          description: "",
        };

  const { data: posts = [], isLoading: postsLoading } = usePostsByClub(
    backendClub?.id ?? null,
  );

  const isLoading = clubsLoading || postsLoading;

  const heroGradient = isDark ? theme.darkHero : theme.lightHero;
  const pageBg = isDark
    ? `linear-gradient(160deg, ${theme.darkBg} 0%, ${theme.darkBg}cc 50%, ${theme.darkBg}88 100%)`
    : `linear-gradient(160deg, ${theme.lightBg} 0%, ${theme.lightBg}dd 50%, white 100%)`;

  // URL-encode the primary color for SVG data URI (strip the '#')
  const encodedColor = encodeURIComponent(theme.primary);

  const primaryLight = theme.accentColors[1] ?? theme.primary;
  const primaryMid = theme.accentColors[0] ?? theme.primary;

  return (
    <div
      className="py-5 px-1 max-w-4xl relative min-h-screen"
      style={{ background: pageBg }}
    >
      {/* Background layer: floating computers + triangle pattern */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl"
        style={{ zIndex: 0 }}
      >
        <FloatingSymbolsCanvas slug={slug} colors={theme.accentColors} />

        {/* Triangle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,5 55,50 5,50' fill='${encodedColor}' /%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* All content above background */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("/")}
          className="gap-1.5 mb-4 rounded-xl text-sm hover:text-foreground"
          style={{ color: isDark ? primaryLight : theme.mid }}
          data-ocid="themed-club.back.button"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Button>

        {clubsLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-36 rounded-3xl" />
            <Skeleton className="h-6 w-40 rounded-xl" />
          </div>
        ) : (
          <>
            {/* Hero section */}
            <motion.div
              className="rounded-3xl p-6 mb-6 relative overflow-hidden"
              style={{ background: heroGradient }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* ── Triangle decorations ── */}

              {/* Large pointing up — top right */}
              <div
                className="absolute -top-4 -right-4 opacity-15"
                style={{
                  width: 100,
                  height: 100,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: theme.mid,
                }}
              />
              {/* Medium pointing down — bottom left */}
              <div
                className="absolute bottom-2 left-6 opacity-10"
                style={{
                  width: 70,
                  height: 70,
                  clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                  background: primaryMid,
                }}
              />
              {/* Small pointing up — right center */}
              <div
                className="absolute top-1/2 right-16 -translate-y-1/2 opacity-20"
                style={{
                  width: 40,
                  height: 40,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: primaryLight,
                }}
              />
              {/* Tiny pointing down — top left */}
              <div
                className="absolute top-4 left-1/3 opacity-15"
                style={{
                  width: 30,
                  height: 30,
                  clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                  background: theme.mid,
                }}
              />
              {/* Medium pointing up — bottom right */}
              <div
                className="absolute -bottom-5 right-1/4 opacity-12"
                style={{
                  width: 60,
                  height: 60,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: theme.mid,
                }}
              />
              {/* Outline circle accent */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-15"
                style={{ border: `2px solid ${primaryMid}` }}
              />

              {/* Hero content */}
              <div className="relative z-10 flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: isDark
                      ? `${theme.primary}33`
                      : `${theme.primary}26`,
                    border: `1px solid ${theme.primary}4d`,
                  }}
                >
                  <Users
                    className="h-7 w-7"
                    style={{ color: isDark ? primaryLight : theme.mid }}
                  />
                </div>

                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                    style={{
                      color: isDark ? primaryLight : theme.mid,
                      opacity: 0.8,
                    }}
                  >
                    Clubs
                  </p>
                  <h1
                    className="font-display font-bold text-2xl leading-tight"
                    style={{
                      color: isDark ? theme.lightBg : theme.darkBg,
                    }}
                  >
                    {club.name}
                  </h1>
                  {club.description && (
                    <p
                      className="text-sm mt-1 max-w-lg"
                      style={{
                        color: isDark ? theme.light : theme.mid,
                        opacity: 0.85,
                      }}
                    >
                      {club.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Posts section */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* Triangle accent */}
                <div
                  className="opacity-60"
                  style={{
                    width: 14,
                    height: 14,
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    background: isDark ? primaryLight : theme.mid,
                    flexShrink: 0,
                  }}
                />
                <h2
                  className="font-display font-bold text-base"
                  style={{
                    color: isDark ? theme.lightBg : theme.darkBg,
                  }}
                >
                  Recent Posts ({posts.length})
                </h2>
                <div
                  className="opacity-40"
                  style={{
                    width: 10,
                    height: 10,
                    clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                    background: isDark ? primaryLight : theme.mid,
                    flexShrink: 0,
                  }}
                />
              </div>

              {isLoading ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  data-ocid="themed-club.posts.loading_state"
                >
                  {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                    <Skeleton key={k} className="h-44 rounded-2xl" />
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div
                  className="p-10 text-center text-sm rounded-2xl"
                  style={{
                    background: isDark
                      ? `${theme.darkBg}66`
                      : `${theme.light}b3`,
                    border: `1px solid ${isDark ? `${theme.primary}33` : `${theme.primary}40`}`,
                    color: isDark ? theme.light : theme.mid,
                  }}
                  data-ocid="themed-club.posts.empty_state"
                >
                  <div className="flex justify-center gap-2 mb-2 opacity-40">
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                        background: isDark ? primaryLight : theme.mid,
                      }}
                    />
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                        background: isDark ? primaryLight : theme.mid,
                      }}
                    />
                  </div>
                  No posts yet — check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {posts.map((post, i) => (
                    <PostCard
                      key={post.id.toString()}
                      post={post}
                      clubs={resolvedClubs}
                      index={i + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
