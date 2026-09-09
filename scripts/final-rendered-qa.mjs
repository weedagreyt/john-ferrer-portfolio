import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "http://127.0.0.1:3000";
const OUT = "qa-output";
const routes = [
  "/",
  "/work",
  "/work/kove",
  "/work/unimotors",
  "/work/dope-marketing",
  "/work/yensanities",
  "/work/retrophorics",
  "/work/art-exploration",
  "/about",
  "/contact",
];
const viewports = [
  { name: "large-desktop", width: 1600, height: 1000 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "large-phone", width: 430, height: 932 },
  { name: "small-phone", width: 360, height: 800 },
  { name: "phone-landscape", width: 844, height: 390 },
];
const screenshotViews = new Set(["large-desktop", "tablet", "large-phone"]);

await mkdir(`${OUT}/screenshots`, { recursive: true });
const browser = await chromium.launch({ headless: true });
const issues = [];
const notes = [];
const routeResults = [];

function addIssue(kind, detail, severity = "error") {
  issues.push({ severity, kind, detail });
}

async function inspectRoute(route, viewport) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const badResponses = [];
  page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
  page.on("pageerror", (err) => pageErrors.push(String(err)));
  page.on("requestfailed", (req) => failedRequests.push(`${req.method()} ${req.url()} :: ${req.failure()?.errorText || "failed"}`));
  page.on("response", (res) => {
    if (res.url().startsWith(BASE) && res.status() >= 400) badResponses.push(`${res.status()} ${res.url()}`);
  });

  const response = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(800);
  const status = response?.status() ?? 0;
  if (status >= 400 || status === 0) addIssue("route-status", `${viewport.name} ${route}: HTTP ${status}`);

  const metrics = await page.evaluate(() => {
    const root = document.documentElement;
    const images = [...document.images].map((img) => {
      const style = getComputedStyle(img);
      const r = img.getBoundingClientRect();
      const intrinsicRatio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0;
      const renderedRatio = r.width && r.height ? r.width / r.height : 0;
      const distortion = style.objectFit === "fill" && intrinsicRatio && renderedRatio
        ? Math.abs(Math.log(renderedRatio / intrinsicRatio)) > 0.05
        : false;
      return {
        src: img.getAttribute("src") || "",
        alt: img.getAttribute("alt") || "",
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        width: Math.round(r.width),
        height: Math.round(r.height),
        objectFit: style.objectFit,
        distortion,
      };
    });
    const videos = [...document.querySelectorAll("video")].map((v) => ({
      src: v.currentSrc || v.getAttribute("src") || "",
      readyState: v.readyState,
      paused: v.paused,
      currentTime: Number(v.currentTime.toFixed(2)),
      error: v.error ? `${v.error.code}:${v.error.message || "video error"}` : null,
    }));
    const deadInteractive = [...document.querySelectorAll("a,button")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 1 && r.height > 1;
      })
      .filter((el) => el.tagName === "A" && !(el.getAttribute("href") || "").trim())
      .map((el) => el.textContent?.trim() || el.outerHTML.slice(0, 120));
    return {
      viewportWidth: innerWidth,
      scrollWidth: root.scrollWidth,
      horizontalOverflow: root.scrollWidth > innerWidth + 2,
      images,
      videos,
      deadInteractive,
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim() || "",
    };
  });

  if (metrics.horizontalOverflow) addIssue("horizontal-overflow", `${viewport.name} ${route}: scrollWidth ${metrics.scrollWidth} > ${metrics.viewportWidth}`);
  for (const img of metrics.images) {
    if (!img.naturalWidth || !img.naturalHeight) addIssue("broken-image", `${viewport.name} ${route}: ${img.src}`);
    if (img.distortion) addIssue("distorted-image", `${viewport.name} ${route}: ${img.src} rendered ${img.width}x${img.height}, intrinsic ${img.naturalWidth}x${img.naturalHeight}`);
  }
  for (const video of metrics.videos) if (video.error) addIssue("video-error", `${viewport.name} ${route}: ${video.src} ${video.error}`);
  for (const item of metrics.deadInteractive) addIssue("dead-link", `${viewport.name} ${route}: ${item}`);
  for (const err of pageErrors) addIssue("page-error", `${viewport.name} ${route}: ${err}`);
  for (const err of consoleErrors) addIssue("console-error", `${viewport.name} ${route}: ${err}`);
  for (const err of failedRequests) addIssue("request-failed", `${viewport.name} ${route}: ${err}`);
  for (const err of badResponses) addIssue("bad-response", `${viewport.name} ${route}: ${err}`);

  if (screenshotViews.has(viewport.name)) {
    const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    await page.screenshot({ path: `${OUT}/screenshots/${viewport.name}__${slug}.png`, fullPage: true });
  }

  routeResults.push({ route, viewport: viewport.name, status, ...metrics, consoleErrors, pageErrors, failedRequests, badResponses });
  await context.close();
}

for (const viewport of viewports) {
  for (const route of routes) await inspectRoute(route, viewport);
}

// Internal links: verify every route referenced by visible anchors returns a non-error status.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
  const page = await context.newPage();
  const internal = new Set();
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((els) => els.map((a) => a.getAttribute("href")).filter(Boolean));
    hrefs.forEach((href) => internal.add(href));
  }
  for (const href of internal) {
    const res = await context.request.get(`${BASE}${href}`);
    if (res.status() >= 400) addIssue("broken-internal-link", `${href}: HTTP ${res.status()}`);
  }
  notes.push(`Verified ${internal.size} unique internal links.`);
  await context.close();
}

