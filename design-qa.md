# Design QA

- Source visual: latest user-supplied mobile homepage screenshot and the approved racing-poster direction.
- Target: mobile homepage hero.
- Requested changes: remove the red logo slash; remove the `01` marker and rule; shift the portrait slightly left; soften the portrait bottom into a fade; remove `Ideas / Interfaces / Impact`; remove `Scroll`.
- Typography: existing Teko headline intentionally preserved.

## Implementation evidence

- The decorative logo slash and the requested secondary hero markers are hidden in the final cascade layer.
- Mobile portrait placement moves from `left: 36vw` to `left: 18vw`, preserving the existing scale while rebalancing the right-heavy composition.
- The portrait asset is rebuilt from the higher-resolution cutout and now contains a baked alpha fade beginning near the lower fifth of the subject, eliminating the previous hard lower crop without relying on a CSS mask.
- Existing headline, CTA, background art, and hero dimensions remain unchanged.

## Fidelity surfaces

- Fonts and typography: Teko 700 remains unchanged from the approved correction.
- Spacing and layout rhythm: portrait shifted left only; no unrelated spacing changes.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: high-resolution portrait retained; bottom fade baked into the raster alpha.
- Copy/content: requested auxiliary labels removed from view; primary intro, headline, body copy, CTA, and location remain.

## Finding

- [P2] Same-viewport rendered comparison is blocked in this environment because a browser screenshot of the production deployment is not available through the connected deployment tooling.
- Required follow-up: compare one fresh mobile production screenshot against the supplied reference and adjust only small horizontal portrait offsets if needed.

final result: blocked
