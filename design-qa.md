# Design QA

- Source visual truth: `/mnt/data/creative_thinker_problem_solver.png`
- Current user requirement: remove visible portrait pixelation and reposition the mobile portrait so the headline only slightly overlaps its left edge.
- Target viewport: mobile / iPhone-class width.
- Implementation: `https://john-ferrer-portfolio.vercel.app`
- Implementation screenshot: blocked — the connected Vercel fetch path does not provide a renderable screenshot in this environment.
- State: homepage, default mobile hero.

**Full-view comparison evidence**
- The approved poster remains the composition source of truth.
- The supplied high-resolution cutout was inspected directly and is visibly sharper than the previous highly compressed hero portrait asset.
- The mobile portrait position was adjusted from a broad headline/portrait collision to a right-shifted composition where the headline should only skim the portrait's left edge.

**Focused-region comparison evidence**
- Image quality: replaced the previous tiny compressed portrait source with a 1200 px wide AVIF reconstructed at build time from the high-resolution transparent portrait, using Lanczos resampling plus light sharpening before AVIF encoding. The source is large enough for an iPhone-class Retina viewport without the severe upscaling of the old asset.
- Portrait layout: mobile placement changed from `left: 4vw; width: 123vw; height: 154vw` to `left: 36vw; width: 110vw; height: 137.5vw`, preserving a dominant portrait while reducing text intrusion across the face.
- Typography: Teko headline configuration is intentionally unchanged from the last approved correction.
- Contrast: the left-side copy mask was narrowed slightly so the portrait is more visible without sacrificing headline readability.

**Findings**
- [P2] Final post-deploy visual confirmation is unavailable.
  - Evidence: source asset and implementation code are available, but this environment cannot capture the deployed mobile page for same-viewport comparison.
  - Impact: image sharpness and intended overlap are addressed in the implementation, but exact visual parity cannot be signed off without a fresh rendered mobile screenshot.
  - Fix: compare a fresh mobile screenshot after deployment against the approved poster and adjust the portrait by small horizontal increments only if needed.

**Implementation checklist**
- Use the reconstructed high-resolution portrait asset.
- Keep Teko headline unchanged.
- Shift portrait right and reduce scale enough to limit overlap to the left edge.
- Preserve portrait extension below the CTA.
- Verify production deployment status.

final result: blocked
