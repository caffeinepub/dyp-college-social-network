import { type Club, type Post, PostCategory } from "@/backend";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatRelativeTime } from "@/utils/time";
import { Clock, User } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import { EventActionButtons } from "./EventActionButtons";

interface Props {
  post: Post;
  clubs: Club[];
  index: number;
}

const categoryColors: Record<PostCategory, string> = {
  [PostCategory.Event]:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  [PostCategory.Announcement]:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
  [PostCategory.Update]:
    "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-200",
};

export function PostCard({ post, clubs, index }: Props) {
  const club = clubs.find((c) => c.id === post.clubId);

  return (
    <Card
      className="neo-card overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      data-ocid={`home.posts.item.${index}`}
    >
      {post.imageUrl && (
        <div className="relative h-40 overflow-hidden rounded-t-2xl">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category]}`}
            >
              {post.category}
            </span>
            {club && (
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {club.name}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(post.timestamp)}
          </span>
        </div>
        <h3 className="font-display font-bold text-base text-card-foreground leading-snug mt-1.5">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {post.body}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>{post.authorName}</span>
        </div>

        {post.category === PostCategory.Event && post.eventDate && (
          <div className="space-y-2 pt-1">
            <CountdownTimer eventDateNano={post.eventDate} />
          </div>
        )}
        {post.eventDate && (
          <EventActionButtons
            title={post.title}
            description={post.body}
            dateMs={Number(post.eventDate) / 1_000_000}
          />
        )}
      </CardContent>
    </Card>
  );
}
