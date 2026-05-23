/*
Design reminder for this file:
Этот модуль должен менять только аналитическое поведение без влияния на визуальную часть сайта.
*/

export const YANDEX_METRIKA_ID = 109375117;

export type MetrikaDetail = Record<string, unknown>;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    __WELLS_MO_METRIKA_ID__?: number | null;
  }
}

function getMetrikaFunction() {
  if (typeof window === "undefined") {
    return null;
  }

  return typeof window.ym === "function" ? window.ym : null;
}

export function sendMetrikaGoal(goal: string, detail: MetrikaDetail = {}) {
  const ym = getMetrikaFunction();

  if (!goal || !ym) {
    return;
  }

  try {
    ym(YANDEX_METRIKA_ID, "reachGoal", goal, detail);
  } catch {
    // Analytics should never block user actions.
  }
}

export function sendMetrikaHit(targetUrl?: string) {
  const ym = getMetrikaFunction();

  if (!ym) {
    return;
  }

  const resolvedUrl = targetUrl ?? (typeof window !== "undefined" ? window.location.href : "");

  if (!resolvedUrl) {
    return;
  }

  try {
    ym(YANDEX_METRIKA_ID, "hit", resolvedUrl);
  } catch {
    // Analytics should never block route changes.
  }
}

export function trackPhoneClick(placement: string) {
  if (typeof window === "undefined") {
    return;
  }

  sendMetrikaGoal("click_phone", {
    ctaId: "click_phone",
    placement,
    path: window.location.pathname,
    timestamp: Date.now(),
  });
}
