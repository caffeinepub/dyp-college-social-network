import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const COMPLAINT_CATEGORIES = [
  "Academic Issue",
  "Facility Problem",
  "Administrative Issue",
  "Faculty Concern",
  "Other",
];

const SUGGESTION_CATEGORIES = [
  "Academic Improvement",
  "Facility Suggestion",
  "Event Idea",
  "General Suggestion",
  "Other",
];

interface FormState {
  name: string;
  rollNo: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  rollNo?: string;
  category?: string;
  message?: string;
}

const PINK_PRIMARY = "#db2777";
const PINK_LIGHT = "#fce7f3";

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.rollNo.trim()) errors.rollNo = "Roll No. is required.";
  if (!form.category) errors.category = "Please select a category.";
  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 20)
    errors.message = "Please write at least 20 characters.";
  return errors;
}

function ComplaintForm({
  tab,
  isDark,
}: {
  tab: "complaint" | "suggestion";
  isDark: boolean;
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    rollNo: "",
    category: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset when tab changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: tab is a prop, setState fns are stable
  useEffect(() => {
    setForm({ name: "", rollNo: "", category: "", message: "" });
    setErrors({});
    setSubmitting(false);
    setSubmitted(false);
  }, [tab]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  }

  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const inputBorder = isDark
    ? `1px solid ${PINK_PRIMARY}33`
    : `1px solid ${PINK_PRIMARY}44`;
  const categories =
    tab === "complaint" ? COMPLAINT_CATEGORIES : SUGGESTION_CATEGORIES;
  const placeholder =
    tab === "complaint"
      ? "Describe your complaint clearly (min. 20 characters)..."
      : "Share your suggestion or idea (min. 20 characters)...";

  if (submitted) {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="flex flex-col items-center gap-3 py-8 text-center"
        data-ocid="complaint-box.success_state"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: `${PINK_PRIMARY}18`,
            border: `2px solid ${PINK_PRIMARY}55`,
          }}
        >
          <CheckCircle2 className="h-7 w-7" style={{ color: PINK_PRIMARY }} />
        </div>
        <p
          className="font-display font-bold text-lg"
          style={{ color: isDark ? "#fce7f3" : "#831843" }}
        >
          Submitted!
        </p>
        <p
          className="text-sm"
          style={{
            color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
          }}
        >
          Thank you for your feedback. We value your input!
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="mt-2 rounded-xl text-xs"
          style={{ color: PINK_PRIMARY }}
          onClick={() => setSubmitted(false)}
        >
          Submit Another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Name */}
      <div className="space-y-1.5">
        <Label
          htmlFor={`${tab}-name`}
          className="text-xs font-semibold uppercase tracking-wide"
          style={{
            color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
          }}
        >
          Your Name *
        </Label>
        <Input
          id={`${tab}-name`}
          placeholder="e.g. Anjali Patil"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          className="rounded-xl text-sm h-10 border-0 focus-visible:ring-1"
          style={{
            background: inputBg,
            border: inputBorder,
            color: isDark ? "#f1f5f9" : "#0f172a",
            ["--tw-ring-color" as string]: `${PINK_PRIMARY}66`,
          }}
          data-ocid="complaint-box.name.input"
        />
        {errors.name && (
          <p className="text-xs" style={{ color: "#ef4444" }}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Roll No */}
      <div className="space-y-1.5">
        <Label
          htmlFor={`${tab}-rollno`}
          className="text-xs font-semibold uppercase tracking-wide"
          style={{
            color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
          }}
        >
          Roll No. *
        </Label>
        <Input
          id={`${tab}-rollno`}
          placeholder="e.g. 2021BTCS001"
          value={form.rollNo}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, rollNo: e.target.value }))
          }
          className="rounded-xl text-sm h-10 border-0 focus-visible:ring-1"
          style={{
            background: inputBg,
            border: inputBorder,
            color: isDark ? "#f1f5f9" : "#0f172a",
            ["--tw-ring-color" as string]: `${PINK_PRIMARY}66`,
          }}
          data-ocid="complaint-box.rollno.input"
        />
        {errors.rollNo && (
          <p className="text-xs" style={{ color: "#ef4444" }}>
            {errors.rollNo}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label
          className="text-xs font-semibold uppercase tracking-wide"
          style={{
            color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
          }}
        >
          Category *
        </Label>
        <Select
          value={form.category}
          onValueChange={(val) =>
            setForm((prev) => ({ ...prev, category: val }))
          }
        >
          <SelectTrigger
            className="rounded-xl text-sm h-10 border-0 focus:ring-1 w-full"
            style={{
              background: inputBg,
              border: inputBorder,
              color: form.category
                ? isDark
                  ? "#f1f5f9"
                  : "#0f172a"
                : isDark
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.35)",
              ["--tw-ring-color" as string]: `${PINK_PRIMARY}66`,
            }}
            data-ocid="complaint-box.category.select"
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent
            className="rounded-xl"
            style={{
              background: isDark ? "#1e1e1e" : "#fce7f3",
              border: `1px solid ${PINK_PRIMARY}33`,
            }}
          >
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="rounded-lg text-sm">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs" style={{ color: "#ef4444" }}>
            {errors.category}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label
          htmlFor={`${tab}-message`}
          className="text-xs font-semibold uppercase tracking-wide"
          style={{
            color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
          }}
        >
          {tab === "complaint" ? "Your Complaint *" : "Your Suggestion *"}
        </Label>
        <Textarea
          id={`${tab}-message`}
          placeholder={placeholder}
          value={form.message}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
          rows={3}
          className="rounded-xl text-sm resize-none border-0 focus-visible:ring-1"
          style={{
            background: inputBg,
            border: inputBorder,
            color: isDark ? "#f1f5f9" : "#0f172a",
            ["--tw-ring-color" as string]: `${PINK_PRIMARY}66`,
          }}
          data-ocid="complaint-box.message.textarea"
        />
        {errors.message && (
          <p className="text-xs" style={{ color: "#ef4444" }}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 pt-1">
        <Button
          type="button"
          variant="ghost"
          className="flex-1 rounded-xl h-10 text-sm"
          style={{
            color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
          }}
          data-ocid="complaint-box.cancel.button"
          onClick={() => {
            setForm({ name: "", rollNo: "", category: "", message: "" });
            setErrors({});
          }}
        >
          Clear
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-xl h-10 text-sm font-semibold text-white border-0"
          style={{
            background: `linear-gradient(135deg, ${PINK_PRIMARY} 0%, #9d174d 100%)`,
            boxShadow: `0 4px 16px ${PINK_PRIMARY}44`,
          }}
          data-ocid="complaint-box.submit.button"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
              {tab === "complaint" ? "Submit Complaint" : "Submit Suggestion"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

interface ComplaintBoxProps {
  isDark?: boolean;
  open: boolean;
  onClose: () => void;
  defaultTab?: "complaint" | "suggestion";
}

export function ComplaintBox({
  isDark = false,
  open,
  onClose,
  defaultTab = "complaint",
}: ComplaintBoxProps) {
  const [activeTab, setActiveTab] = useState<"complaint" | "suggestion">(
    defaultTab,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: sync tab when modal opens with a defaultTab
  useEffect(() => {
    if (open && defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);

  return (
    <>
      {/* Dialog */}
      <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
        <DialogContent
          className="max-w-md w-full rounded-2xl border-0 p-0 overflow-hidden"
          style={{
            background: isDark
              ? "linear-gradient(160deg, #1f0015 0%, #111 100%)"
              : "linear-gradient(160deg, #fff 0%, #fce7f3 100%)",
            boxShadow: `0 25px 60px ${PINK_PRIMARY}22, 0 4px 24px rgba(0,0,0,0.18)`,
            border: `1.5px solid ${PINK_PRIMARY}33`,
          }}
          data-ocid="complaint-box.dialog"
        >
          {/* Pink gradient header */}
          <div
            className="px-6 pt-5 pb-4 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${PINK_PRIMARY}22 0%, #f472b622 100%)`,
              borderBottom: `1px solid ${PINK_PRIMARY}22`,
            }}
          >
            {/* Decorative bubble circles */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${PINK_PRIMARY}, transparent 70%)`,
              }}
            />
            <div
              className="absolute top-2 right-16 w-8 h-8 rounded-full opacity-15"
              style={{ background: "#f472b6" }}
            />
            <div
              className="absolute -bottom-3 left-12 w-14 h-14 rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, #f472b6, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-2 right-8 w-5 h-5 rounded-full opacity-25"
              style={{ background: PINK_PRIMARY }}
            />

            <DialogHeader className="relative z-10">
              <DialogTitle
                className="font-display text-xl flex items-center gap-3"
                style={{ color: isDark ? "#fce7f3" : "#831843" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${PINK_PRIMARY}22`,
                    border: `1px solid ${PINK_PRIMARY}44`,
                  }}
                >
                  <AlertCircle
                    className="h-4 w-4"
                    style={{ color: PINK_PRIMARY }}
                  />
                </div>
                Complaint &amp; Suggestion Box
              </DialogTitle>
              <p
                className="text-sm mt-1"
                style={{
                  color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                }}
              >
                Your voice matters. All submissions are anonymous
              </p>
            </DialogHeader>
          </div>

          {/* Body with tabs */}
          <div className="px-6 pt-4 pb-6">
            <Tabs
              value={activeTab}
              onValueChange={(v) =>
                setActiveTab(v as "complaint" | "suggestion")
              }
            >
              <TabsList
                className="w-full mb-4 rounded-xl p-1 h-auto"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : `${PINK_LIGHT}`,
                  border: `1px solid ${PINK_PRIMARY}22`,
                }}
              >
                <TabsTrigger
                  value="complaint"
                  className="flex-1 rounded-lg text-sm data-[state=active]:shadow-sm"
                  style={{
                    color:
                      activeTab === "complaint"
                        ? "#fff"
                        : isDark
                          ? "rgba(255,255,255,0.55)"
                          : "#831843",
                  }}
                  data-ocid="complaint-box.complaint.tab"
                >
                  🚨 Complaint
                </TabsTrigger>
                <TabsTrigger
                  value="suggestion"
                  className="flex-1 rounded-lg text-sm data-[state=active]:shadow-sm"
                  style={{
                    color:
                      activeTab === "suggestion"
                        ? "#fff"
                        : isDark
                          ? "rgba(255,255,255,0.55)"
                          : "#831843",
                  }}
                  data-ocid="complaint-box.suggestion.tab"
                >
                  💡 Suggestion Box
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="complaint" className="mt-0">
                  <motion.div
                    key="complaint"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <ComplaintForm tab="complaint" isDark={isDark} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="suggestion" className="mt-0">
                  <motion.div
                    key="suggestion"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <ComplaintForm tab="suggestion" isDark={isDark} />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
