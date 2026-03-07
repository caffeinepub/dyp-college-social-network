import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  CalendarClock,
  Eye,
  KeyRound,
  Save,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/* ============================================================
   HELPERS
============================================================ */
function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/* ============================================================
   SECTION WRAPPER
============================================================ */
function SettingsSection({
  id,
  icon,
  title,
  description,
  children,
  ocid,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <motion.div
      id={id}
      data-ocid={ocid}
      className="neo-card p-5 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-3 pb-1 border-b border-border/50">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary/10">
          <span className="text-primary">{icon}</span>
        </div>
        <div>
          <h2 className="font-display font-bold text-sm text-foreground">
            {title}
          </h2>
          <p className="text-[11px] text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

/* ============================================================
   TOGGLE ROW
============================================================ */
function ToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
  ocid,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {description}
          </p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        data-ocid={ocid}
        className="shrink-0"
      />
    </div>
  );
}

/* ============================================================
   SETTINGS PAGE
============================================================ */
export function SettingsPage() {
  /* Password section */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  /* Calendar/Event settings - persisted */
  const [reminderDefault, setReminderDefault] = useState(() =>
    readLocal("settings_reminder", "1hour"),
  );
  const [customMinutes, setCustomMinutes] = useState(() =>
    readLocal("settings_custom_minutes", "30"),
  );
  const [autoCalendar, setAutoCalendar] = useState(() =>
    readLocal("settings_auto_calendar", true),
  );
  const [browserNotifs, setBrowserNotifs] = useState(() =>
    readLocal("settings_browser_notifs", true),
  );
  const [showEventsStrip, setShowEventsStrip] = useState(() =>
    readLocal("settings_show_strip", true),
  );

  /* Privacy settings - persisted */
  const [showActivity, setShowActivity] = useState(() =>
    readLocal("settings_show_activity", true),
  );
  const [allowComments, setAllowComments] = useState(() =>
    readLocal("settings_allow_comments", true),
  );
  const [allowTagging, setAllowTagging] = useState(() =>
    readLocal("settings_allow_tagging", true),
  );
  const [publicProfile, setPublicProfile] = useState(() =>
    readLocal("settings_public_profile", true),
  );

  /* Persist calendar settings */
  useEffect(() => {
    localStorage.setItem("settings_reminder", JSON.stringify(reminderDefault));
  }, [reminderDefault]);
  useEffect(() => {
    localStorage.setItem(
      "settings_auto_calendar",
      JSON.stringify(autoCalendar),
    );
  }, [autoCalendar]);
  useEffect(() => {
    localStorage.setItem(
      "settings_browser_notifs",
      JSON.stringify(browserNotifs),
    );
  }, [browserNotifs]);
  useEffect(() => {
    localStorage.setItem(
      "settings_show_strip",
      JSON.stringify(showEventsStrip),
    );
  }, [showEventsStrip]);
  useEffect(() => {
    localStorage.setItem(
      "settings_show_activity",
      JSON.stringify(showActivity),
    );
  }, [showActivity]);
  useEffect(() => {
    localStorage.setItem(
      "settings_allow_comments",
      JSON.stringify(allowComments),
    );
  }, [allowComments]);
  useEffect(() => {
    localStorage.setItem(
      "settings_allow_tagging",
      JSON.stringify(allowTagging),
    );
  }, [allowTagging]);
  useEffect(() => {
    localStorage.setItem(
      "settings_public_profile",
      JSON.stringify(publicProfile),
    );
  }, [publicProfile]);

  const handlePasswordSave = () => {
    if (!currentPw || !newPw || !confirmPw) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (newPw.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    toast.success("Password updated successfully");
  };

  const handleCalendarSave = () => {
    localStorage.setItem(
      "settings_custom_minutes",
      JSON.stringify(customMinutes),
    );
    toast.success("Calendar settings saved");
  };

  const handlePrivacySave = () => {
    toast.success("Privacy settings saved");
  };

  return (
    <div
      className="max-w-2xl mx-auto px-3 py-5 space-y-5"
      data-ocid="settings.page"
    >
      {/* Page Header */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-primary/10">
          <Settings className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-foreground">
            Settings
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage your preferences and account
          </p>
        </div>
      </motion.div>

      {/* ====== PASSWORD & SECURITY ====== */}
      <SettingsSection
        id="password"
        ocid="settings.password.section"
        icon={<KeyRound className="h-4 w-4" />}
        title="Password & Security"
        description="Update your login password"
      >
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="current-pw" className="text-xs font-medium">
              Current Password
            </Label>
            <Input
              id="current-pw"
              type="password"
              placeholder="Enter current password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              className="rounded-xl text-sm h-9"
              data-ocid="settings.password.current.input"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-pw" className="text-xs font-medium">
              New Password
            </Label>
            <Input
              id="new-pw"
              type="password"
              placeholder="Enter new password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="rounded-xl text-sm h-9"
              data-ocid="settings.password.new.input"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirm-pw" className="text-xs font-medium">
              Confirm New Password
            </Label>
            <Input
              id="confirm-pw"
              type="password"
              placeholder="Re-enter new password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="rounded-xl text-sm h-9"
              data-ocid="settings.password.confirm.input"
            />
          </div>
          <Button
            size="sm"
            className="rounded-xl gap-1.5 text-xs mt-1"
            onClick={handlePasswordSave}
            data-ocid="settings.password.save.button"
          >
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </Button>
        </div>
      </SettingsSection>

      {/* ====== EVENTS & CALENDAR ====== */}
      <SettingsSection
        id="calendar"
        ocid="settings.calendar.section"
        icon={<CalendarClock className="h-4 w-4" />}
        title="Events & Calendar Settings"
        description="Customize event reminders and calendar integration"
      >
        <div className="space-y-4">
          {/* Default reminder */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              Default Event Reminder
            </Label>
            <Select value={reminderDefault} onValueChange={setReminderDefault}>
              <SelectTrigger
                className="rounded-xl h-9 text-sm"
                data-ocid="settings.reminder.select"
              >
                <SelectValue placeholder="Select reminder time" />
              </SelectTrigger>
              <SelectContent className="neo-card border-0">
                <SelectItem value="1hour">1 Hour Before</SelectItem>
                <SelectItem value="1day">1 Day Before</SelectItem>
                <SelectItem value="1week">1 Week Before</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom reminder input */}
          {reminderDefault === "custom" && (
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Label className="text-xs font-medium">
                Custom Reminder (minutes before)
              </Label>
              <Input
                type="number"
                min="1"
                placeholder="e.g. 45"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="rounded-xl text-sm h-9 w-40"
                data-ocid="settings.calendar.custom.input"
              />
            </motion.div>
          )}

          <div className="space-y-3">
            <ToggleRow
              label="Automatically Add Events to Calendar"
              description="New registrations are auto-added to your calendar"
              checked={autoCalendar}
              onCheckedChange={setAutoCalendar}
              ocid="settings.auto_calendar.switch"
            />
            <ToggleRow
              label="Send Browser Notifications for Events"
              description="Get notified in your browser before events start"
              checked={browserNotifs}
              onCheckedChange={setBrowserNotifs}
              ocid="settings.notifications.switch"
            />
            <ToggleRow
              label="Show Upcoming Events Strip on Homepage"
              description="Display the upcoming events ribbon at the top"
              checked={showEventsStrip}
              onCheckedChange={setShowEventsStrip}
              ocid="settings.events_strip.switch"
            />
          </div>

          <Button
            size="sm"
            className="rounded-xl gap-1.5 text-xs"
            onClick={handleCalendarSave}
            data-ocid="settings.calendar.save.button"
          >
            <Save className="h-3.5 w-3.5" />
            Save Settings
          </Button>
        </div>
      </SettingsSection>

      {/* ====== PRIVACY & VISIBILITY ====== */}
      <SettingsSection
        id="privacy"
        ocid="settings.privacy.section"
        icon={<Eye className="h-4 w-4" />}
        title="Privacy & Visibility"
        description="Control who can see your activity and interact with you"
      >
        <div className="space-y-3">
          <ToggleRow
            label="Show my activity on feed"
            description="Other students can see your event activity"
            checked={showActivity}
            onCheckedChange={setShowActivity}
            ocid="settings.show_activity.switch"
          />
          <ToggleRow
            label="Allow comments on my posts"
            description="Students can comment on your posts"
            checked={allowComments}
            onCheckedChange={setAllowComments}
            ocid="settings.allow_comments.switch"
          />
          <ToggleRow
            label="Allow tagging in posts"
            description="Others can tag you in their posts"
            checked={allowTagging}
            onCheckedChange={setAllowTagging}
            ocid="settings.allow_tagging.switch"
          />
          <ToggleRow
            label="Make my profile visible to all students"
            description="Anyone at DYP COET can view your profile"
            checked={publicProfile}
            onCheckedChange={setPublicProfile}
            ocid="settings.public_profile.switch"
          />
          <Button
            size="sm"
            className="rounded-xl gap-1.5 text-xs mt-1"
            onClick={handlePrivacySave}
            data-ocid="settings.privacy.save.button"
          >
            <Bell className="h-3.5 w-3.5" />
            Save Settings
          </Button>
        </div>
      </SettingsSection>
    </div>
  );
}
