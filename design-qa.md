# Design QA

- Source visual truth: `/mnt/data/creative_thinker_problem_solver.png`
- Source pixels: 941 × 1672
- Target mobile composition: 393 px class viewport, preserving the source's 1.777:1 height-to-width ratio
- Implementation: `https://john-ferrer-portfolio.vercel.app`
- Latest implementation commit before this QA record: `a6268581cc5f6cb74669c8f5cf71794da1a45b6e`
- Implementation screenshot: blocked — the connected Vercel scope returns 403 and the available local Chromium runtime cannot produce a valid browser-rendered capture of the deployed app
- State: homepage, default mobile hero

**Full-view comparison evidence**
- Source poster was inspected directly at 941 × 1672.
- The source's major mobile landmarks were measured: compact navigation, intro near the top of the content column, six-line condensed headline, portrait beginning behind the navigation and crossing through the headline/CTA region, subtitle immediately below the headline, low skyline, technical side label, and lower-left watermark.
- A local composition study using the same background and portrait assets was used only to tune proportions; it is not treated as implementation evidence.

**Focused-region comparison evidence**
- Typography: the headline is now explicitly split into the same six poster lines (`Creative / Thinker. / Problem / Solver. / Visual / Storyteller.`), with Barlow Condensed 900 Italic and additional horizontal condensation while preserving vertical height.
- Portrait: mobile no longer relies on the pre-composited portrait image. The dedicated high-resolution portrait is independently positioned behind the navigation, across the headline, and below the CTA.
- Background: mobile uses the separate generated racing background so the skyline, red slashes, portrait, and copy can be art-directed independently.
- Navigation: mobile header height, logo scale, menu size, and menu position were tightened toward the source poster.
- Rhythm: hero aspect ratio, intro position, headline line height, subtitle spacing, CTA spacing, side label, scroll marker, and watermark were retuned to the source proportions.

**Findings**
- [P2] Final post-deploy screenshot verification is unavailable.
  - Evidence: GitHub build passes, but Vercel API access for the deployment is forbidden from this connection and local browser capture of the production page is unavailable.
  - Impact: the code and measured composition are substantially closer to the visual target, but pixel-level 99% parity cannot be formally signed off without a fresh rendered mobile screenshot.
  - Fix: once the latest production deployment is visible, capture the homepage on the user's mobile viewport and compare it directly with the 941 × 1672 source.

**Changes in this iteration**
- Replaced phrase-based wrapping with deterministic six-line headline markup.
- Preserved the tall 900-italic race display face while condensing line width to match the poster silhouette.
- Replaced the mobile composite portrait background with separate `hero-bg-mobile.avif` and `hero-portrait-red.avif` layers.
- Enlarged and raised the portrait so the face begins behind the navigation and remains visible below the CTA.
- Rebalanced left-side black masking to keep overlapped copy legible without hiding the portrait.
- Tightened mobile navigation height and logo/menu proportions.
- Matched the hero height more closely to the source poster aspect ratio.
- Retuned subtitle leading, CTA spacing, technical side labels, scroll marker, and lower watermark.

**Primary interactions tested**
- GitHub production build completed successfully for the implementation commit.
- Browser interaction testing is blocked by the deployment-access limitation above.

**Console errors checked**
- Not available because a valid browser-rendered deployment session cannot be opened from this environment.

**Comparison history**
- Earlier user screenshots showed the portrait sitting too low/small and the headline reading too wide/generic.
- The previous pass made the portrait larger but still used a single pre-composited mobile image, which prevented accurate overlap control.
- This pass separates the image layers and locks the six headline lines, addressing the two major P1/P2 visual differences identified by the user.

final result: blocked
