import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Bell,
  BookOpen,
  Calendar,
  Github,
  Globe,
  HelpCircle,
  Sun,
  Users,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const helpItems = [
  { icon: BookOpen, key: "helpItem1" as const },
  { icon: Users, key: "helpItem2" as const },
  { icon: Bell, key: "helpItem3" as const },
  { icon: Github, key: "helpItem4" as const },
  { icon: Calendar, key: "helpItem5" as const },
  { icon: Sun, key: "helpItem6" as const },
  { icon: Globe, key: "helpItem7" as const },
];

export function HelpModal({ open, onClose }: Props) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="bubble-card-lg border-0 max-w-md"
        data-ocid="help.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-4.5 w-4.5 text-primary" />
            </div>
            {t("helpTitle")}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground -mt-1 mb-2">
          {t("helpDesc")}
        </p>

        <div className="space-y-2.5">
          {helpItems.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="flex items-start gap-3 p-3 rounded-xl bg-accent/40 hover:bg-accent/60 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {t(key)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-2">
          <Button
            onClick={onClose}
            className="gradient-btn px-5"
            data-ocid="help.close.button"
          >
            {t("close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
