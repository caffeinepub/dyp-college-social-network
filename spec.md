# DYP College Social Network

## Current State
- Login page with role picker (student/teacher/admin), email/password, demo credentials, and a login button. No "create account" or social sign-in options.
- White/off-white neomorphism theme already applied, but pink color references remain in CSS variables (--primary, --gradient-primary), LoginPage gradients, Header role badges, and MenuSheet branding icon.
- Left sidebar has: college branding header, Home button, EventCalendarWidget. No profile link.
- Right menu (Header MenuSheet) has: Dashboard, Registered Events, Profile, Settings, Campus Map, Login/Logout.
- FloatingGitHubButton: two small semi-transparent buttons (opacity-60) with no motion animation.
- Neomorphism applied to cards/buttons but could be stronger on interactive surfaces.

## Requested Changes (Diff)

### Add
- **Create Account flow**: A "Create Account" tab/option on the login page. Form with full name, email (format student@gmail.com), password, confirm password, role selector, and a "Sign Up" button.
- **Sign in with Google**: A "Continue with Google" button on the login page (UI only, simulated auth).
- **Sign in with Mobile Number**: A "Continue with Mobile Number" option (OTP flow UI, simulated).
- **Profile button in left sidebar**: Between the Home button and the EventCalendarWidget, add a Profile nav button that navigates to /profile.
- **GitHub buttons moving animation**: Add a gentle floating/bobbing keyframe animation to the two GitHub buttons in FloatingGitHubButton.

### Modify
- **Remove all pink**: Replace all pink/rose color references with neutral blue-gray or warm-white accents. Specifically:
  - CSS: --primary, --gradient-primary, --gradient-hero, --ring, sidebar-primary should shift from pink (hue ~350) to a neutral blue-gray or warm neutral (e.g., slate/stone: hue ~220-240 or warm gray).
  - Dark mode: same -- remove pink/rose hues, use neutral-dark palette.
  - LoginPage: remove pink gradients on logo icon and login button; role card active states that use pink should shift to neutral blue-toned colors.
  - Header: ROLE_COLOR for student (pink) -> blue; admin (rose) -> slate; teacher stays amber. Role badge and MenuSheet icon gradient should also be non-pink.
  - Any inline `bg-pink-*`, `text-pink-*`, `border-pink-*`, `bg-rose-*`, `text-rose-*`, etc. across all components should be replaced with neutral equivalents (blue/slate/stone).
- **Stronger neomorphism**: Increase shadow depth and intensity on neo-card, neo-card-lg, neo-shadow tokens. Add neo-shadow to more interactive surfaces (sidebar profile button, calendar widget container).
- **GitHub buttons more opaque with motion**: Change opacity from 60% resting to 90%+ and add a gentle vertical float animation (CSS keyframes already exist, use float-slow or similar). Make the buttons slightly larger (11-12px icon, w-10 h-10).
- **Remove Profile from right menu**: Remove the "Profile" button from the Header MenuSheet menu items list.

### Remove
- Pink color tokens and pink inline Tailwind classes across the full app (systematic replacement).
- Profile menu item from the Header right-side sheet.

## Implementation Plan
1. Update `index.css`: Replace pink/rose OKLCH color tokens in both light and dark mode with neutral blue-gray/warm-white. Increase neo-shadow intensities.
2. Update `LoginPage.tsx`: Add tab switcher (Login / Create Account). Login tab keeps existing form, adds Google and mobile sign-in buttons. Create Account tab has name, email, password, confirm password, role, and sign up button. Remove pink inline styles/classes.
3. Update `Header.tsx`: Remove pink from ROLE_COLOR for student, remove rose from admin ROLE_COLOR. Remove the Profile button from MenuSheet items. Update MenuSheet gradient icon from pink to neutral.
4. Update `Sidebar.tsx`: Add a Profile nav button between the Home button and the EventCalendarWidget. Style with neo-shadow.
5. Update `FloatingGitHubButton.tsx`: Increase button size (w-10 h-10), set opacity to 90+, add float-slow/float-medium animation classes.
6. Sweep remaining files for inline pink/rose Tailwind classes and replace.
