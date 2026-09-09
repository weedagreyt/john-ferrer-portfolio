import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "http://127.0.0.1:3000";
const OUT = "qa-output";
const routes = ["/", "/work", "/work/kove", "/work/unimotors", "/work/dope-marketing", "/work/yensanities", "/work/retrophorics", "/work/art-exploration", "/about", "/contact"];
const viewports = [
  ["large-desktop", 1600, 1000], ["desktop", 1280, 800], ["laptop", 1024, 768],
  ["tablet", 768, 1024], ["large-phone", 430, 932], ["small-phone", 360, 800], ["phone-landscape", 844, 390],
];
const screenshotViews = new Set(["large-desktop", "tablet", "large-phone"]);
const issues = [];
const notes = [];
const results = [];
const issue = (kind, detail, severity = "error") => issues.push({ severity, kind, detail });

await mkdir(`${OUT}/screenshots`, { recursive: true });
const browser = await chromium.launch({ headless: true });

async function settle(page) {
  let y = 0;
  for (let i = 0; i < 80; i++) {
    const { height, vh } = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, vh: innerHeight }));
    if (y >= height - vh) break;
    y = Math.min(height - vh, y + Math.max(300, Math.floor(vh * 0.78)));
    await page.evaluate((nextY) => scrollTo(0, nextY), y);
    await page.waitForTimeout(70);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(250);
}

async function inspect(route, vp) {
  const [name, width, height] = vp;
  const context = await browser.newContext({ viewport: { width, height } });
  await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
  const page = await context.newPage();
  const consoleErrors = [], pageErrors = [], failedRequests = [], badResponses = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => pageErrors.push(String(e)));
  page.on("requestfailed", (r) => failedRequests.push(`${r.method()} ${r.url()} :: ${r.failure()?.errorText || "failed"}`));
  page.on("response", (r) => { if (r.url().startsWith(BASE) && r.status() >= 400) badResponses.push(`${r.status()} ${r.url()}`); });
  try {
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(500);
    const status = res?.status() ?? 0;
    if (!status || status >= 400) issue("route-status", `${name} ${route}: HTTP ${status}`);
    await settle(page);
    const m = await page.evaluate(() => {
      const root = document.documentElement;
      const images = [...document.images].map((img) => {
        const s = getComputedStyle(img), r = img.getBoundingClientRect();
        const ir = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0;
        const rr = r.width && r.height ? r.width / r.height : 0;
        return { src: img.getAttribute("src") || "", nw: img.naturalWidth, nh: img.naturalHeight, w: Math.round(r.width), h: Math.round(r.height), fit: s.objectFit, distorted: s.objectFit === "fill" && ir && rr ? Math.abs(Math.log(rr / ir)) > .05 : false };
      });
      const videos = [...document.querySelectorAll("video")].map((v) => ({ src: v.currentSrc || v.getAttribute("src") || "", readyState: v.readyState, error: v.error ? `${v.error.code}:${v.error.message || "video error"}` : null }));
      return { title: document.title, h1: document.querySelector("h1")?.textContent?.trim() || "", vw: innerWidth, sw: root.scrollWidth, overflow: root.scrollWidth > innerWidth + 2, images, videos };
    });
    if (m.overflow) issue("horizontal-overflow", `${name} ${route}: scrollWidth ${m.sw} > ${m.vw}`);
    for (const img of m.images) {
      if (!img.nw || !img.nh) issue("broken-image", `${name} ${route}: ${img.src}`);
      if (img.distorted) issue("distorted-image", `${name} ${route}: ${img.src} rendered ${img.w}x${img.h}, intrinsic ${img.nw}x${img.nh}`);
    }
    for (const v of m.videos) if (v.error) issue("video-error", `${name} ${route}: ${v.src} ${v.error}`);
    for (const e of consoleErrors) issue("console-error", `${name} ${route}: ${e}`);
    for (const e of pageErrors) issue("page-error", `${name} ${route}: ${e}`);
    for (const e of failedRequests) issue("request-failed", `${name} ${route}: ${e}`);
    for (const e of badResponses) issue("bad-response", `${name} ${route}: ${e}`);
    if (screenshotViews.has(name)) {
      const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({ path: `${OUT}/screenshots/${name}__${slug}.png`, fullPage: true });
    }
    results.push({ route, viewport: name, status, ...m, consoleErrors, pageErrors, failedRequests, badResponses });
  } catch (e) {
    issue("route-test-crash", `${name} ${route}: ${e}`);
  } finally {
    await context.close();
  }
}

for (const vp of viewports) for (const route of routes) await inspect(route, vp);

// Verify every internal href found across the site.
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
  const page = await context.newPage();
  const hrefs = new Set();
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    for (const h of await page.locator('a[href^="/"]').evaluateAll((els) => els.map((a) => a.getAttribute("href")).filter(Boolean))) hrefs.add(h);
  }
  for (const h of hrefs) {
    const r = await context.request.get(`${BASE}${h}`);
    if (r.status() >= 400) issue("broken-internal-link", `${h}: HTTP ${r.status()}`);
  }
  notes.push(`Verified ${hrefs.size} unique internal links.`);
  await context.close();
} catch (e) { issue("internal-link-test", String(e)); }

