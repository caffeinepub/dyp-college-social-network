import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Language, useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Bell, Globe, HelpCircle, Menu, Moon, Sun } from "lucide-react";

interface Props {
  unreadCount: number;
  onNotificationClick: () => void;
  onHelpClick: () => void;
  onMenuClick: () => void;
}

const languages: { value: Language; label: string; short: string }[] = [
  { value: "en", label: "English", short: "EN" },
  { value: "mar", label: "मराठी", short: "MAR" },
  { value: "hin", label: "हिन्दी", short: "HIN" },
];

export function Header({
  unreadCount,
  onNotificationClick,
  onHelpClick,
  onMenuClick,
}: Props) {
  const { toggleTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      {/* Left - hamburger for mobile */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-xl h-9 w-9"
          onClick={onMenuClick}
          data-ocid="header.hamburger.button"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden lg:flex items-center gap-2">
          {/* Desktop college name abbreviation */}
          <span className="font-display font-bold text-sm text-foreground/70 hidden xl:block">
            DYP College Social Network
          </span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-xl h-9 px-2.5 font-medium text-xs"
              data-ocid="header.language.select"
              aria-label={t("language")}
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {languages.find((l) => l.value === language)?.short}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bubble-card border-0 shadow-bubble-lg min-w-[130px]"
          >
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={cn(
                  "rounded-lg text-sm cursor-pointer",
                  language === lang.value
                    ? "bg-primary/10 text-primary font-semibold"
                    : "",
                )}
              >
                <span className="w-8 text-xs font-bold opacity-60">
                  {lang.short}
                </span>
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-xl h-9 w-9"
          data-ocid="header.theme.toggle"
          aria-label={isDark ? t("lightMode") : t("darkMode")}
        >
          {isDark ? (
            <Sun className="h-4.5 w-4.5" />
          ) : (
            <Moon className="h-4.5 w-4.5" />
          )}
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onHelpClick}
          className="rounded-xl h-9 w-9"
          data-ocid="header.help.button"
          aria-label={t("help")}
        >
          <HelpCircle className="h-4.5 w-4.5" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationClick}
          className="rounded-xl h-9 w-9 relative"
          data-ocid="header.notification.button"
          aria-label={`${t("notifications")}${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>

        {/* Hamburger menu for desktop (extra options) */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl h-9 w-9 hidden lg:flex"
          data-ocid="header.hamburger.button"
          aria-label="More options"
        >
          <Menu className="h-4.5 w-4.5" />
        </Button>
      </div>
    </header>
  );
}
