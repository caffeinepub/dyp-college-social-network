import { toast } from "sonner";

const STORAGE_PREFIX = "dyp_notif_";

export async function scheduleNotification(
  title: string,
  dateMs: number,
): Promise<"scheduled" | "denied"> {
  // Check if Notification API is supported
  if (!("Notification" in window)) {
    toast.error("Your browser does not support notifications.");
    return "denied";
  }

  let permission = Notification.permission;

  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    toast.error("Please allow notifications in your browser settings.");
    return "denied";
  }

  // Store reminder in localStorage
  const storageKey = `${STORAGE_PREFIX}${title}`;
  localStorage.setItem(storageKey, String(dateMs));

  const now = Date.now();
  const msUntilEvent = dateMs - now;
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (msUntilEvent <= 0) {
    // Event already passed
    toast.error("This event has already passed.");
    return "denied";
  }

  const fireNotification = () => {
    const n = new Notification(`Reminder: ${title}`, {
      body: "This event is coming up soon at D.Y. Patil College of Engineering and Technology.",
      icon: "/favicon.ico",
      tag: storageKey,
    });
    // Auto-close after 8 seconds
    setTimeout(() => n.close(), 8000);
  };

  if (msUntilEvent > twentyFourHours) {
    // Event is more than 24h away: fire reminder 24h before
    const msUntilReminder = msUntilEvent - twentyFourHours;
    setTimeout(fireNotification, msUntilReminder);
  } else {
    // Event is within 24h but still in the future: notify immediately
    setTimeout(fireNotification, 0);
  }

  toast.success("Reminder set! You will be notified before this event.");
  return "scheduled";
}
