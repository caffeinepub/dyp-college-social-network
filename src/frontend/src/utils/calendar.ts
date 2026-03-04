import type { Post } from "../backend";

function formatICSDate(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

export function downloadICS(post: Post) {
  const eventDateMs = post.eventDate
    ? Number(post.eventDate) / 1_000_000
    : Date.now() + 3600_000;

  const startDate = formatICSDate(eventDateMs);
  const endDate = formatICSDate(eventDateMs + 3600_000); // +1hr
  const now = formatICSDate(Date.now());

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DYP College//Social Network//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:dyp-event-${post.id}@dypcet.ac.in`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${post.title}`,
    `DESCRIPTION:${post.body.replace(/\n/g, "\\n")}`,
    `ORGANIZER;CN=${post.authorName}:MAILTO:events@dypcet.ac.in`,
    "LOCATION:D.Y. Patil College of Engineering and Technology",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${post.title.replace(/\s+/g, "_")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
