import { PostCard } from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CLUBS_CONFIG } from "@/config/clubs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAllClubs, usePostsByClub } from "@/hooks/useQueries";
import { ArrowLeft, Users } from "lucide-react";
import { motion } from "motion/react";
import { ECellSubteamPage } from "./ECellSubteamPage";
import { GdgPage } from "./GdgPage";
import { GdgSubteamPage } from "./GdgSubteamPage";
import { ThemedClubPage } from "./ThemedClubPage";

interface Props {
  slug: string;
  subteamSlug?: string;
  onNavigate: (path: string) => void;
}

export function ClubPage({ slug, subteamSlug, onNavigate }: Props) {
  const { t } = useLanguage();
  const { data: clubs = [], isLoading: clubsLoading } = useAllClubs();

  const backendClub = clubs.find((c) => c.slug === slug);
  const staticClub = CLUBS_CONFIG.find((c) => c.slug === slug);

  // Use backend club if found, otherwise fall back to static config
  const club = backendClub
    ? backendClub
    : staticClub
      ? {
          id: BigInt(0),
          name: staticClub.name,
          slug: staticClub.slug,
          description: staticClub.description,
        }
      : null;

  // Always call hooks at top level - pass null for non-backend clubs
  const { data: posts = [], isLoading: postsLoading } = usePostsByClub(
    backendClub?.id ?? null,
  );

  const isLoading = clubsLoading || postsLoading;

  // GDG subteam pages
  if (slug === "gdg" && subteamSlug) {
    return <GdgSubteamPage subteamSlug={subteamSlug} onNavigate={onNavigate} />;
  }

  // E-Cell subteam pages
  if (slug === "e-cell" && subteamSlug) {
    return (
      <ECellSubteamPage subteamSlug={subteamSlug} onNavigate={onNavigate} />
    );
  }

  // GDG gets its own special page
  if (slug === "gdg") {
    return (
      <GdgPage
        onNavigate={onNavigate}
        clubs={clubs}
        clubsLoading={clubsLoading}
      />
    );
  }

  // Themed club pages
  const THEMED_SLUGS = [
    "e-cell",
    "official-theatre",
    "official-dance",
    "ncc",
    "official-music",
    "student-council",
    "general-clubs",
    "nss",
    "src",
    "faculty",
  ];
  if (THEMED_SLUGS.includes(slug)) {
    return (
      <ThemedClubPage
        slug={slug}
        onNavigate={onNavigate}
        clubs={clubs}
        clubsLoading={clubsLoading}
      />
    );
  }

  return (
    <div className="py-5 px-1 max-w-4xl">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate("/")}
        className="gap-1.5 mb-4 rounded-xl text-sm text-muted-foreground hover:text-foreground"
        data-ocid="club.back.button"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("home")}
      </Button>

      {clubsLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-28 rounded-3xl" />
          <Skeleton className="h-6 w-40 rounded-xl" />
        </div>
      ) : !club ? (
        <div className="neo-card p-10 text-center">
          <p className="text-muted-foreground">Club not found</p>
        </div>
      ) : (
        <>
          {/* Club Hero */}
          <motion.div
            className="rounded-3xl p-6 mb-6 relative overflow-hidden"
            style={{ background: "var(--gradient-hero)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Pink decorative circles */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(219,39,119,0.7), transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-4 left-1/4 w-20 h-20 rounded-full opacity-15"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,114,182,0.6), transparent 70%)",
              }}
            />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-0.5">
                  {t("clubs")}
                </p>
                <h1 className="font-display font-bold text-2xl text-foreground">
                  {club.name}
                </h1>
                {club.description && (
                  <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                    {club.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Posts */}
          <div>
            <h2 className="font-display font-bold text-base text-foreground mb-3">
              {t("recentPosts")} ({posts.length})
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                  <Skeleton key={k} className="h-44 rounded-2xl" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div
                className="neo-card p-10 text-center text-sm text-muted-foreground"
                data-ocid="club.posts.empty_state"
              >
                {t("noPosts")}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {posts.map((post, i) => (
                  <PostCard
                    key={post.id.toString()}
                    post={post}
                    clubs={clubs}
                    index={i + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
