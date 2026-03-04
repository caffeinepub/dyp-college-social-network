import type { GitHubProject } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAddGitHubProject } from "@/hooks/useQueries";
import { formatRelativeTime } from "@/utils/time";
import { ExternalLink, Github, Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  projects: GitHubProject[];
}

export function GitHubModal({ open, onClose, projects }: Props) {
  const { t } = useLanguage();
  const addProject = useAddGitHubProject();
  const [form, setForm] = useState({
    title: "",
    repoUrl: "",
    authorName: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.repoUrl || !form.authorName) return;
    try {
      await addProject.mutateAsync(form);
      setForm({ title: "", repoUrl: "", authorName: "", description: "" });
      toast.success("Project submitted successfully!");
    } catch {
      toast.error("Failed to submit project.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="bubble-card-lg border-0 max-w-lg max-h-[85vh] flex flex-col"
        data-ocid="github.modal"
      >
        <DialogHeader className="shrink-0">
          <DialogTitle className="font-display text-xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-foreground/10 flex items-center justify-center">
              <Github className="h-4.5 w-4.5" />
            </div>
            {t("githubShowcase")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          {/* Projects List */}
          <ScrollArea className="flex-1 max-h-[280px]">
            <div className="space-y-2.5 pr-2">
              {projects.length === 0 ? (
                <div
                  className="text-center py-8 text-sm text-muted-foreground"
                  data-ocid="github.empty_state"
                >
                  No projects yet. Be the first to showcase!
                </div>
              ) : (
                projects.map((p, i) => (
                  <a
                    key={p.id.toString()}
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-accent/40 hover:bg-accent/70 transition-all duration-200 group block"
                    data-ocid={`github.item.${i + 1}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0">
                      <Star className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm truncate">
                          {p.title}
                        </p>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        by {p.authorName} · {formatRelativeTime(p.timestamp)}
                      </p>
                      {p.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))
              )}
            </div>
          </ScrollArea>

          <Separator className="opacity-50" />

          {/* Submit Form */}
          <form onSubmit={handleSubmit} className="space-y-3 shrink-0">
            <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              {t("submitProject")}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  {t("projectTitle")} *
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="My Awesome Project"
                  className="rounded-xl text-sm h-9"
                  data-ocid="github.title.input"
                  required
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  {t("authorName")} *
                </Label>
                <Input
                  value={form.authorName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, authorName: e.target.value }))
                  }
                  placeholder="Your Name"
                  className="rounded-xl text-sm h-9"
                  data-ocid="github.author.input"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                {t("repoUrl")} *
              </Label>
              <Input
                value={form.repoUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, repoUrl: e.target.value }))
                }
                placeholder="https://github.com/username/repo"
                className="rounded-xl text-sm h-9"
                data-ocid="github.url.input"
                type="url"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                {t("description")}
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Brief description of your project..."
                className="rounded-xl text-sm resize-none h-16"
                data-ocid="github.description.textarea"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-xl"
                data-ocid="github.cancel.button"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                size="sm"
                className="gradient-btn rounded-xl px-4"
                disabled={addProject.isPending}
                data-ocid="github.submit.button"
              >
                {addProject.isPending ? "Submitting..." : t("submit")}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
