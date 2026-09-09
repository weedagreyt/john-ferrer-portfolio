import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "http://127.0.0.1:3000";
const OUT = "qa-output";
const routes = ["/", "/work", "/work/kove", "/work/unimotors", "/work/dope-marketing", "/work/yensanities", "/work/retrophorics", "/work/art-exploration", "/about", "/contact"];
const views = [["large-desktop",1600,1000],["desktop",1280,800],["laptop",1024,768],["tablet",768,1024],["large-phone",430,932],["small-phone",360,800],["phone-landscape",844,390]];
const shots = new Set(["large-desktop","tablet","large-phone"]);
const issues = [], notes = [];
const fail = (kind, detail) => issues.push({kind, detail});
await mkdir(`${OUT}/screenshots`, {recursive:true});
const browser = await chromium.launch({headless:true});

for (const [view,width,height] of views) {
  for (const route of routes) {
    const context = await browser.newContext({viewport:{width,height}, reducedMotion:"reduce"});
    await context.addInitScript(() => sessionStorage.setItem("jf:intro:v15", "seen"));
    const page = await context.newPage();
    const consoleErrors=[], pageErrors=[], failed=[], bad=[];
    page.on("console", m => { if (m.type()==="error") consoleErrors.push(m.text()); });
    page.on("pageerror", e => pageErrors.push(String(e)));
    page.on("requestfailed", r => failed.push(`${r.method()} ${r.url()} :: ${r.failure()?.errorText||"failed"}`));
    page.on("response", r => { if (r.url().startsWith(BASE) && r.status()>=400) bad.push(`${r.status()} ${r.url()}`); });
    try {
      const res = await page.goto(`${BASE}${route}`, {waitUntil:"networkidle", timeout:30000});
      if (!res || res.status()>=400) fail("route", `${view} ${route}: HTTP ${res?.status() ?? "none"}`);
      const m = await page.evaluate(() => {
        const root=document.documentElement;
        const images=[...document.images].map(img=>{
          const s=getComputedStyle(img), r=img.getBoundingClientRect();
          const ir=img.naturalWidth&&img.naturalHeight?img.naturalWidth/img.naturalHeight:0;
          const rr=r.width&&r.height?r.width/r.height:0;
          return {src:img.getAttribute("src")||"",nw:img.naturalWidth,nh:img.naturalHeight,w:r.width,h:r.height,fit:s.objectFit,distorted:s.objectFit==="fill"&&ir&&rr?Math.abs(Math.log(rr/ir))>.05:false};
        });
        return {overflow:root.scrollWidth>innerWidth+2,sw:root.scrollWidth,vw:innerWidth,images};
      });
      if (m.overflow) fail("horizontal-overflow", `${view} ${route}: ${m.sw}px > ${m.vw}px`);
      for (const img of m.images) {
        if (!img.nw || !img.nh) fail("broken-image", `${view} ${route}: ${img.src}`);
        if (img.distorted) fail("distorted-image", `${view} ${route}: ${img.src} ${Math.round(img.w)}x${Math.round(img.h)} intrinsic ${img.nw}x${img.nh}`);
      }
      for (const e of consoleErrors) fail("console", `${view} ${route}: ${e}`);
      for (const e of pageErrors) fail("pageerror", `${view} ${route}: ${e}`);
      for (const e of failed) if (e.startsWith("GET http://127.0.0.1:3000")) fail("asset-request", `${view} ${route}: ${e}`);
      for (const e of bad) fail("bad-response", `${view} ${route}: ${e}`);
      if (shots.has(view)) {
        const slug=route==="/"?"home":route.slice(1).replaceAll("/","-");
        await page.screenshot({path:`${OUT}/screenshots/${view}__${slug}.png`,fullPage:true});
      }
    } catch(e) { fail("route-test", `${view} ${route}: ${e}`); }
    await context.close();
  }
}
notes.push(`Checked ${routes.length*views.length} route/viewport combinations.`);

// Internal links.
{
  const context=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:"reduce"});
  await context.addInitScript(()=>sessionStorage.setItem("jf:intro:v15","seen"));
  const page=await context.newPage(); const hrefs=new Set();
  for (const route of routes) {
    await page.goto(`${BASE}${route}`,{waitUntil:"domcontentloaded"});
    for (const h of await page.locator('a[href^="/"]').evaluateAll(es=>es.map(a=>a.getAttribute("href")).filter(Boolean))) hrefs.add(h);
  }
  for (const h of hrefs) { const r=await context.request.get(`${BASE}${h}`); if(r.status()>=400) fail("internal-link",`${h}: HTTP ${r.status()}`); }
  notes.push(`Verified ${hrefs.size} unique internal links.`); await context.close();
}

// Mobile nav.
{
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});
  await context.addInitScript(()=>sessionStorage.setItem("jf:intro:v15","seen"));
  const page=await context.newPage(); await page.goto(BASE,{waitUntil:"domcontentloaded"});
  const menu=page.locator('button[aria-controls="site-nav-mobile-menu"]'); await menu.click(); await page.waitForTimeout(100);
  if(await menu.getAttribute("aria-expanded")!=="true") fail("mobile-nav","Menu did not open");
  for(const label of ["Work","About","Résumé","Contact","Let’s Talk"]) if(!await page.getByRole("link",{name:label,exact:true}).last().isVisible()) fail("mobile-nav",`Missing ${label}`);
  await page.keyboard.press("Escape"); await page.waitForTimeout(100); if(await menu.getAttribute("aria-expanded")!=="false") fail("mobile-nav","Escape did not close menu");
  notes.push("Mobile navigation tested at 390px."); await context.close();
}

