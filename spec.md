# DYP College Social Network

## Current State
- Bottom-right: A single `FloatingGitHubButton` that opens a student project showcase modal (`GitHubModal`).
- Bottom-left: Two separate floating buttons -- `ComplaintBox` (pulsing circle, bottom-left ~`bottom-24 left-5`) and `LiveChat` (pulsing circle, bottom-right `bottom-5 right-5`). The ComplaintBox modal has two tabs: Complaint and Suggestion Box.
- The Suggestion Box is currently a tab inside the ComplaintBox modal, not a standalone button.

## Requested Changes (Diff)

### Add
- A second GitHub button in the bottom-right area (stacked above the existing showcase button) that, when clicked, opens `https://github.com` in a new browser tab.
- A new `FlowerMenu` floating button at the bottom-left corner. When pressed, it fans out 3 petal buttons in a flower/arc formation (upward-left arc from the main button):
  1. Complaint button -- opens ComplaintBox modal (complaint tab)
  2. Suggestion button -- opens ComplaintBox modal (suggestion tab)
  3. Live Chat button -- opens LiveChat panel
- Each petal button has a distinct icon and label.

### Modify
- `FloatingGitHubButton`: Add a second button stacked above the current one that links directly to https://github.com (new tab). Keep the existing showcase button exactly as-is.
- `ComplaintBox`: Remove the standalone floating button (it will now be triggered from the FlowerMenu). Export the Dialog-only version so FlowerMenu can control `open` and `defaultTab`.
- `LiveChat`: Remove the standalone floating toggle button (it will now be triggered from the FlowerMenu). Export a version that accepts an `open` prop controlled externally.
- `App.tsx`: Remove direct usage of `<ComplaintBox />` and `<LiveChat />`. Replace with `<FlowerMenu />` which internally manages all three.

### Remove
- The standalone pulsing circle button inside `ComplaintBox` component.
- The standalone pulsing circle toggle button inside `LiveChat` component.

## Implementation Plan
1. Update `FloatingGitHubButton.tsx` to render two stacked buttons: a new "Visit GitHub.com" link button on top, and the existing showcase modal button below.
2. Refactor `ComplaintBox.tsx`: remove the floating trigger button, add `open`, `onClose`, and `defaultTab` props so the dialog can be controlled externally.
3. Refactor `LiveChat.tsx`: remove the floating toggle button, accept `open` and `onClose` props for external control.
4. Create `FlowerMenu.tsx`: a single main button at `bottom-6 left-6` that on click toggles expanded state, animating 3 petal buttons in a flower/fan arc pattern. Each petal controls opening the appropriate modal/panel.
5. Update `App.tsx` (or `HomePage.tsx`): remove `<ComplaintBox />` and `<LiveChat />`, add `<FlowerMenu />`.
