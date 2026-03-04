import type { Notification } from "@/backend";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMarkAllRead, useMarkNotificationRead } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/time";
import { Bell, BellOff, Check, CheckCheck } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
}

export function NotificationPanel({ open, onClose, notifications }: Props) {
  const { t } = useLanguage();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllRead();

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-[360px] sm:w-[400px] bubble-card-lg border-0 p-0"
        data-ocid="notification.panel"
      >
        <SheetHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              {t("notifications")}
              {unread > 0 && (
                <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {unread}
                </span>
              )}
            </SheetTitle>
            {unread > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markAll.mutate()}
                className="text-xs gap-1.5 text-primary hover:bg-primary/10"
                data-ocid="notification.mark_all.button"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                {t("markAllRead")}
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          {notifications.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
              data-ocid="notification.empty_state"
            >
              <BellOff className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                {t("noNotifications")}
              </p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {notifications.map((notif, i) => (
                <button
                  type="button"
                  key={notif.id.toString()}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl transition-all duration-200 group",
                    notif.isRead
                      ? "bg-muted/30 hover:bg-muted/50"
                      : "bg-primary/8 hover:bg-primary/12 border border-primary/15",
                  )}
                  onClick={() => !notif.isRead && markRead.mutate(notif.id)}
                  data-ocid={`notification.item.${i + 1}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 w-2 h-2 rounded-full shrink-0 mt-1.5",
                        notif.isRead
                          ? "bg-muted-foreground/30"
                          : "bg-primary pulse-dot",
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm leading-snug",
                          notif.isRead
                            ? "text-muted-foreground"
                            : "text-foreground font-medium",
                        )}
                      >
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatRelativeTime(notif.timestamp)}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <Check className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
