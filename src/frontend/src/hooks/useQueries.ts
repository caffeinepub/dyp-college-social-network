import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PostCategory, UserProfile } from "../backend";
import { useActor } from "./useActor";

export function useAllClubs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllClubs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useRecentPosts(limit = 20) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["posts", "recent", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentPosts(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function usePostsByCategory(category: PostCategory) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["posts", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPostsByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function usePostsByClub(clubId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["posts", "club", clubId?.toString()],
    queryFn: async () => {
      if (!actor || clubId === null) return [];
      return actor.getPostsByClub(clubId);
    },
    enabled: !!actor && !isFetching && clubId !== null,
    staleTime: 30_000,
  });
}

export function useUpcomingEvents() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["posts", "upcoming"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUpcomingEvents();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function useNotifications() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

export function useUnreadCount() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getUnreadNotificationCount();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) return;
      await actor.markNotificationAsRead(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllRead() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.markAllNotificationsAsRead();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useGitHubProjects() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["github"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGitHubProjects();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useAddGitHubProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      repoUrl: string;
      authorName: string;
      description: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addGitHubProject(
        data.title,
        data.repoUrl,
        data.authorName,
        data.description,
        BigInt(Date.now()) * BigInt(1_000_000),
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["github"] });
    },
  });
}

export function useActivityFeed() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSortedActivityFeed();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
    refetchInterval: 20_000,
  });
}

export function usePreSeedData() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      await actor.preSeedData();
    },
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}

export function useCallerUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["profile", "caller"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("No actor");
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useAllUserProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["profiles", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUserProfiles();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}
