# Design QA

- Source visual truth: Figma storyboard `John Ferrer — Cinematic Intro Storyboard` (`https://www.figma.com/design/tqinwQZGPm89MTYcWtw9b9`).
- Source frames captured at 393 × 852: `01 — IGNITION` (`1:2`), `03 — CREATE / SOLVE` (`1:34`), `04 — CONVERGENCE` (`1:61`), `05 — RED BEAM WIPE` (`1:95`), and `06 — HERO REVEAL` (`1:129`).
- Implementation target: homepage intro at `https://john-ferrer-portfolio.vercel.app`.
- Intended runtime: 4.4 seconds, with tap/click skip and desktop wheel skip.

## Full-view comparison evidence

- The storyboard establishes a black / white / red racing-editorial system, Teko display typography, skewed project panels, restrained red glow, a controlled three-card convergence, and a diagonal red-beam handoff into the existing hero.
- The implementation follows the same six-beat sequence using the existing project imagery and `/racing-atmosphere.svg` so the intro and hero share one visual language.
- The final transition moves the intro cover itself off-screen while a red beam tracks the edge, revealing the real hero underneath rather than rendering a duplicate hero layer.

## Focused-region comparison evidence

- Fonts and typography: display beats use the existing `--font-race-display` Teko variable; microcopy stays compact and uppercase.
- Spacing and layout rhythm: project punches occupy the central field; CREATE / SOLVE interrupt the montage at different vertical anchors; the final stack remains centered before the wipe.
- Colors and visual tokens: `#050607` base, `#f01820` racing red, white display type, restrained red glow and low-opacity atmospheric overlays.
- Image quality and asset fidelity: project imagery is reused from the current portfolio; the atmospheric background uses the existing vector `racing-atmosphere.svg` to avoid raster pixelation.
- Copy and content: CREATE., SOLVE., KOVE, UNIMOTORS, DOPE, and the existing hero content are preserved as the designed narrative.
- Interaction: mobile is tap-to-skip only; desktop supports click and wheel fast-forward. No touchmove listener or fixed-body scroll lock is introduced.

## Findings

- [P2] Browser-rendered implementation evidence is not available in the current connected environment. GitHub build/deployment status can be verified, but the animation cannot be visually sampled frame-by-frame from the live browser here.
- Because the implementation screenshot/video is missing, the required source-vs-rendered comparison cannot be completed.

## Implementation checklist

- Replace the previous 5.75s slideshow with the 4.4s cinematic timeline.
- Use native Web Animations API for transform/opacity/filter timing rather than per-frame React state updates.
- Keep the existing hero unchanged and reveal it by moving the intro cover away.
- Preserve tap-to-skip on touch devices and wheel skip only for fine-pointer desktop devices.
- Run GitHub build and verify Vercel production status.
- Capture a real mobile browser run for final visual sign-off when browser capture is available.

final result: blocked
