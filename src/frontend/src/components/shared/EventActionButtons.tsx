import { Button } from "@/components/ui/button";
import { downloadStaticICS } from "@/utils/calendar";
import { scheduleNotification } from "@/utils/notifications";
import { Bell, CalendarPlus } from "lucide-react";

interface EventActionButtonsProps {
  title: string;
  description: string;
  dateMs?: number;
  showNotify?: boolean;
}

export function EventActionButtons({
  title,
  description,
  dateMs,
  showNotify,
}: EventActionButtonsProps) {
  if (!dateMs) return null;

  const isFuture = dateMs > Date.now();
  const canNotify = typeof window !== "undefined" && "Notification" in window;
  const displayNotify =
    showNotify !== undefined ? showNotify : isFuture && canNotify;

  return (
    <div className="flex items-center gap-2 pt-1 flex-wrap">
      <Button
        variant="ghost"
        size="sm"
        className="neo-button h-7 gap-1.5 rounded-xl text-rose-600 hover:text-rose-700 dark:text-rose-300 font-medium text-[11px] px-2.5"
        onClick={() => downloadStaticICS(title, description, dateMs)}
        data-ocid="event.add_calendar.button"
      >
        <CalendarPlus className="h-3 w-3" />
        Add to Calendar
      </Button>
      {displayNotify && (
        <Button
          variant="ghost"
          size="sm"
          className="neo-button h-7 gap-1.5 rounded-xl text-pink-600 hover:text-pink-700 dark:text-pink-300 font-medium text-[11px] px-2.5"
          onClick={() => scheduleNotification(title, dateMs)}
          data-ocid="event.notify_me.button"
        >
          <Bell className="h-3 w-3" />
          Notify Me
        </Button>
      )}
    </div>
  );
}
