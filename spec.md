# DYP College Social Network

## Current State

- Main page has 4 tabs: Home, Events, Clubs, Achievements
- Header has a slide-in sheet (three dashes) with: Login/Logout, Dashboard (collapsed sub-items: Admin, Student, Teacher all say "Coming soon"), Registered Events (coming soon), Profile (coming soon), Settings (coming soon), Campus Map
- No actual dashboard, profile, settings, or registered events pages exist -- all are toast placeholders

## Requested Changes (Diff)

### Add

1. **Three full dashboard pages** accessible from the menu sheet:
   - Admin Dashboard: overview stats (total students, events, clubs, posts), recent posts table, event management view, user management section
   - Student Dashboard: personal stats (events joined, clubs joined, badges earned), upcoming registered events, activity feed, quick actions
   - Teacher Dashboard: department announcements, student queries from Faculty Ask Doubt form, course/department events, faculty directory

2. **Registered Events page**: list of events the logged-in student has registered for, showing Event Name, Date, Countdown/Status, Add to Calendar button. Mock data for a sample student.

3. **Settings page** with sections:
   - Password Change (current password, new password, confirm)
   - Events & Calendar Settings: default event reminder (1 hour before, 1 day before, 1 week before, custom), toggle for "Enable/Disable Add to Calendar automatically"
   - Privacy & Visibility: "Show my activity on feed" toggle, "Allow comments on my posts" toggle, "Allow tagging in posts" toggle

4. **Profile page** (accessible from menu) -- editable profile:
   - Cover Photo banner (editable)
   - Profile Picture (editable)
   - Full Name, Role (Student/Faculty/Club Member/Admin dropdown), Branch/Department (CSE, Mechanical, etc.), Year (FY/SY/TY/BTech/MTech), Short Bio
   - Events Participated: list with Event Name, Date, Countdown/Status, Add to Calendar
   - GitHub Projects: GitHub profile link, list of submitted repos with project description and tech stack
   - Clubs/Communities Joined: display clubs user follows
   - Badges/Recognition gamification: Event Enthusiast, Hackathon Participant, Club Leader, Top Contributor

5. **Profile tab on main page** -- add "Profile" as a 5th main tab next to Achievements, with the same profile content as above

### Modify

- Header MenuSheet: clicking Admin Dashboard, Student Dashboard, Teacher Dashboard navigates to dedicated pages (sets a route/view) instead of showing a toast
- Registered Events menu item: navigates to the registered events page
- Profile menu item: navigates to the profile page
- Settings menu item: navigates to the settings page
- App.tsx: add routing for dashboard views, registered events, profile, and settings pages

### Remove

- "Coming soon" toasts from Dashboard sub-items, Registered Events, Profile, Settings

## Implementation Plan

1. Create `src/frontend/src/pages/AdminDashboardPage.tsx` with admin stats, post overview, event list, user management
2. Create `src/frontend/src/pages/StudentDashboardPage.tsx` with student stats, registered events preview, activity, badges
3. Create `src/frontend/src/pages/TeacherDashboardPage.tsx` with teacher-focused view
4. Create `src/frontend/src/pages/RegisteredEventsPage.tsx` with mock registered event list
5. Create `src/frontend/src/pages/SettingsPage.tsx` with password, calendar, privacy sections
6. Create `src/frontend/src/pages/ProfilePage.tsx` with editable profile, events participated, GitHub projects, clubs, badges
7. Modify `HomePage.tsx`: add "profile" to MainTab type and render ProfilePage inside the 5th tab
8. Modify `Header.tsx`: update MenuSheet navigation to push routes instead of showing toasts
9. Modify `App.tsx`: add route handling for /dashboard/admin, /dashboard/student, /dashboard/teacher, /registered-events, /profile, /settings
