import { EventActionButtons } from "@/components/shared/EventActionButtons";
import { StaticCountdown } from "@/components/shared/StaticCountdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

/* ============================================================
   TYPES
============================================================ */
interface RegisteredEvent {
  id: string;
  name: string;
  date: string;
  dateMs: number;
  description: string;
  status: "registered" | "attended" | "cancelled";
  accentClass: string;
  bgClass: string;
  borderColor: string;
  badgeClass: string;
}

/* ============================================================
   MOCK DATA
============================================================ */
const INITIAL_EVENTS: RegisteredEvent[] = [
  {
    id: "hackathon",
    name: "Dimension X Hackathon",
    date: "28 Mar 2026",
    dateMs: new Date("2026-03-28").getTime(),
    description:
      "National Level 24-Hour Open Innovation Hackathon powered by HAC2KILL. No registration fee.",
    status: "registered",
    accentClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    badgeClass:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
  {
    id: "echo",
    name: "Cultural Fest / ECHO Got Talent",
    date: "07 Mar 2026",
    dateMs: new Date("2026-03-07").getTime(),
    description:
      "POV: Perspective of Voices. Themes: Geopolitical, Sustainability, AI, Space and Human Psychology. Venue: Seminar Hall, DYPCET.",
    status: "attended",
    accentClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-50 dark:bg-purple-950/40",
    borderColor: "border-purple-200 dark:border-purple-800",
    badgeClass:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800",
  },
  {
    id: "technotsav",
    name: "TECHNOTSAV 2K25",
    date: "20 Mar 2026",
    dateMs: new Date("2026-03-20").getTime(),
    description:
      "National Level Technical Fest - Cosmos of Innovation at D.Y. Patil College of Engineering and Technology.",
    status: "registered",
    accentClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/40",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    badgeClass:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800",
  },
];

/* ============================================================
   STATUS LABEL
============================================================ */
function StatusLabel({ status }: { status: RegisteredEvent["status"] }) {
  if (status === "attended") {
    return (
      <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
        Attended
      </span>
    );
  }
  if (status === "cancelled") {
    return (
      <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800">
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800">
      Registered
    </span>
  );
}

/* ============================================================
   REGISTERED EVENTS PAGE
============================================================ */
export function RegisteredEventsPage() {
  const [events, setEvents] = useState<RegisteredEvent[]>(INITIAL_EVENTS);

  const cancelRegistration = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "cancelled" } : e)),
    );
    toast.success("Registration cancelled successfully");
  };

  const activeEvents = events.filter((e) => e.status !== "cancelled");

  return (
    <div
      className="max-w-3xl mx-auto px-3 py-5"
      data-ocid="registered_events.page"
    >
      {/* Page Header */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-100 dark:bg-blue-950/50">
          <CalendarCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-foreground">
            Registered Events
          </h1>
          <p className="text-xs text-muted-foreground">
            Events you have signed up for
          </p>
        </div>
        <Badge
          variant="outline"
          className="ml-auto text-[11px] border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-700 font-semibold"
        >
          {activeEvents.length} active
        </Badge>
      </motion.div>

      {/* Events List */}
      {activeEvents.length === 0 ? (
        <motion.div
          data-ocid="registered_events.empty_state"
          className="neo-card p-12 text-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CalendarCheck className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-semibold text-foreground mb-1">
            No registered events
          </p>
          <p className="text-xs text-muted-foreground">
            Browse events and register to see them here.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              data-ocid={`registered_events.item.${i + 1}`}
              className={`neo-card overflow-hidden ${event.status === "cancelled" ? "opacity-50" : ""}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: event.status === "cancelled" ? 0.5 : 1,
                y: 0,
              }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              {/* Color accent top strip - using gradient inline since it's a decoration */}
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    event.id === "hackathon"
                      ? "linear-gradient(90deg, #10b981, #34d399)"
                      : event.id === "echo"
                        ? "linear-gradient(90deg, #a855f7, #c084fc)"
                        : "linear-gradient(90deg, #f43f5e, #fb7185)",
                }}
              />

              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-base text-foreground leading-snug">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        {event.date}
                      </span>
                      <StatusLabel status={event.status} />
                    </div>
                  </div>
                  {event.status === "registered" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl h-8 gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 text-[11px] font-medium shrink-0"
                      onClick={() => cancelRegistration(event.id)}
                      data-ocid={`registered_events.cancel_button.${i + 1}`}
                    >
                      <X className="h-3 w-3" />
                      Cancel
                    </Button>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {event.description}
                </p>

                {/* Countdown & Actions */}
                {event.status !== "cancelled" && (
                  <div className="flex flex-wrap items-center gap-2">
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
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
