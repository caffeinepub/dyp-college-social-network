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

interface Props {
  onNavigate: (path: string) => void;
  clubs: Club[];
  clubsLoading: boolean;
}

interface Computer {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
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

  // Monitor body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-7, -6, 14, 10, 1.5);
  ctx.fill();

  // Screen (inner)
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.roundRect(-5.5, -4.5, 11, 7, 1);
  ctx.fill();

  // Screen glow pixel
  ctx.fillStyle = "#a7f3d0";
  ctx.beginPath();
  ctx.roundRect(-3, -3, 6, 4, 0.5);
  ctx.fill();

  // Stand
  ctx.fillStyle = color;
  ctx.fillRect(-2, 4, 4, 3);

  // Base
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
      const count = 20;
      computersRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.55,
        scale: 0.8 + Math.random() * 1.0,
        opacity: 0.18 + Math.random() * 0.27,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
      }));
      // Assign color indices outside of object
      let colorIdxCounter = 0;
      for (const c of computersRef.current as (Computer & {
        colorIdx: number;
      })[]) {
        c.colorIdx = colorIdxCounter % GREEN_COLORS.length;
        colorIdxCounter++;
      }
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

      for (const comp of computersRef.current as (Computer & {
        colorIdx: number;
      })[]) {
        comp.x += comp.vx;
        comp.y += comp.vy;
        comp.rotation += comp.rotSpeed;

        // Wrap around edges
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

export function GdgPage({ onNavigate, clubs, clubsLoading }: Props) {
  const { isDark } = useTheme();
  const allClubs = useAllClubs();
  const resolvedClubs = clubs.length > 0 ? clubs : (allClubs.data ?? []);

  const backendClub = resolvedClubs.find((c) => c.slug === "gdg");
  const staticClub = CLUBS_CONFIG.find((c) => c.slug === "gdg");

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
          name: "GDG",
          slug: "gdg",
          description: "Google Developer Groups at D.Y. Patil College",
        };

  const { data: posts = [], isLoading: postsLoading } = usePostsByClub(
    backendClub?.id ?? null,
  );

  const isLoading = clubsLoading || postsLoading;

  const heroGradient = isDark
    ? "linear-gradient(160deg, #052e16 0%, #14532d 50%, #166534 100%)"
    : "linear-gradient(160deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 100%)";

  const pageBg = isDark
    ? "linear-gradient(160deg, #030f07 0%, #071a0e 50%, #0a2410 100%)"
    : "linear-gradient(160deg, #f0fdf4 0%, #f7fef9 50%, #ecfdf5 100%)";

  return (
    <div
      className="py-5 px-1 max-w-4xl relative min-h-screen"
      style={{ background: pageBg }}
    >
      {/* Floating computers canvas background */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl"
        style={{ zIndex: 0 }}
      >
        <FloatingComputersCanvas />

        {/* Triangle background pattern via SVG */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,5 55,50 5,50' fill='%2316a34a' /%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* All content is relative z-index 1 */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("/")}
          className="gap-1.5 mb-4 rounded-xl text-sm hover:text-foreground"
          style={{ color: isDark ? "#4ade80" : "#16a34a" }}
          data-ocid="gdg.back.button"
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
            {/* GDG Hero */}
            <motion.div
              className="rounded-3xl p-6 mb-6 relative overflow-hidden"
              style={{ background: heroGradient }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Triangle decorations */}
              {/* Large pointing up */}
              <div
                className="absolute -top-4 -right-4 opacity-15"
                style={{
                  width: 100,
                  height: 100,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: "#16a34a",
                }}
              />
              {/* Medium pointing down */}
              <div
                className="absolute bottom-2 left-6 opacity-10"
                style={{
                  width: 70,
                  height: 70,
                  clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                  background: "#22c55e",
                }}
              />
              {/* Small pointing up - right center */}
              <div
                className="absolute top-1/2 right-16 -translate-y-1/2 opacity-20"
                style={{
                  width: 40,
                  height: 40,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: "#4ade80",
                }}
              />
              {/* Tiny pointing down - top left */}
              <div
                className="absolute top-4 left-1/3 opacity-15"
                style={{
                  width: 30,
                  height: 30,
                  clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                  background: "#15803d",
                }}
              />
              {/* Medium pointing up - bottom right */}
              <div
                className="absolute -bottom-5 right-1/4 opacity-12"
                style={{
                  width: 60,
                  height: 60,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: "#16a34a",
                }}
              />
              {/* Outline circle accent */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-15"
                style={{ border: "2px solid #22c55e" }}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: isDark
                      ? "rgba(34,197,94,0.2)"
                      : "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.3)",
                  }}
                >
                  <Users
                    className="h-7 w-7"
                    style={{ color: isDark ? "#4ade80" : "#16a34a" }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                    style={{
                      color: isDark ? "#4ade80" : "#16a34a",
                      opacity: 0.8,
                    }}
                  >
                    Clubs
                  </p>
                  <h1
                    className="font-display font-bold text-2xl leading-tight"
                    style={{ color: isDark ? "#f0fdf4" : "#14532d" }}
                  >
                    {club.name}
                  </h1>
                  {club.description && (
                    <p
                      className="text-sm mt-1 max-w-lg"
                      style={{
                        color: isDark ? "#86efac" : "#166534",
                        opacity: 0.85,
                      }}
                    >
                      {club.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Posts Section */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* Triangle accent in section header */}
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
                  Recent Posts ({posts.length})
                </h2>
                <div
                  className="opacity-40"
                  style={{
                    width: 10,
                    height: 10,
                    clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                    background: isDark ? "#4ade80" : "#16a34a",
                    flexShrink: 0,
                  }}
                />
              </div>

              {isLoading ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  data-ocid="gdg.posts.loading_state"
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
                      ? "rgba(20,83,45,0.4)"
                      : "rgba(220,252,231,0.7)",
                    border: `1px solid ${isDark ? "rgba(74,222,128,0.2)" : "rgba(34,197,94,0.25)"}`,
                    color: isDark ? "#86efac" : "#166534",
                  }}
                  data-ocid="gdg.posts.empty_state"
                >
                  <div className="flex justify-center gap-2 mb-2 opacity-40">
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                        background: isDark ? "#4ade80" : "#16a34a",
                      }}
                    />
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                        background: isDark ? "#4ade80" : "#16a34a",
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