// Reveal animation: disable smooth scrolling only in test, then verify a hidden section becomes visible.
{
  const context=await browser.newContext({viewport:{width:1280,height:800}}); await context.addInitScript(()=>sessionStorage.setItem("jf:intro:v15","seen"));
  const page=await context.newPage(); await page.goto(`${BASE}/work/kove`,{waitUntil:"domcontentloaded"}); await page.addStyleTag({content:"html{scroll-behavior:auto!important}"}); await page.waitForTimeout(300);
  const marked=await page.evaluate(()=>{
    const el=[...document.querySelectorAll("div")].find(x=>{const s=getComputedStyle(x),r=x.getBoundingClientRect();return r.top>innerHeight+100&&s.opacity==="0"&&s.transitionProperty.includes("opacity")});
    if(!el)return false; el.setAttribute("data-qa-reveal","target"); return true;
  });
  if(!marked) fail("reveal","Could not find a below-fold reveal target"); else {
    const target=page.locator('[data-qa-reveal="target"]'); await target.scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
    const opacity=await target.evaluate(el=>getComputedStyle(el).opacity); if(opacity!=="1") fail("reveal",`Reveal remained opacity ${opacity} after entering viewport`);
  }
  notes.push("Scroll reveal behavior tested on KOVE."); await context.close();
}

// Intro exists and wheel/touch-style scroll dismisses it. Playback codec is validated separately with ffprobe.
{
  const context=await browser.newContext({viewport:{width:1280,height:800}}); const page=await context.newPage(); await page.goto(BASE,{waitUntil:"domcontentloaded"});
  await page.locator(".jf-intro").waitFor({state:"visible",timeout:5000});
  if(await page.locator('.jf-intro video[src="/work/art-exploration/unicorn-2.mp4"]').count()!==1) fail("intro","Expected Unicorn MP4 is not in intro");
  await page.mouse.move(640,400); await page.mouse.wheel(0,350); await page.waitForTimeout(350); if(await page.locator(".jf-intro").count()) fail("intro","Wheel/scroll did not dismiss intro");
  notes.push("Intro presence, correct Unicorn media source, and scroll-to-skip tested."); await context.close();
}

// Retrophorics play controls swap the posters for the expected video elements.
{
  const context=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:"reduce"}); await context.addInitScript(()=>sessionStorage.setItem("jf:intro:v15","seen"));
  for (const expected of ["brand-film.mp4","motion-exploration.mp4"]) {
    const page=await context.newPage(); await page.goto(`${BASE}/work/retrophorics`,{waitUntil:"domcontentloaded"});
    const button=page.locator('button[aria-label^="Play "]').filter({has:page.locator(`img`)}).first();
    const buttons=page.locator('button[aria-label^="Play "]'); const index=expected.startsWith("brand")?0:1;
    if(await buttons.count()<=index) fail("case-video",`Missing play control for ${expected}`); else {await buttons.nth(index).click(); await page.waitForTimeout(100); const src=await page.locator("video").first().getAttribute("src"); if(!src?.endsWith(expected)) fail("case-video",`Expected ${expected}, got ${src}`);}
    await page.close();
  }
  notes.push("Retrophorics play controls and video source swapping tested."); await context.close();
}

// Contact form validation, loading guard wiring, and production-independent endpoint.
{
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"}); await context.addInitScript(()=>sessionStorage.setItem("jf:intro:v15","seen"));
  const page=await context.newPage(); await page.goto(`${BASE}/contact`,{waitUntil:"domcontentloaded"});
  await page.getByRole("button",{name:/Send Message/i}).click(); if(await page.getByText(/Please enter your/i).count()!==4) fail("contact","Required-field validation failed");
  await page.getByLabel("Your Name").fill("QA"); await page.getByLabel("Your Email").fill("bad-email"); await page.getByLabel("Subject").fill("QA"); await page.getByLabel("Message").fill("QA"); await page.getByRole("button",{name:/Send Message/i}).click();
  if(!await page.getByText("Please enter a valid email address.").isVisible()) fail("contact","Invalid email was accepted");
  const endpoint=await page.evaluate(()=>{const src=document.documentElement.innerHTML;return src.includes("formsubmit.co")}); if(!endpoint) fail("contact","FormSubmit endpoint is missing from rendered bundle");
  notes.push("Contact required fields, email validation, and FormSubmit endpoint wiring tested; inbox delivery remains an external verification."); await context.close();
}

await browser.close();
const report={generatedAt:new Date().toISOString(),errors:issues.length,issues,notes}; await writeFile(`${OUT}/report.json`,JSON.stringify(report,null,2));
const md=["# Final Launch QA","",`Errors: ${issues.length}`,"","## Notes",...notes.map(n=>`- ${n}`),"","## Issues",...(issues.length?issues.map(i=>`- **${i.kind}:** ${i.detail}`):["- None"]),""].join("\n"); await writeFile(`${OUT}/report.md`,md); console.log(md); if(issues.length)process.exitCode=1;
