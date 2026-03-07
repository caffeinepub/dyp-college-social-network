import type { ActivityEntry, Club } from "@/backend";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/time";
import { Activity, Radio } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  entries: ActivityEntry[];
  clubs: Club[];
  isLoading: boolean;
}

const actionColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-sky-500",
];

function getColor(id: bigint) {
  return actionColors[Number(id) % actionColors.length];
}

export function ActivityPulse({ entries, clubs, isLoading }: Props) {
  const { t } = useLanguage();

  return (
    <div
      className="neo-card-lg p-4 space-y-3 h-full"
      data-ocid="activity.pulse.panel"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-dot"
            aria-hidden
          />
          <Radio className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-display font-bold text-sm text-foreground">
          {t("activityFeed")}
        </h3>
      </div>

      <ScrollArea className="h-[400px] lg:h-[500px]">
        {isLoading ? (
          <div className="space-y-2.5 pr-2">
            {["sk1", "sk2", "sk3", "sk4", "sk5"].map((k) => (
              <Skeleton key={k} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div
            className="py-8 text-center text-sm text-muted-foreground"
            data-ocid="activity.empty_state"
          >
            {t("noActivity")}
          </div>
        ) : (
          <div className="space-y-2 pr-2">
            <AnimatePresence initial={false}>
              {entries.slice(0, 20).map((entry, i) => {
                const club = clubs.find((c) => c.id === entry.clubId);
                return (
                  <motion.div
                    key={entry.id.toString()}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.25 }}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/40 transition-colors group"
                    data-ocid={`activity.item.${i + 1}`}
                  >
                    {/* Avatar dot */}
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0",
                        getColor(entry.id),
                      )}
                      aria-hidden
                    >
                      {entry.actorName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-foreground leading-snug">
                        <span className="font-semibold">{entry.actorName}</span>{" "}
                        <span className="text-muted-foreground">
                          {entry.action}
                        </span>
                        {club && (
                          <span className="text-primary font-medium">
                            {" "}
                            · {club.name}
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {formatRelativeTime(entry.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
