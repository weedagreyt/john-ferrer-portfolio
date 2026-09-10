import { track } from "@vercel/analytics";

const APPLICATION_SOURCE_KEY = "jf_portfolio_application_source";

type ClarityFunction = (...args: unknown[]) => void;

type ClarityWindow = Window & {
  clarity?: ClarityFunction;
};

function clean(value: string | null | undefined, fallback: string) {
  const normalized = (value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return normalized || fallback;
}

function sendToClarity(
  name: string,
  source: string,
  detailKey?: string,
  detailValue?: string,
) {
  const clarity = (window as ClarityWindow).clarity;
  if (typeof clarity !== "function") return;

  try {
    clarity("set", "application_source", source);
    clarity("set", "portfolio_page", clean(window.location.pathname, "home"));

    if (detailKey && detailValue) {
      clarity(`set`, `portfolio_${clean(detailKey, "detail")}`, clean(detailValue, "unknown"));
    }

    clarity("event", name);
  } catch {
    // Clarity should never affect the portfolio experience if tracking is unavailable.
  }
}

export function captureApplicationSource() {
  if (typeof window === "undefined") return "direct";

  const params = new URLSearchParams(window.location.search);
  const incoming = params.get("source") || params.get("utm_source");

  if (incoming) {
    const source = clean(incoming, "direct");
    window.sessionStorage.setItem(APPLICATION_SOURCE_KEY, source);
    return source;
  }

  return window.sessionStorage.getItem(APPLICATION_SOURCE_KEY) || "direct";
}

export function getApplicationSource() {
  if (typeof window === "undefined") return "direct";
  return window.sessionStorage.getItem(APPLICATION_SOURCE_KEY) || "direct";
}

export function trackPortfolioEvent(
  name: string,
  detailKey?: string,
  detailValue?: string,
) {
  if (typeof window === "undefined") return;

  const source = getApplicationSource();
  const data: Record<string, string> = { source };

  if (detailKey && detailValue) {
    data[detailKey] = clean(detailValue, "unknown");
  }

  try {
    track(name, data);
  } catch {
    // Vercel Analytics should never affect the portfolio experience if tracking is unavailable.
  }

  sendToClarity(name, source, detailKey, detailValue);
}
