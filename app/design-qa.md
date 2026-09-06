# Design QA

Source visual truth: user-provided reference image (876 × 1536)
Implementation target: homepage hero on mobile and desktop
State: in progress

Current blockers:
- Vercel production deployment is rate-limited, so the newest GitHub implementation cannot be visually verified against the live deployment yet.
- Product Design browser verification is unavailable in this standard chat, so final browser-rendered QA cannot be marked passed here.

Priority fixes being applied:
- Lock portrait, red rim light, smoke, city horizon, and racing streaks into generated hero composite artwork rather than CSS-only approximations.
- Use a condensed italic display face matching the reference hierarchy.
- Match white/red/white headline grouping, intro rule, CTA, location label, side note, and scroll marker.
- Preserve mobile-specific composition rather than merely shrinking desktop.

final result: blocked
