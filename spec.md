# DYP College Social Network

## Current State
- Login page with role picker (student/teacher/admin), email/password fields, demo credentials box, and login button
- Demo email for student is `student@dypcet.ac.in`
- Color theme is pastel pink with some neomorphism shadows already applied via CSS variables
- Login page layout: logo, role picker, email, password, login button, demo credentials hint
- Main app has full-featured pages: HomePage, ClubPage, ProfilePage, DashboardPage, etc.
- Background colors are pastel pink hues (oklch around 340-350 hue)
- Fonts: Plus Jakarta Sans (body), Cabinet Grotesk (headings), Sora (fallback)

## Requested Changes (Diff)

### Add
- Google Fonts import: Nunito (elegant, rounded, professional) as an additional font option for the neomorphic theme
- Database-backed user registration: update backend UserProfile to store richer data (email, role, branch, year, bio) so the site has a persistent user database
- White/off-white CSS token overrides so the neomorphism shadows render on a white/cream background instead of pink-tinted background

### Modify
- **Login page email format**: Change student demo email from `student@dypcet.ac.in` to `student@gmail.com`. Teacher demo email stays, admin stays. Update placeholder and DEMO credentials accordingly.
- **Login page layout order**: Move the login button to the BOTTOM of the form -- after the demo credentials hint. So the order becomes: logo, role picker, email, password, demo credentials hint, fill-demo button, login button.
- **Global color palette (index.css `:root`)**: Shift background, card, sidebar, popover tokens to white and off-white (no pink tint in light mode). Specifically:
  - `--background`: pure off-white (oklch ~0.985 0.004 90) -- creamy white
  - `--card`: white (oklch ~0.995 0.002 90)
  - `--sidebar`: near-white (oklch ~0.982 0.004 90)
  - `--popover`: white
  - Neomorphic shadow colors: update to use warm gray/neutral tones for light shadows and white for bright highlights so shadows are visible on the white background
  - Pastel accent colors (primary, ring) stay softly pink-rose but lighter
- **Neomorphism**: Ensure `--neo-shadow` and `--neo-shadow-*` use neutral warm tones (#d1cbc8 dark shadow, #ffffff bright highlight) suitable for white surfaces
- **Typography**: Add Nunito from Google Fonts CDN in `index.html` (or via @import in index.css) as display/heading font alternative for a softer neomorphic feel

### Remove
- Nothing removed

## Implementation Plan
1. Update `src/frontend/index.html` to add Google Fonts import for Nunito
2. Update `src/frontend/index.css`:
   - `:root` background/card/sidebar tokens to white and off-white (OKLCH values)
   - Neomorphic shadow CSS variables to neutral warm-gray shadows suitable for white background
   - Add Nunito to font stacks
3. Update `src/frontend/tailwind.config.js`: add Nunito to fontFamily
4. Update `src/frontend/src/pages/LoginPage.tsx`:
   - Change student demo email to `student@gmail.com`
   - Reorder the JSX: move login button after demo credentials box
5. Backend `UserProfile` already has basic `name` field; enhance it to store email + role + branch + year + bio via a new extended profile type for the database (frontend-side localStorage is supplemented by backend calls)
