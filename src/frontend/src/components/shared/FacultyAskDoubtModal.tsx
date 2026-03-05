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
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  primaryColor: string;
  isDark: boolean;
}

interface FormState {
  name: string;
  branch: string;
  year: string;
  teacher: string;
  question: string;
}

interface FormErrors {
  name?: string;
  branch?: string;
  year?: string;
  teacher?: string;
  question?: string;
}

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const TEACHERS = [
  "Dr. A. Patil",
  "Prof. S. Kulkarni",
  "Dr. R. Sharma",
  "Prof. M. Desai",
  "Dr. P. Joshi",
  "Prof. N. Sawant",
  "Dr. K. Mehta",
  "Prof. V. Iyer",
  "Dr. L. Rao",
  "Prof. H. Singh",
];

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.branch.trim()) errors.branch = "Branch is required.";
  if (!form.year) errors.year = "Please select your year.";
  if (!form.teacher) errors.teacher = "Please select a teacher.";
  if (!form.question.trim()) errors.question = "Please enter your doubt.";
  else if (form.question.trim().length < 10)
    errors.question = "Please write at least 10 characters.";
  return errors;
}

export function FacultyAskDoubtModal({ open, onClose, isDark }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    branch: "",
    year: "",
    teacher: "",
    question: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ name: "", branch: "", year: "", teacher: "", question: "" });
      setErrors({});
      setSubmitting(false);
      setSubmitted(false);
    }
  }, [open]);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => onClose(), 2400);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

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

  const mustard = "#ca8a04";
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const inputBorder = isDark
    ? `1px solid ${mustard}33`
    : `1px solid ${mustard}44`;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-md w-full rounded-2xl border-0 p-0 overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(160deg, #1a1000 0%, #111 100%)"
            : "linear-gradient(160deg, #fffbeb 0%, #fafafa 100%)",
          boxShadow: `0 25px 60px ${mustard}22, 0 4px 24px rgba(0,0,0,0.18)`,
          border: `1.5px solid ${mustard}33`,
        }}
        data-ocid="faculty-doubt.dialog"
      >
        {/* Mustard header strip */}
        <div
          className="px-6 pt-5 pb-4 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${mustard}22 0%, ${mustard}0d 100%)`,
            borderBottom: `1px solid ${mustard}22`,
          }}
        >
          {/* Decorative triangles */}
          <div
            className="absolute -top-3 -right-3 opacity-20"
            style={{
              width: 60,
              height: 60,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: mustard,
            }}
          />
          <div
            className="absolute bottom-0 left-8 opacity-10"
            style={{
              width: 35,
              height: 35,
              clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
              background: mustard,
            }}
          />
          {/* Book decoration */}
          <div
            className="absolute -top-2 right-16 w-16 h-16 rounded-full opacity-10"
            style={{ background: mustard }}
          />

          <DialogHeader className="relative z-10">
            <DialogTitle
              className="font-display text-xl flex items-center gap-3"
              style={{ color: isDark ? "#fef3c7" : "#78350f" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${mustard}22`,
                  border: `1px solid ${mustard}44`,
                }}
              >
                <BookOpen className="h-4 w-4" style={{ color: mustard }} />
              </div>
              Ask a Doubt
            </DialogTitle>
            <p
              className="text-sm mt-1"
              style={{
                color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
              }}
            >
              Submit your question to a faculty member
            </p>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 pt-4 pb-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="flex flex-col items-center gap-3 py-8 text-center"
                data-ocid="faculty-doubt.success_state"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: `${mustard}18`,
                    border: `2px solid ${mustard}55`,
                  }}
                >
                  <CheckCircle2
                    className="h-7 w-7"
                    style={{ color: mustard }}
                  />
                </div>
                <p
                  className="font-display font-bold text-lg"
                  style={{ color: isDark ? "#fef3c7" : "#78350f" }}
                >
                  Doubt Submitted!
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: isDark
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(0,0,0,0.5)",
                  }}
                >
                  Your doubt has been submitted! The teacher will respond soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                {/* Student Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="doubt-name"
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.55)",
                    }}
                  >
                    Student Name *
                  </Label>
                  <Input
                    id="doubt-name"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="rounded-xl text-sm h-10 border-0 focus-visible:ring-1"
                    style={{
                      background: inputBg,
                      border: inputBorder,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      ["--tw-ring-color" as string]: `${mustard}66`,
                    }}
                    data-ocid="faculty-doubt.name.input"
                  />
                  {errors.name && (
                    <p className="text-xs" style={{ color: "#ef4444" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Branch */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="doubt-branch"
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.55)",
                    }}
                  >
                    Branch *
                  </Label>
                  <Input
                    id="doubt-branch"
                    placeholder="e.g. Computer Engineering"
                    value={form.branch}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, branch: e.target.value }))
                    }
                    className="rounded-xl text-sm h-10 border-0 focus-visible:ring-1"
                    style={{
                      background: inputBg,
                      border: inputBorder,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      ["--tw-ring-color" as string]: `${mustard}66`,
                    }}
                    data-ocid="faculty-doubt.branch.input"
                  />
                  {errors.branch && (
                    <p className="text-xs" style={{ color: "#ef4444" }}>
                      {errors.branch}
                    </p>
                  )}
                </div>

                {/* Year */}
                <div className="space-y-1.5">
                  <Label
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.55)",
                    }}
                  >
                    Year *
                  </Label>
                  <Select
                    value={form.year}
                    onValueChange={(val) =>
                      setForm((prev) => ({ ...prev, year: val }))
                    }
                  >
                    <SelectTrigger
                      className="rounded-xl text-sm h-10 border-0 focus:ring-1 w-full"
                      style={{
                        background: inputBg,
                        border: inputBorder,
                        color: form.year
                          ? isDark
                            ? "#f1f5f9"
                            : "#0f172a"
                          : isDark
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(0,0,0,0.35)",
                        ["--tw-ring-color" as string]: `${mustard}66`,
                      }}
                      data-ocid="faculty-doubt.year.select"
                    >
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent
                      className="rounded-xl"
                      style={{
                        background: isDark ? "#1e1e1e" : "#fffbeb",
                        border: `1px solid ${mustard}33`,
                      }}
                    >
                      {YEARS.map((yr) => (
                        <SelectItem
                          key={yr}
                          value={yr}
                          className="rounded-lg text-sm"
                        >
                          {yr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.year && (
                    <p className="text-xs" style={{ color: "#ef4444" }}>
                      {errors.year}
                    </p>
                  )}
                </div>

                {/* Select Teacher */}
                <div className="space-y-1.5">
                  <Label
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.55)",
                    }}
                  >
                    Select Teacher *
                  </Label>
                  <Select
                    value={form.teacher}
                    onValueChange={(val) =>
                      setForm((prev) => ({ ...prev, teacher: val }))
                    }
                  >
                    <SelectTrigger
                      className="rounded-xl text-sm h-10 border-0 focus:ring-1 w-full"
                      style={{
                        background: inputBg,
                        border: inputBorder,
                        color: form.teacher
                          ? isDark
                            ? "#f1f5f9"
                            : "#0f172a"
                          : isDark
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(0,0,0,0.35)",
                        ["--tw-ring-color" as string]: `${mustard}66`,
                      }}
                      data-ocid="faculty-doubt.teacher.select"
                    >
                      <SelectValue placeholder="Choose a teacher" />
                    </SelectTrigger>
                    <SelectContent
                      className="rounded-xl"
                      style={{
                        background: isDark ? "#1e1e1e" : "#fffbeb",
                        border: `1px solid ${mustard}33`,
                      }}
                    >
                      {TEACHERS.map((t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          className="rounded-lg text-sm"
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.teacher && (
                    <p className="text-xs" style={{ color: "#ef4444" }}>
                      {errors.teacher}
                    </p>
                  )}
                </div>

                {/* Doubt / Question */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="doubt-question"
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.55)",
                    }}
                  >
                    Your Doubt / Question *
                  </Label>
                  <Textarea
                    id="doubt-question"
                    placeholder="Describe your doubt clearly (min. 10 characters)..."
                    value={form.question}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, question: e.target.value }))
                    }
                    rows={3}
                    className="rounded-xl text-sm resize-none border-0 focus-visible:ring-1"
                    style={{
                      background: inputBg,
                      border: inputBorder,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      ["--tw-ring-color" as string]: `${mustard}66`,
                    }}
                    data-ocid="faculty-doubt.question.textarea"
                  />
                  {errors.question && (
                    <p className="text-xs" style={{ color: "#ef4444" }}>
                      {errors.question}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="flex-1 rounded-xl h-10 text-sm"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(0,0,0,0.45)",
                    }}
                    data-ocid="faculty-doubt.cancel.button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-xl h-10 text-sm font-semibold text-white border-0"
                    style={{
                      background: `linear-gradient(135deg, ${mustard} 0%, #92400e 100%)`,
                      boxShadow: `0 4px 16px ${mustard}44`,
                    }}
                    data-ocid="faculty-doubt.submit.button"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                        Submit Doubt
                      </>
                    )}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
