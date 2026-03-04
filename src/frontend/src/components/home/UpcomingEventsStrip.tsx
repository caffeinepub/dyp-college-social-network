import type { Club, Post } from "@/backend";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { downloadICS } from "@/utils/calendar";
import { CalendarPlus, ChevronRight, Zap } from "lucide-react";

interface Props {
  events: Post[];
  clubs: Club[];
  isLoading: boolean;
}

export function UpcomingEventsStrip({ events, clubs, isLoading }: Props) {
  const { t } = useLanguage();

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Zap className="h-3.5 w-3.5 text-white" />
        </div>
        <h2 className="font-display font-bold text-base text-foreground">
          {t("upcomingEvents")}
        </h2>
        {events.length > 0 && (
          <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {events.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {["sk1", "sk2", "sk3"].map((k) => (
            <Skeleton key={k} className="h-36 w-64 shrink-0 rounded-2xl" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div
          className="bubble-card p-6 text-center text-sm text-muted-foreground"
          data-ocid="home.events.empty_state"
        >
          {t("noEvents")}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
          {events.map((event, i) => {
            const club = clubs.find((c) => c.id === event.clubId);
            return (
              <div
                key={event.id.toString()}
                className="bubble-card shrink-0 w-[300px] snap-start p-4 space-y-3 hover:shadow-bubble-lg transition-all duration-300"
                data-ocid={`home.upcoming.item.${i + 1}`}
                style={{
                  background:
                    i % 3 === 0
                      ? "linear-gradient(135deg, rgba(219,234,254,0.9), rgba(255,255,255,0.9))"
                      : i % 3 === 1
                        ? "linear-gradient(135deg, rgba(239,246,255,0.9), rgba(219,234,254,0.9))"
                        : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(191,219,254,0.9))",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-display font-bold text-sm leading-snug text-foreground line-clamp-2">
                      {event.title}
                    </p>
                    {club && (
                      <span className="text-[11px] font-medium text-primary mt-0.5 block">
                        {club.name}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                </div>

                {event.eventDate && (
                  <CountdownTimer eventDateNano={event.eventDate} />
                )}

                {event.eventDate && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-1.5 rounded-xl h-8 text-xs font-medium border-primary/20 text-primary hover:bg-primary/5"
                    onClick={() => downloadICS(event)}
                    data-ocid="event.add_calendar.button"
                  >
                    <CalendarPlus className="h-3 w-3" />
                    {t("addToCalendar")}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
