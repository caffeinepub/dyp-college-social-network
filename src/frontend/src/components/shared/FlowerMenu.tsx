import { AlertCircle, Lightbulb, MessageCircle, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ComplaintBox } from "./ComplaintBox";
import { LiveChat } from "./LiveChat";

interface FlowerMenuProps {
  isDark?: boolean;
}

const PINK_GRADIENT = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
const PINK_PRIMARY = "#2563eb";

const PETALS = [
  {
    id: "complaint",
    icon: AlertCircle,
    color: "#ef4444",
    label: "Complaint",
    offset: { x: 0, y: -70 },
    ocid: "flower-menu.complaint.button" as const,
    ariaLabel: "Open Complaint Box",
  },
  {
    id: "suggestion",
    icon: Lightbulb,
    color: "#f59e0b",
    label: "Suggest",
    offset: { x: 50, y: -50 },
    ocid: "flower-menu.suggestion.button" as const,
    ariaLabel: "Open Suggestion Box",
  },
  {
    id: "chat",
    icon: MessageCircle,
    color: "#3b82f6",
    label: "Chat",
    offset: { x: 70, y: 0 },
    ocid: "flower-menu.chat.button" as const,
    ariaLabel: "Open Live Chat",
  },
] as const;

export function FlowerMenu({ isDark = false }: FlowerMenuProps) {
  const [expanded, setExpanded] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [complaintTab, setComplaintTab] = useState<"complaint" | "suggestion">(
    "complaint",
  );
  const [chatOpen, setChatOpen] = useState(false);

  function handlePetalClick(id: string) {
    setExpanded(false);
    if (id === "complaint") {
      setComplaintTab("complaint");
      setComplaintOpen(true);
    } else if (id === "suggestion") {
      setComplaintTab("suggestion");
      setComplaintOpen(true);
    } else if (id === "chat") {
      setChatOpen(true);
    }
  }

  return (
    <>
      {/* Flower menu anchor at bottom-left */}
      <div className="fixed bottom-6 left-6 z-50" style={{ position: "fixed" }}>
        {/* Relative container so petals can be absolutely positioned */}
        <div className="relative flex items-center justify-center">
          {/* Petal buttons */}
          <AnimatePresence>
            {expanded &&
              PETALS.map((petal, index) => {
                const Icon = petal.icon;
                return (
                  <motion.div
                    key={petal.id}
                    className="absolute flex flex-col items-center gap-0.5"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: petal.offset.x,
                      y: petal.offset.y,
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                      delay: index * 0.05,
                    }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => handlePetalClick(petal.id)}
                      className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        border: `2px solid ${petal.color}`,
                        color: petal.color,
                        backdropFilter: "blur(8px)",
                      }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      data-ocid={petal.ocid}
                      aria-label={petal.ariaLabel}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.button>
                    <span
                      className="text-[9px] font-semibold leading-tight whitespace-nowrap"
                      style={{
                        color: petal.color,
                        textShadow: isDark
                          ? "0 1px 3px rgba(0,0,0,0.8)"
                          : "0 1px 3px rgba(255,255,255,0.9)",
                      }}
                    >
                      {petal.label}
                    </span>
                  </motion.div>
                );
              })}
          </AnimatePresence>

          {/* Main toggle button */}
          <motion.button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg relative"
            style={{
              background: PINK_GRADIENT,
              boxShadow: `0 4px 20px ${PINK_PRIMARY}55`,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            data-ocid="flower-menu.toggle.button"
            aria-label={expanded ? "Close menu" : "Open actions menu"}
            aria-expanded={expanded}
          >
            {/* Pulse ring */}
            {!expanded && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: `2px solid ${PINK_PRIMARY}` }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                transition={{
                  duration: 2.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )}
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {expanded ? (
                <X className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Backdrop to close menu when clicking outside */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Controlled ComplaintBox dialog */}
      <ComplaintBox
        isDark={isDark}
        open={complaintOpen}
        onClose={() => setComplaintOpen(false)}
        defaultTab={complaintTab}
      />

      {/* Controlled LiveChat panel */}
      <LiveChat
        isDark={isDark}
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}
