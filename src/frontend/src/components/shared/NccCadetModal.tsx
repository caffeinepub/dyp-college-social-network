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
import { CheckCircle2, Loader2, Shield } from "lucide-react";
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
  reason: string;
}

interface FormErrors {
  name?: string;
  branch?: string;
  year?: string;
  reason?: string;
}

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  if (!form.branch.trim()) errors.branch = "Branch is required.";
  if (!form.year) errors.year = "Please select your year.";
  if (!form.reason.trim()) errors.reason = "Please tell us your motivation.";
  else if (form.reason.trim().length < 20)
    errors.reason = "Please write at least 20 characters.";
  return errors;
}

export function NccCadetModal({ open, onClose, isDark }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    branch: "",
    year: "",
    reason: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ name: "", branch: "", year: "", reason: "" });
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

  const nccGreen = "#22c55e";
  const nccOrange = "#f97316";
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const inputBorder = isDark
    ? `1px solid ${nccGreen}33`
    : `1px solid ${nccGreen}44`;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-md w-full rounded-2xl border-0 p-0 overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(160deg, #0a1f0f 0%, #111 100%)"
            : "linear-gradient(160deg, #f0fdf4 0%, #fafafa 100%)",
          boxShadow: `0 25px 60px ${nccGreen}22, 0 4px 24px rgba(0,0,0,0.18)`,
          border: `1.5px solid ${nccGreen}33`,
        }}
        data-ocid="ncc-cadet.dialog"
      >
        {/* NCC Tricolor header */}
        <div
          className="px-6 pt-5 pb-4 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${nccGreen}18 0%, ${nccOrange}0d 100%)`,
            borderBottom: `1px solid ${nccGreen}22`,
          }}
        >
          {/* Tricolor stripe decorative element */}
          <div className="absolute top-0 left-0 right-0 flex h-1.5">
            <div className="flex-1" style={{ background: nccOrange }} />
            <div className="flex-1 bg-white" />
            <div className="flex-1" style={{ background: nccGreen }} />
          </div>

          {/* Triangle decorations */}
          <div
            className="absolute -top-3 -right-3 opacity-20"
            style={{
              width: 60,
              height: 60,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: nccGreen,
            }}
          />
          <div
            className="absolute bottom-0 left-8 opacity-10"
            style={{
              width: 35,
              height: 35,
              clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
              background: nccOrange,
            }}
          />

          <DialogHeader className="relative z-10 pt-1">
            <DialogTitle
              className="font-display text-xl flex items-center gap-3"
              style={{ color: isDark ? "#dcfce7" : "#14532d" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${nccGreen}22`,
                  border: `1px solid ${nccGreen}44`,
                }}
              >
                <Shield className="h-4 w-4" style={{ color: nccGreen }} />
              </div>
              Become an NCC Cadet
            </DialogTitle>
            <p
              className="text-sm mt-1"
              style={{
                color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
              }}
            >
              Apply to join the National Cadet Corps
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
                data-ocid="ncc-cadet.success_state"
              >
                {/* Tricolor ring */}
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: `${nccGreen}18`,
                      border: `2px solid ${nccGreen}55`,
                    }}
                  >
                    <CheckCircle2
                      className="h-7 w-7"
                      style={{ color: nccGreen }}
                    />
                  </div>
                  <div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
                    style={{ background: nccOrange }}
                  />
                </div>
                <p
                  className="font-display font-bold text-lg"
                  style={{ color: isDark ? "#dcfce7" : "#14532d" }}
                >
                  Application Submitted!
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: isDark
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(0,0,0,0.5)",
                  }}
                >
                  Your application to become an NCC Cadet has been submitted!
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
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="cadet-name"
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.55)",
                    }}
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="cadet-name"
                    placeholder="e.g. Rahul Verma"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="rounded-xl text-sm h-10 border-0 focus-visible:ring-1"
                    style={{
                      background: inputBg,
                      border: inputBorder,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      ["--tw-ring-color" as string]: `${nccGreen}66`,
                    }}
                    data-ocid="ncc-cadet.name.input"
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
                    htmlFor="cadet-branch"
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
                    id="cadet-branch"
                    placeholder="e.g. Mechanical Engineering"
                    value={form.branch}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, branch: e.target.value }))
                    }
                    className="rounded-xl text-sm h-10 border-0 focus-visible:ring-1"
                    style={{
                      background: inputBg,
                      border: inputBorder,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      ["--tw-ring-color" as string]: `${nccGreen}66`,
                    }}
                    data-ocid="ncc-cadet.branch.input"
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
                        ["--tw-ring-color" as string]: `${nccGreen}66`,
                      }}
                      data-ocid="ncc-cadet.year.select"
                    >
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent
                      className="rounded-xl"
                      style={{
                        background: isDark ? "#1e1e1e" : "#f0fdf4",
                        border: `1px solid ${nccGreen}33`,
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

                {/* Reason */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="cadet-reason"
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.55)",
                    }}
                  >
                    Why do you want to become an NCC Cadet? *
                  </Label>
                  <Textarea
                    id="cadet-reason"
                    placeholder="Share your motivation and what NCC means to you (min. 20 characters)..."
                    value={form.reason}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, reason: e.target.value }))
                    }
                    rows={3}
                    className="rounded-xl text-sm resize-none border-0 focus-visible:ring-1"
                    style={{
                      background: inputBg,
                      border: inputBorder,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      ["--tw-ring-color" as string]: `${nccGreen}66`,
                    }}
                    data-ocid="ncc-cadet.reason.textarea"
                  />
                  {errors.reason && (
                    <p className="text-xs" style={{ color: "#ef4444" }}>
                      {errors.reason}
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
                    data-ocid="ncc-cadet.cancel.button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-xl h-10 text-sm font-semibold text-white border-0"
                    style={{
                      background: `linear-gradient(135deg, ${nccGreen} 0%, #16a34a 100%)`,
                      boxShadow: `0 4px 16px ${nccGreen}44`,
                    }}
                    data-ocid="ncc-cadet.submit.button"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-1.5 h-3.5 w-3.5" />
                        Apply to Join NCC
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
