import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Post {
    id: bigint;
    title: string;
    clubId?: bigint;
    body: string;
    authorName: string;
    imageUrl?: string;
    timestamp: bigint;
    category: PostCategory;
    eventDate?: bigint;
}
export interface Notification {
    id: bigint;
    isRead: boolean;
    message: string;
    timestamp: bigint;
    relatedPostId?: bigint;
}
export interface GitHubProject {
    id: bigint;
    title: string;
    authorName: string;
    description: string;
    timestamp: bigint;
    repoUrl: string;
}
export interface Club {
    id: bigint;
    name: string;
    slug: string;
    description: string;
}
export interface UserProfile {
    name: string;
}
export interface ActivityEntry {
    id: bigint;
    clubId?: bigint;
    action: string;
    actorName: string;
    timestamp: bigint;
}
export enum PostCategory {
    Event = "Event",
    Announcement = "Announcement",
    Update = "Update"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGitHubProject(title: string, repoUrl: string, authorName: string, description: string, timestamp: bigint): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearAllData(): Promise<void>;
    createPost(title: string, body: string, categoryText: string, clubId: bigint | null, authorName: string, timestamp: bigint, eventDate: bigint | null, imageUrl: string | null): Promise<bigint>;
    getAllClubPosts(): Promise<Array<Post>>;
    getAllClubs(): Promise<Array<Club>>;
    getAllGitHubProjects(): Promise<Array<GitHubProject>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getNotifications(): Promise<Array<Notification>>;
    getPostsByCategory(category: PostCategory): Promise<Array<Post>>;
    getPostsByClub(clubId: bigint): Promise<Array<Post>>;
    getRecentPosts(limit: bigint): Promise<Array<Post>>;
    getSortedActivityFeed(): Promise<Array<ActivityEntry>>;
    getUnreadNotificationCount(): Promise<bigint>;
    getUpcomingEvents(): Promise<Array<Post>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markAllNotificationsAsRead(): Promise<void>;
    markNotificationAsRead(id: bigint): Promise<void>;
    preSeedData(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
