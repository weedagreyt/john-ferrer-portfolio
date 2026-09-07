# Design QA

- Source visual truth: latest user-supplied mobile homepage screenshot and approved racing-poster direction.
- Target: mobile homepage hero, iPhone-class viewport.
- Current request: make the hero visibly less top-heavy by increasing spacing between the navigation, intro, headline, body copy, CTA, and location while preserving the approved Teko typography, portrait balance/fade, and background art.
- Implementation: `https://john-ferrer-portfolio.vercel.app`

## Full-view comparison evidence

- The supplied mobile screenshot shows the primary content compressed into the upper portion of the hero.
- The prior pass only moved the copy about 30px and used modest margin changes, which was not visually strong enough on-device.
- This pass increases the copy offset and all major vertical gaps, and moves the cleanup stylesheet to the end of the global import order so the spacing overrides are guaranteed to win.

## Focused-region comparison evidence

- Fonts and typography: Teko 700, line breaks, scale, and red/white hierarchy are unchanged.
- Spacing and layout rhythm: mobile copy now begins at `clamp(50px, 7svh, 70px)` below the hero shell start; intro-to-headline gap is 28px; headline-to-body gap is 30px; body-to-CTA gap is 24px; CTA-to-location gap is 34px. Hero minimum height is raised to 760px with `100svh` sizing.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: high-resolution portrait, left offset, and baked lower fade are unchanged.
- Copy/content: unchanged.

## Finding

- [P2] Same-viewport rendered comparison remains blocked because the connected environment cannot capture the production mobile page as a browser-rendered screenshot.
- The implementation and deployment can be verified, but pixel-level visual sign-off still requires a rendered mobile capture.

## Implementation checklist

- Make the final mobile spacing override the last stylesheet in the cascade.
- Increase nav-to-intro breathing room visibly.
- Increase intro-to-headline, headline-to-body, body-to-CTA, and CTA-to-location gaps.
- Preserve approved typography and portrait composition.
- Verify GitHub build and Vercel deployment.

final result: blocked
