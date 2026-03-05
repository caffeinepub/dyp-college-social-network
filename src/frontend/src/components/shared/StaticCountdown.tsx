import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function getCountdownFromMs(dateMs: number): CountdownParts {
  const diff = dateMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, expired: false };
}

interface StaticCountdownProps {
  dateMs: number;
  accentClass?: string;
  bgClass?: string;
}

export function StaticCountdown({
  dateMs,
  accentClass = "text-rose-600 dark:text-rose-400",
  bgClass = "bg-rose-50 dark:bg-rose-950/40",
}: StaticCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdownFromMs(dateMs),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownFromMs(dateMs));
    }, 1000);
    return () => clearInterval(interval);
  }, [dateMs]);

  if (countdown.expired) {
    return (
      <div
        data-ocid="event.countdown.panel"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 w-fit"
      >
        <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
        <span className="text-xs font-medium text-muted-foreground">
          Event passed
        </span>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      data-ocid="event.countdown.panel"
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full w-fit ${bgClass}`}
    >
      <Clock className={`h-3 w-3 shrink-0 ${accentClass}`} />
      <span className={`text-xs font-semibold tabular-nums ${accentClass}`}>
        {countdown.days > 0 && (
          <>
            <span>{countdown.days}</span>
            <span className="font-normal opacity-70">d </span>
          </>
        )}
        <span>{pad(countdown.hours)}</span>
        <span className="font-normal opacity-70">h </span>
        <span>{pad(countdown.minutes)}</span>
        <span className="font-normal opacity-70">m </span>
        <span>{pad(countdown.seconds)}</span>
        <span className="font-normal opacity-70">s</span>
      </span>
    </div>
  );
}