// Mobile navigation opens, is keyboard-dismissible, and exposes the intended links.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  if ((await menu.getAttribute("aria-expanded")) !== "true") addIssue("mobile-nav", "Menu did not report aria-expanded=true after opening");
  for (const label of ["Work", "About", "Résumé", "Contact", "Let’s Talk"]) {
    const link = page.getByRole("link", { name: label, exact: true }).last();
    if (!(await link.isVisible())) addIssue("mobile-nav", `Mobile menu link not visible: ${label}`);
  }
  await page.keyboard.press("Escape");
  if ((await page.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded")) !== "false") addIssue("mobile-nav", "Escape did not close mobile menu");
  notes.push("Mobile navigation open/close and link visibility tested at 390px.");
  await context.close();
}

// Intro: verify the Unicorn video advances and wheel/scroll skips the sequence.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.locator(".jf-intro").waitFor({ state: "visible", timeout: 5000 });
  const introVideo = page.locator(".jf-intro video").first();
  await introVideo.waitFor({ state: "attached", timeout: 5000 });
  await page.waitForTimeout(1350);
  const t1 = await introVideo.evaluate((v) => v.currentTime);
  await page.waitForTimeout(450);
  const t2 = await introVideo.evaluate((v) => v.currentTime);
  if (!(t2 > t1 + 0.1)) addIssue("intro-video", `Unicorn intro video did not advance (${t1.toFixed(2)} -> ${t2.toFixed(2)})`);
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(350);
  if (await page.locator(".jf-intro").count()) addIssue("intro-skip", "Wheel/scroll did not dismiss intro");
  notes.push(`Intro Unicorn video advanced from ${t1.toFixed(2)}s to ${t2.toFixed(2)}s; wheel-skip tested.`);
  await context.close();
}

// Retrophorics click-to-play videos.
{
  for (const index of [0, 1]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
    const page = await context.newPage();
    await page.goto(`${BASE}/work/retrophorics`, { waitUntil: "domcontentloaded" });
    const buttons = page.locator('button[aria-label^="Play "]');
    if ((await buttons.count()) <= index) {
      addIssue("case-video", `Retrophorics play button ${index + 1} missing`);
    } else {
      await buttons.nth(index).click();
      const video = page.locator("video").first();
      await page.waitForTimeout(900);
      const state = await video.evaluate((v) => ({ currentTime: v.currentTime, readyState: v.readyState, error: v.error?.code || 0 }));
      if (state.error || state.readyState < 2 || state.currentTime <= 0) addIssue("case-video", `Retrophorics video ${index + 1} failed playback: ${JSON.stringify(state)}`);
    }
    await context.close();
  }
  notes.push("Retrophorics click-to-play media tested.");
}

// Contact form: client validation and live FormSubmit response.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
  const page = await context.newPage();
  await page.goto(`${BASE}/contact`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /Send Message/i }).click();
  const emptyErrors = await page.getByText(/Please enter your/i).count();
  if (emptyErrors !== 4) addIssue("contact-validation", `Expected 4 required-field errors, found ${emptyErrors}`);
  await page.getByLabel("Your Name").fill("Portfolio QA");
  await page.getByLabel("Your Email").fill("bad-email");
  await page.getByLabel("Subject").fill("Automated launch QA");
  await page.getByLabel("Message").fill("Automated pre-publish test. Please ignore this message.");
  await page.getByRole("button", { name: /Send Message/i }).click();
  if (!(await page.getByText("Please enter a valid email address.").isVisible())) addIssue("contact-validation", "Invalid email was not rejected");
  await page.getByLabel("Your Email").fill("portfolio.qa@example.com");
  const responsePromise = page.waitForResponse((r) => r.url().includes("formsubmit.co/ajax/weetotwee@gmail.com"), { timeout: 25000 }).catch(() => null);
  await page.getByRole("button", { name: /Send Message/i }).click();
  const submitResponse = await responsePromise;
  await page.waitForTimeout(800);
  const bodyText = await page.locator("body").innerText();
  const success = bodyText.includes("Thank you! Your message has been submitted.");
  const activation = /awaiting activation/i.test(bodyText);
  if (!submitResponse) addIssue("contact-submit", "No FormSubmit response observed");
  else if (submitResponse.status() >= 400) addIssue("contact-submit", `FormSubmit returned HTTP ${submitResponse.status()}`);
  if (activation) addIssue("contact-submit", "FormSubmit reports the inbox is awaiting activation");
  if (!success) addIssue("contact-submit", "Success state was not reached after a live valid submission");
  notes.push(`Contact validation tested; FormSubmit response=${submitResponse?.status() ?? "none"}, success=${success}, activation=${activation}.`);
  await context.close();
}

await browser.close();

const report = { generatedAt: new Date().toISOString(), issues, notes, routeResults };
await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));
const severe = issues.filter((i) => i.severity === "error");
const md = [
  "# Final Rendered QA",
  "",
  `Routes × viewports checked: ${routes.length} × ${viewports.length} = ${routes.length * viewports.length}`,
  `Errors: ${severe.length}`,
  "",
  "## Notes",
  ...notes.map((n) => `- ${n}`),
  "",
  "## Issues",
  ...(issues.length ? issues.map((i) => `- **${i.severity.toUpperCase()} / ${i.kind}:** ${i.detail}`) : ["- None"]),
  "",
].join("\n");
await writeFile(`${OUT}/report.md`, md);
console.log(md);
if (severe.length) process.exitCode = 1;