// Mobile navigation.
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const menu = page.locator('button[aria-controls="site-nav-mobile-menu"]');
  await menu.click();
  await page.waitForTimeout(150);
  if ((await menu.getAttribute("aria-expanded")) !== "true") issue("mobile-nav", "Menu did not open");
  for (const label of ["Work", "About", "Résumé", "Contact", "Let’s Talk"]) if (!(await page.getByRole("link", { name: label, exact: true }).last().isVisible())) issue("mobile-nav", `Hidden link: ${label}`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  if ((await menu.getAttribute("aria-expanded")) !== "false") issue("mobile-nav", "Escape did not close the menu");
  notes.push("Mobile navigation open/visibility/Escape behavior tested at 390px.");
  await context.close();
} catch (e) { issue("mobile-nav-test", String(e)); }

// Intro media and scroll-to-skip.
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.locator(".jf-intro").waitFor({ state: "visible", timeout: 5000 });
  const v = page.locator(".jf-intro video").first();
  await v.waitFor({ state: "attached" });
  await page.waitForTimeout(1350);
  const t1 = await v.evaluate((x) => x.currentTime);
  await page.waitForTimeout(450);
  const t2 = await v.evaluate((x) => x.currentTime);
  if (!(t2 > t1 + .1)) issue("intro-video", `Unicorn video did not advance: ${t1.toFixed(2)} -> ${t2.toFixed(2)}`);
  await page.mouse.move(640, 400); await page.mouse.wheel(0, 350); await page.waitForTimeout(350);
  if (await page.locator(".jf-intro").count()) issue("intro-skip", "Wheel/scroll did not dismiss intro");
  notes.push(`Intro video advanced ${t1.toFixed(2)}s -> ${t2.toFixed(2)}s; scroll-to-skip tested.`);
  await context.close();
} catch (e) { issue("intro-test", String(e)); }

// Retrophorics videos.
for (const index of [0, 1]) {
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
    const page = await context.newPage();
    await page.goto(`${BASE}/work/retrophorics`, { waitUntil: "domcontentloaded" });
    const buttons = page.locator('button[aria-label^="Play "]');
    if ((await buttons.count()) <= index) issue("case-video", `Retrophorics play button ${index + 1} missing`);
    else {
      await buttons.nth(index).click(); await page.waitForTimeout(900);
      const state = await page.locator("video").first().evaluate((v) => ({ t: v.currentTime, ready: v.readyState, err: v.error?.code || 0 }));
      if (state.err || state.ready < 2 || state.t <= 0) issue("case-video", `Retrophorics video ${index + 1} failed: ${JSON.stringify(state)}`);
    }
    await context.close();
  } catch (e) { issue("case-video-test", `Video ${index + 1}: ${e}`); }
}
notes.push("Retrophorics click-to-play media tested.");

// Contact validation + live FormSubmit request.
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
  const page = await context.newPage();
  await page.goto(`${BASE}/contact`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /Send Message/i }).click();
  if ((await page.getByText(/Please enter your/i).count()) !== 4) issue("contact-validation", "Required-field validation did not show four errors");
  await page.getByLabel("Your Name").fill("Portfolio QA");
  await page.getByLabel("Your Email").fill("bad-email");
  await page.getByLabel("Subject").fill("Automated launch QA");
  await page.getByLabel("Message").fill("Automated pre-publish test. Please ignore this message.");
  await page.getByRole("button", { name: /Send Message/i }).click();
  if (!(await page.getByText("Please enter a valid email address.").isVisible())) issue("contact-validation", "Invalid email was accepted");
  await page.getByLabel("Your Email").fill("portfolio.qa@example.com");
  const responseWait = page.waitForResponse((r) => r.url().includes("formsubmit.co/ajax/weetotwee@gmail.com"), { timeout: 25000 }).catch(() => null);
  await page.getByRole("button", { name: /Send Message/i }).click();
  const r = await responseWait; await page.waitForTimeout(800);
  const text = await page.locator("body").innerText();
  const success = text.includes("Thank you! Your message has been submitted.");
  const activation = /awaiting activation/i.test(text);
  if (!r) issue("contact-submit", "No FormSubmit response observed");
  else if (r.status() >= 400) issue("contact-submit", `FormSubmit HTTP ${r.status()}`);
  if (activation) issue("contact-submit", "FormSubmit is awaiting activation");
  if (!success) issue("contact-submit", "Success UI was not reached");
  notes.push(`Contact validation tested; FormSubmit=${r?.status() ?? "none"}, success=${success}, activation=${activation}.`);
  await context.close();
} catch (e) { issue("contact-test", String(e)); }

await browser.close();
const severe = issues.filter((x) => x.severity === "error");
const report = { generatedAt: new Date().toISOString(), errors: severe.length, issues, notes, results };
await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));
const md = ["# Final Rendered QA", "", `Routes × viewports: ${routes.length} × ${viewports.length} = ${routes.length * viewports.length}`, `Errors: ${severe.length}`, "", "## Notes", ...notes.map((x) => `- ${x}`), "", "## Issues", ...(issues.length ? issues.map((x) => `- **${x.severity.toUpperCase()} / ${x.kind}:** ${x.detail}`) : ["- None"]), ""].join("\n");
await writeFile(`${OUT}/report.md`, md);
console.log(md);
if (severe.length) process.exitCode = 1;
