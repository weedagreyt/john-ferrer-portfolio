# Design QA

- Source visual: latest user-supplied mobile homepage screenshot and the approved racing-poster direction.
- Target: mobile homepage hero, iPhone-class viewport.
- Current request: reduce top-heavy cramping and distribute the primary hero content more evenly across the mobile screen while preserving the approved Teko typography, portrait position/fade, CTA, and background art.
- Implementation: `https://john-ferrer-portfolio.vercel.app`

## Full-view comparison evidence

- The user-provided screenshot shows the intended hierarchy: navigation at the top, a clear breathing gap before `HI, I’M JOHN FERRER`, then the six-line headline, body copy, CTA, location, and a visually quieter lower third.
- After the prior cleanup removed the `01`/rule block, the remaining intro collapsed upward, making the live composition feel too concentrated in the top half.
- This pass restores that missing vertical rhythm without changing the approved headline scale or portrait art direction.

## Focused-region comparison evidence

- Fonts and typography: Teko 700 remains unchanged; headline line breaks, weight, slant, and red/white hierarchy are preserved.
- Spacing and layout rhythm: mobile hero now uses `100svh` (bounded to 720–900px), hero copy starts 30px lower, and spacing is redistributed across intro → headline → paragraph → CTA → location.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: high-resolution portrait and baked lower fade remain unchanged; portrait stays at the approved `left: 18vw` placement.
- Copy/content: no copy changes; previously removed auxiliary markers remain hidden.

## Finding

- [P2] Same-viewport rendered comparison is still blocked because the connected environment does not provide a browser-rendered screenshot of the production Vercel page.
  - Impact: the spacing correction is grounded in the supplied screenshot and current CSS measurements, but pixel-level post-deploy confirmation cannot be signed off here.
  - Follow-up: use a fresh mobile production screenshot only if another small spacing correction is needed.

## Implementation checklist

- Use the full mobile viewport height for the hero.
- Add breathing room between navigation and intro.
- Preserve headline size and portrait overlap.
- Increase spacing after the headline and before the CTA/location.
- Keep the watermark visually low in the composition.
- Verify GitHub build and Vercel deployment status.

final result: blocked
