import type { Club, Post } from "@/backend";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { downloadICS } from "@/utils/calendar";
import { CalendarDays, CalendarPlus, Clock } from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  events: Post[];
  clubs: Club[];
  isLoading: boolean;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function EventCalendarWidget({ events, clubs, isLoading }: Props) {
  // Compute event dates (JS Date objects) for calendar highlighting
  const eventDates = useMemo(() => {
    return events
      .filter((e) => e.eventDate != null)
      .map((e) => new Date(Number(e.eventDate!) / 1_000_000));
  }, [events]);

  // Default selected: today if has events, else first upcoming event date
  const defaultSelected = useMemo(() => {
    const today = new Date();
    const todayHasEvent = eventDates.some((d) => isSameDay(d, today));
    if (todayHasEvent) return today;
    // find next upcoming
    const now = Date.now();
    const upcoming = events
      .filter((e) => e.eventDate != null)
      .filter((e) => Number(e.eventDate!) / 1_000_000 > now)
      .sort(
        (a, b) =>
          Number(a.eventDate!) / 1_000_000 - Number(b.eventDate!) / 1_000_000,
      );
    if (upcoming.length > 0) {
      return new Date(Number(upcoming[0].eventDate!) / 1_000_000);
    }
    return today;
  }, [events, eventDates]);

  const [selected, setSelected] = useState<Date | undefined>(defaultSelected);

  // Events for the selected day
  const dayEvents = useMemo(() => {
    if (!selected) return [];
    return events.filter(
      (e) =>
        e.eventDate != null &&
        isSameDay(new Date(Number(e.eventDate!) / 1_000_000), selected),
    );
  }, [events, selected]);

  // Events within the next 24 hours
  const upcomingIn24h = useMemo(() => {
    const now = Date.now();
    const in24h = now + 24 * 60 * 60 * 1000;
    return events.filter((e) => {
      if (e.eventDate == null) return false;
      const ms = Number(e.eventDate) / 1_000_000;
      return ms > now && ms <= in24h;
    });
  }, [events]);

  // Format selected date for label
  const selectedLabel = selected
    ? selected.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  // Custom DayButton component to show pink dot on event dates
  const customComponents = useMemo(
    () => ({
      DayButton: ({
        day,
        modifiers,
        className,
        ...props
      }: React.ComponentProps<"button"> & {
        day: { date: Date };
        modifiers: Record<string, boolean>;
      }) => {
        const hasEvent = eventDates.some((d) => isSameDay(d, day.date));
        const isSelected = selected && isSameDay(day.date, selected);
        const isToday = isSameDay(day.date, new Date()) && !isSelected;

        return (
          <button
            {...props}
            className={[
              "relative flex flex-col items-center justify-center w-full aspect-square rounded-full text-xs font-medium transition-all duration-150",
              isSelected
                ? "bg-primary text-primary-foreground shadow-sm"
                : isToday
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50",
              modifiers.outside ? "opacity-30" : "",
              className ?? "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span>{day.date.getDate()}</span>
            {hasEvent && (
              <span
                className={[
                  "absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                  isSelected ? "bg-primary-foreground/80" : "bg-pink-500",
                ].join(" ")}
                aria-hidden="true"
              />
            )}
          </button>
        );
      },
    }),
    [eventDates, selected],
  );

  if (isLoading) {
    return (
      <div className="p-[2px] rounded-3xl bg-gradient-to-br from-pink-300 via-rose-200 to-pink-400">
        <div className="rounded-[22px] bg-background p-4 space-y-3">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-56 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-[2px] rounded-3xl bg-gradient-to-br from-pink-300 via-rose-200 to-pink-400 shadow-lg"
      data-ocid="calendar.widget.panel"
    >
      <div className="relative rounded-[22px] bg-background overflow-hidden p-4 space-y-3">
        {/* Decorative blurred circles */}
        <div
          className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(244,114,182,0.18), transparent 70%)",
            filter: "blur(12px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,207,232,0.22), transparent 70%)",
            filter: "blur(10px)",
          }}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center shadow-sm shrink-0">
            <CalendarDays className="h-3 w-3 text-white" />
          </div>
          <h3 className="font-display font-bold text-sm text-foreground">
            Event Calendar
          </h3>
          {events.length > 0 && (
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full ml-auto">
              {events.length} events
            </span>
          )}
        </div>

        {/* Mini Calendar */}
        <div className="relative z-10 -mx-1">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            className="w-full [--cell-size:--spacing(7)]"
            components={
              customComponents as React.ComponentProps<
                typeof Calendar
              >["components"]
            }
            data-ocid="calendar.widget.canvas_target"
          />
        </div>

        {/* Selected Day Events */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-3 rounded-full bg-gradient-to-b from-pink-400 to-rose-400" />
            <p className="text-[11px] font-semibold text-muted-foreground">
              {selectedLabel ? `Events on ${selectedLabel}` : "Select a day"}
            </p>
          </div>

          {dayEvents.length === 0 ? (
            <p
              className="text-[11px] text-muted-foreground/60 italic px-2 py-2 bg-muted/30 rounded-xl"
              data-ocid="calendar.day.empty_state"
            >
              No events on this day
            </p>
          ) : (
            <div className="space-y-2" data-ocid="calendar.day.list">
              {dayEvents.map((event, i) => {
                const club = clubs.find((c) => c.id === event.clubId);
                const eventMs = event.eventDate
                  ? Number(event.eventDate) / 1_000_000
                  : null;
                const timeStr = eventMs
                  ? new Date(eventMs).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : null;

                return (
                  <div
                    key={event.id.toString()}
                    className="rounded-2xl bg-gradient-to-br from-pink-50/80 to-rose-50/60 dark:from-pink-950/20 dark:to-rose-950/15 border border-pink-100/80 dark:border-pink-900/30 p-2.5 space-y-1.5"
                    data-ocid={`calendar.event.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <p className="font-semibold text-[11px] text-foreground leading-snug line-clamp-2">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {club && (
                            <span className="text-[10px] font-medium text-primary">
                              {club.name}
                            </span>
                          )}
                          {timeStr && (
                            <>
                              {club && (
                                <span className="text-muted-foreground/50 text-[9px]">
                                  ·
                                </span>
                              )}
                              <span className="text-[10px] text-muted-foreground">
                                {timeStr}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-7 gap-1 rounded-xl text-[10px] font-medium border-pink-200/80 text-primary hover:bg-pink-50 dark:border-pink-800/50 dark:hover:bg-pink-950/30 px-2"
                      onClick={() => downloadICS(event)}
                      data-ocid={`calendar.event.add_calendar.button.${i + 1}`}
                    >
                      <CalendarPlus className="h-2.5 w-2.5" />
                      Add to Calendar
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 24h Countdown Section */}
        {upcomingIn24h.length > 0 && (
          <div
            className="relative z-10 space-y-2 pt-1"
            data-ocid="calendar.countdown.panel"
          >
            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
                <Clock className="h-2.5 w-2.5 text-amber-500" />
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                  Coming up soon!
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
            </div>

            <div className="space-y-2">
              {upcomingIn24h.map((event, i) => (
                <div
                  key={event.id.toString()}
                  className="rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/60 dark:from-amber-950/25 dark:to-orange-950/15 border border-amber-100/80 dark:border-amber-900/30 p-2.5 space-y-1"
                  data-ocid={`calendar.countdown.item.${i + 1}`}
                >
                  <p className="font-semibold text-[11px] text-foreground line-clamp-1">
                    {event.title}
                  </p>
                  {event.eventDate && (
                    <CountdownTimer
                      eventDateNano={event.eventDate}
                      compact={true}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
