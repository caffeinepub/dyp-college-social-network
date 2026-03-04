import { useLanguage } from "@/contexts/LanguageContext";
import { type CountdownParts, getCountdown } from "@/utils/time";
import { useEffect, useState } from "react";

interface Props {
  eventDateNano: bigint;
  compact?: boolean;
}

export function CountdownTimer({ eventDateNano, compact = false }: Props) {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdown(eventDateNano),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(eventDateNano));
    }, 1000);
    return () => clearInterval(interval);
  }, [eventDateNano]);

  if (countdown.expired) {
    return (
      <span className="text-xs font-medium text-muted-foreground bg-muted/60 px-2 py-1 rounded-full">
        Event passed
      </span>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-xs font-medium text-primary">
        <span className="font-display font-bold tabular-nums">
          {countdown.days}
          {t("days")} {String(countdown.hours).padStart(2, "0")}
          {t("hours")} {String(countdown.minutes).padStart(2, "0")}
          {t("minutes")} {String(countdown.seconds).padStart(2, "0")}
          {t("seconds")}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2"
      data-ocid="event.countdown.panel"
      aria-label={`Event countdown: ${countdown.days} days ${countdown.hours} hours`}
    >
      {[
        { value: countdown.days, label: t("days"), unit: "days" },
        { value: countdown.hours, label: t("hours"), unit: "hours" },
        { value: countdown.minutes, label: t("minutes"), unit: "minutes" },
        { value: countdown.seconds, label: t("seconds"), unit: "seconds" },
      ].map(({ value, label, unit }) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bubble-card px-2.5 py-1.5 min-w-[42px] text-center">
            <span className="countdown-digit text-primary tabular-nums">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide font-medium">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
