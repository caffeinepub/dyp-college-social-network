import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGitHubProjects } from "@/hooks/useQueries";
import { Github } from "lucide-react";
import { useState } from "react";
import { GitHubModal } from "./GitHubModal";

export function FloatingGitHubButton() {
  const [open, setOpen] = useState(false);
  const { data: projects = [] } = useGitHubProjects();
  const { t } = useLanguage();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl flex items-center justify-center shadow-bubble-lg transition-all duration-300 hover:scale-110 hover:shadow-bubble-lg animate-float"
              style={{ background: "var(--gradient-primary)" }}
              data-ocid="github.open_modal_button"
              aria-label={t("githubShowcase")}
            >
              <Github className="h-6 w-6 text-white" />
              {projects.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold bg-white text-primary rounded-full flex items-center justify-center leading-none shadow-sm">
                  {projects.length > 9 ? "9+" : projects.length}
                </span>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="rounded-xl">
            <p className="text-xs font-medium">{t("githubShowcase")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <GitHubModal
        open={open}
        onClose={() => setOpen(false)}
        projects={projects}
      />
    </>
  );
}
