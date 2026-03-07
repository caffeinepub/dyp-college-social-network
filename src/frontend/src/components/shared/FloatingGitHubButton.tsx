import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGitHubProjects } from "@/hooks/useQueries";
import { Github, Globe } from "lucide-react";
import { useState } from "react";
import { GitHubModal } from "./GitHubModal";

export function FloatingGitHubButton() {
  const [open, setOpen] = useState(false);
  const { data: projects = [] } = useGitHubProjects();
  const { t } = useLanguage();

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2">
        {/* Visit GitHub.com button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 opacity-90 hover:opacity-100 github-float-1"
                style={{ background: "var(--gradient-primary)" }}
                data-ocid="github.visit-website.button"
                aria-label="Visit GitHub.com"
              >
                <Globe className="h-4 w-4 text-white" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left" className="rounded-xl">
              <p className="text-xs font-medium">Visit GitHub.com</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Student Project Showcase button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 opacity-90 hover:opacity-100 relative github-float-2"
                style={{ background: "var(--gradient-primary)" }}
                data-ocid="github.open_modal_button"
                aria-label={t("githubShowcase")}
              >
                <Github className="h-4 w-4 text-white" />
                {projects.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-bold bg-white text-primary rounded-full flex items-center justify-center leading-none shadow-sm">
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
      </div>

      <GitHubModal
        open={open}
        onClose={() => setOpen(false)}
        projects={projects}
      />
    </>
  );
}
