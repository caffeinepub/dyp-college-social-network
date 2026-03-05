import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, SendHorizonal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Abusive word filter ──────────────────────────────────────────────────────

const BLOCKED_WORDS = [
  "fuck",
  "shit",
  "bitch",
  "ass",
  "bastard",
  "damn",
  "crap",
  "dick",
  "pussy",
  "cock",
  "whore",
  "slut",
  "retard",
  "nigga",
  "nigger",
  "faggot",
  "fag",
  "cunt",
  "piss",
  "idiot",
  "stupid",
  "loser",
  "hate",
  "kill",
  "die",
];

function filterMessage(text: string): string {
  let result = text;
  for (const word of BLOCKED_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(
      regex,
      (match) => match[0] + "*".repeat(match.length - 1),
    );
  }
  return result;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isSelf: boolean;
}

const AVATAR_COLORS = [
  "#f472b6",
  "#a78bfa",
  "#34d399",
  "#60a5fa",
  "#fb923c",
  "#e879f9",
  "#4ade80",
  "#38bdf8",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const SEED_MESSAGES: ChatMessage[] = [
  {
    id: "seed-1",
    senderName: "Rohan M.",
    text: "Hey everyone! 👋",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    isSelf: false,
  },
  {
    id: "seed-2",
    senderName: "Shreya K.",
    text: "Excited for the upcoming tech fest! 🎉",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    isSelf: false,
  },
  {
    id: "seed-3",
    senderName: "Arnav P.",
    text: "Anyone joining the GDG event this Saturday? 💻",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    isSelf: false,
  },
];

const PINK_PRIMARY = "#db2777";

// ─── LiveChat ─────────────────────────────────────────────────────────────────

interface LiveChatProps {
  isDark?: boolean;
  open: boolean;
  onClose: () => void;
}

export function LiveChat({ isDark = false, open, onClose }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES);
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  // biome-ignore lint/correctness/useExhaustiveDependencies: messages triggers scroll
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  function handleSetName(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setUserName(trimmed);
    setNameSet(true);
  }

  function handleSendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    const raw = messageInput.trim();
    if (!raw || !nameSet) return;
    const filtered = filterMessage(raw);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: userName,
      text: filtered,
      timestamp: new Date(),
      isSelf: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessageInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  const bubbleBg = isDark ? "rgba(15,15,25,0.97)" : "rgba(255,255,255,0.98)";

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-20 left-20 z-50 w-80 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: bubbleBg,
              boxShadow: `0 20px 60px ${PINK_PRIMARY}25, 0 4px 24px rgba(0,0,0,0.15)`,
              border: `1.5px solid ${PINK_PRIMARY}33`,
              maxHeight: "min(430px, 70vh)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            data-ocid="live-chat.panel"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background: `linear-gradient(135deg, ${PINK_PRIMARY}22 0%, #f472b622 100%)`,
                borderBottom: `1px solid ${PINK_PRIMARY}22`,
              }}
            >
              <div className="flex items-center gap-2">
                <MessageCircle
                  className="h-4 w-4"
                  style={{ color: PINK_PRIMARY }}
                />
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: isDark ? "#fce7f3" : "#831843" }}
                >
                  Live Chat
                </span>
                {/* Live badge */}
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-white flex items-center gap-1"
                  style={{ background: "#22c55e" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  Live
                </span>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                  color: isDark ? "#f8fafc" : "#374151",
                }}
                data-ocid="live-chat.close.button"
                aria-label="Close chat"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
              style={{ minHeight: 200 }}
              data-ocid="live-chat.messages.list"
            >
              {messages.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full py-8 text-center"
                  data-ocid="live-chat.empty_state"
                >
                  <MessageCircle
                    className="h-8 w-8 mb-2 opacity-20"
                    style={{ color: PINK_PRIMARY }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.35)"
                        : "rgba(0,0,0,0.35)",
                    }}
                  >
                    No messages yet. Say hello!
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const avatarColor = getAvatarColor(msg.senderName);
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${msg.isSelf ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      <div
                        className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs"
                        style={{ background: avatarColor }}
                      >
                        {msg.senderName[0].toUpperCase()}
                      </div>
                      <div
                        className={`flex flex-col max-w-[75%] ${msg.isSelf ? "items-end" : "items-start"}`}
                      >
                        <span
                          className="text-[10px] font-semibold mb-0.5"
                          style={{
                            color: msg.isSelf
                              ? PINK_PRIMARY
                              : isDark
                                ? "rgba(255,255,255,0.55)"
                                : "rgba(0,0,0,0.5)",
                          }}
                        >
                          {msg.isSelf ? "You" : msg.senderName}
                        </span>
                        <div
                          className="px-3 py-2 rounded-2xl text-xs leading-relaxed"
                          style={{
                            background: msg.isSelf
                              ? `linear-gradient(135deg, ${PINK_PRIMARY} 0%, #9d174d 100%)`
                              : isDark
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(0,0,0,0.05)",
                            color: msg.isSelf
                              ? "#fff"
                              : isDark
                                ? "#f1f5f9"
                                : "#0f172a",
                            borderBottomRightRadius: msg.isSelf ? 4 : undefined,
                            borderBottomLeftRadius: !msg.isSelf ? 4 : undefined,
                          }}
                        >
                          {msg.text}
                        </div>
                        <span
                          className="text-[9px] mt-0.5"
                          style={{
                            color: isDark
                              ? "rgba(255,255,255,0.28)"
                              : "rgba(0,0,0,0.3)",
                          }}
                        >
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div
              className="px-3 py-3 shrink-0"
              style={{
                borderTop: `1px solid ${PINK_PRIMARY}18`,
                background: isDark
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(0,0,0,0.01)",
              }}
            >
              {!nameSet ? (
                /* Name setup */
                <form onSubmit={handleSetName} className="flex gap-2">
                  <Input
                    placeholder="Enter your name to chat..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="flex-1 rounded-xl text-xs h-9 border-0 focus-visible:ring-1"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.07)"
                        : "rgba(0,0,0,0.04)",
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      border: `1px solid ${PINK_PRIMARY}33`,
                      ["--tw-ring-color" as string]: `${PINK_PRIMARY}55`,
                    }}
                    data-ocid="live-chat.name.input"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-xl h-9 text-xs font-semibold text-white px-3 border-0"
                    style={{
                      background: `linear-gradient(135deg, ${PINK_PRIMARY} 0%, #9d174d 100%)`,
                    }}
                    data-ocid="live-chat.set-name.button"
                  >
                    Set Name
                  </Button>
                </form>
              ) : (
                /* Message input */
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 rounded-xl text-xs h-9 border-0 focus-visible:ring-1"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.07)"
                        : "rgba(0,0,0,0.04)",
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      border: `1px solid ${PINK_PRIMARY}33`,
                      ["--tw-ring-color" as string]: `${PINK_PRIMARY}55`,
                    }}
                    data-ocid="live-chat.message.input"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!messageInput.trim()}
                    className="rounded-xl h-9 w-9 p-0 flex items-center justify-center text-white border-0 shrink-0"
                    style={{
                      background: messageInput.trim()
                        ? `linear-gradient(135deg, ${PINK_PRIMARY} 0%, #9d174d 100%)`
                        : isDark
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.07)",
                    }}
                    data-ocid="live-chat.send.button"
                    aria-label="Send message"
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </Button>
                </form>
              )}
              {nameSet && (
                <p
                  className="text-[9px] mt-1.5 text-center"
                  style={{
                    color: isDark
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(0,0,0,0.28)",
                  }}
                >
                  Chatting as{" "}
                  <strong style={{ color: PINK_PRIMARY }}>{userName}</strong>
                  {" · "}Abusive language is filtered
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
