/*
Design reminder for this file:
Индустриальная кинематографичность с техно-премиальной подачей.
Каждая страница должна ощущаться как часть единого дорогого интерфейса: крупные заголовки, воздух, стеклянные панели, тёмная база, латунные акценты и реальные изображения.
*/

import { type ChangeEvent, type FormEvent, type ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  ArrowUp,
  Building2,
  ChevronDown,
  Droplets,
  Hammer,
  MapPin,
  Menu,
  MoveDown,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { sendMetrikaGoal, sendMetrikaHit } from "@/lib/metrika";
import { cn } from "@/lib/utils";
import {
  allSeoLocations,
  assets,
  cases,
  citySeoLocations,
  districtSeoLocations,
  featuredPriorityServiceCityPages,
  featuredSeoLocations,
  findPriorityServiceCityPage,
  globalFaq,
  navigation,
  pricing,
  priorityServiceCities,
  priorityServiceCityPages,
  processSteps,
  serviceGalleryItems,
  serviceOrder,
  services,
  siteMeta,
  testimonials,
  trustMetrics,
  type LocalSeoLocation,
  type PriorityServiceCityPage,
  whyChooseUs,
} from "@/lib/site-content";

const iconMap = {
  "chistka-kolodcev": Sparkles,
  "remont-kolodcev": Hammer,
  "gidroizolyaciya-shvov": ShieldCheck,
  "skobirovanie-kolodca": Hammer,
  "drenazhnyy-kolodec": Droplets,
  "kopka-kolodcev": Wrench,
  "septik-iz-zhbi-kolec": Building2,
  "uglublenie-kolodcev": MoveDown,
  "vodosnabzhenie-iz-kolodca-v-dom": Droplets,
} as const;

const AVITO_BRAND_PROFILE_URL = "https://www.avito.ru/brands/kolodceff";

const canonicalPathByRoute: Record<string, string> = {
  "/price": "/price/",
  "/price/": "/price/",
  "/ceny": "/price/",
  "/ceny/": "/price/",
  "/contacts": "/contacts/",
  "/contacts/": "/contacts/",
  "/kontakty": "/contacts/",
  "/kontakty/": "/contacts/",
  "/cleaning": "/cleaning/",
  "/cleaning/": "/cleaning/",
  "/chistka-kolodcev": "/cleaning/",
  "/chistka-kolodcev/": "/cleaning/",
  "/repair": "/repair/",
  "/repair/": "/repair/",
  "/remont-kolodcev": "/repair/",
  "/remont-kolodcev/": "/repair/",
  "/seam-sealing": "/seam-sealing/",
  "/seam-sealing/": "/seam-sealing/",
  "/gidroizolyaciya-shvov": "/seam-sealing/",
  "/gidroizolyaciya-shvov/": "/seam-sealing/",
  "/stapling": "/stapling/",
  "/stapling/": "/stapling/",
  "/skobirovanie-kolodca": "/stapling/",
  "/skobirovanie-kolodca/": "/stapling/",
  "/bottom-filter": "/bottom-filter/",
  "/bottom-filter/": "/bottom-filter/",
  "/disinfection": "/disinfection/",
  "/disinfection/": "/disinfection/",
};

const serviceHrefBySlug: Record<string, string> = {
  "chistka-kolodcev": "/cleaning/",
  "remont-kolodcev": "/repair/",
  "gidroizolyaciya-shvov": "/seam-sealing/",
  "skobirovanie-kolodca": "/stapling/",
  "uglublenie-kolodcev": "/uglublenie-kolodcev/",
  "kopka-kolodcev": "/kopka-kolodcev/",
  "septik-iz-zhbi-kolec": "/septik-iz-zhb-kolec/",
  "drenazhnyy-kolodec": "/drenazhnyy-kolodec/",
  "vodosnabzhenie-iz-kolodca-v-dom": "/vodoprovod-iz-kolodca-v-dom/",
};

function getServiceHref(slug: string) {
  return serviceHrefBySlug[slug] ?? `/${slug}/`;
}

const staticRouteLabels: Record<string, string> = {
  "/": "Главная",
  "/uslugi": "Услуги",
  "/cleaning": "Чистка колодцев",
  "/cleaning/": "Чистка колодцев",
  "/chistka-kolodcev": "Чистка колодцев",
  "/repair": "Ремонт колодцев",
  "/repair/": "Ремонт колодцев",
  "/remont-kolodcev": "Ремонт колодцев",
  "/seam-sealing": "Герметизация швов",
  "/seam-sealing/": "Герметизация швов",
  "/gidroizolyaciya-shvov": "Гидроизоляция швов",
  "/stapling": "Скобирование колодца",
  "/stapling/": "Скобирование колодца",
  "/skobirovanie-kolodca": "Скобирование колодца",
  "/bottom-filter": "Донный фильтр",
  "/bottom-filter/": "Донный фильтр",
  "/disinfection": "Дезинфекция колодца",
  "/disinfection/": "Дезинфекция колодца",
  "/uglublenie-kolodcev": "Углубление колодцев",
  "/kopka-kolodcev": "Копка колодцев",
  "/septik-iz-zhb-kolec": "Септик из ЖБ колец",
  "/septik-iz-zhbi-kolec": "Септик из ЖБ колец",
  "/drenazhnyy-kolodec": "Дренажный колодец",
  "/vodoprovod-iz-kolodca-v-dom": "Водопровод из колодца в дом",
  "/vodosnabzhenie-iz-kolodca-v-dom": "Водоснабжение из колодца в дом",
  "/price": "Цены",
  "/ceny": "Цены",
  "/nashi-raboty": "Наши работы",
  "/o-nas": "О нас",
  "/o-kompanii": "О компании",
  "/contacts": "Контакты",
  "/contacts/": "Контакты",
  "/kontakty": "Контакты",
  "/faq": "FAQ",
  "/goroda": "Города",
  "/rajony-rabot": "Районы работ",
  "/rajony": "Районы",
};

const cityLabelBySlug = new Map(allSeoLocations.map((item) => [item.slug, item.name]));
const serviceLabelBySlug = new Map(services.map((item) => [item.slug, item.title]));

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildBreadcrumbItems(pathname: string) {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  if (normalizedPath === "/") {
    return [{ href: "/", label: "Главная" }];
  }

  const segments = normalizedPath.split("/").filter(Boolean);
  const items = [{ href: "/", label: "Главная" }];

  if (segments[0] === "goroda") {
    items.push({ href: "/goroda", label: "Города" });

    if (segments[1]) {
      items.push({ href: `/goroda/${segments[1]}`, label: cityLabelBySlug.get(segments[1]) ?? humanizeSlug(segments[1]) });
    }

    if (segments[2]) {
      items.push({
        href: `/goroda/${segments[1]}/${segments[2]}`,
        label: serviceLabelBySlug.get(segments[2]) ?? humanizeSlug(segments[2]),
      });
    }

    return items;
  }

  if (segments[0] === "rajony") {
    items.push({ href: "/rajony-rabot", label: "Районы работ" });

    if (segments[1]) {
      items.push({ href: `/rajony/${segments[1]}`, label: cityLabelBySlug.get(segments[1]) ?? humanizeSlug(segments[1]) });
    }

    return items;
  }

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    items.push({ href: currentPath, label: staticRouteLabels[currentPath] ?? humanizeSlug(segment) });
  }

  return items;
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "8f1b122e-09bf-4784-9ab9-5068f642ebec";
const PHONE_MASK_FOCUS_PREFIX = "+7 (";

function normalizeRussianPhoneDigits(value: string) {
  let digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  if (digitsOnly.length > 11 && digitsOnly.startsWith("7") && ["7", "8"].includes(digitsOnly[1] ?? "")) {
    digitsOnly = digitsOnly.slice(1);
  }

  if (digitsOnly.startsWith("8")) {
    return `7${digitsOnly.slice(1)}`.slice(0, 11);
  }

  if (digitsOnly.startsWith("7")) {
    return digitsOnly.slice(0, 11);
  }

  return `7${digitsOnly}`.slice(0, 11);
}

function formatRussianPhone(value: string, showPrefix = false) {
  const digits = normalizeRussianPhoneDigits(value);

  if (!digits) {
    return showPrefix ? PHONE_MASK_FOCUS_PREFIX : "";
  }

  const localDigits = digits.slice(1);
  let formatted = "+7";

  if (!localDigits.length) {
    return showPrefix ? PHONE_MASK_FOCUS_PREFIX : formatted;
  }

  formatted += ` (${localDigits.slice(0, 3)}`;

  if (localDigits.length < 3) {
    return formatted;
  }

  formatted += ")";

  if (localDigits.length === 3) {
    return `${formatted} `;
  }

  formatted += ` ${localDigits.slice(3, 6)}`;

  if (localDigits.length <= 6) {
    return formatted;
  }

  formatted += `-${localDigits.slice(6, 8)}`;

  if (localDigits.length <= 8) {
    return formatted;
  }

  formatted += `-${localDigits.slice(8, 10)}`;

  return formatted;
}

type ContactFormState = {
  name: string;
  phone: string;
  location: string;
  message: string;
  botcheck: string;
};

const initialContactFormState: ContactFormState = {
  name: "",
  phone: "",
  location: "",
  message: "",
  botcheck: "",
};

type TaskDiscussionFormState = {
  name: string;
  phone: string;
  cityArea: string;
  address: string;
  service: string;
  depth: string;
  issue: string;
  access: string;
  contactMethod: string;
  details: string;
  botcheck: string;
};

const initialTaskDiscussionFormState: TaskDiscussionFormState = {
  name: "",
  phone: "",
  cityArea: "",
  address: "",
  service: "",
  depth: "",
  issue: "",
  access: "",
  contactMethod: "",
  details: "",
  botcheck: "",
};

const discussionServiceOptions = [
  "Чистка колодцев",
  "Ремонт колодцев",
  "Скобирование колец",
  "Гидроизоляция швов",
  "Углубление колодцев",
  "Донный щит и гравий",
  "Копка колодцев",
  "Септики из ЖБ колец",
  "Дренажный колодец",
  "Водоснабжение из колодца в дом",
  "Другое",
] as const;

const discussionIssueOptions = [
  "Мутная вода",
  "Появился запах",
  "На дне песок и ил",
  "Течёт шов",
  "Идёт верховодка через кольца",
  "Смещены кольца",
  "Колодец пересох",
  "Нужно углубление",
  "Нужно выкопать новый колодец",
  "Нужен септик",
  "Нужно провести воду в дом",
  "Другое",
] as const;

const discussionDepthOptions = [
  "До 5 колец",
  "6–8 колец",
  "9–12 колец",
  "Больше 12 колец",
  "Не знаю точно",
] as const;

const discussionAccessOptions = [
  "Лёгкий подъезд",
  "Подъезд ограничен",
  "Нужно уточнить по фото/видео",
] as const;

const discussionContactMethodOptions = ["Звонок", "Telegram", "MAX"] as const;

type OpenTaskDialogOptions = {
  trackingId?: string;
  placement?: string;
  presetService?: string;
  presetIssue?: string;
  presetDetails?: string;
};

const TaskDiscussionDialogContext = createContext<{
  openTaskDialog: (options?: OpenTaskDialogOptions) => void;
} | null>(null);

function useTaskDiscussionDialog() {
  const context = useContext(TaskDiscussionDialogContext);

  if (!context) {
    throw new Error("Task discussion dialog context is unavailable.");
  }

  return context;
}

const CTA_METRIKA_GOALS: Record<string, string[]> = {
  header_phone: ["click_phone"],
  header_menu_phone: ["click_phone"],
  mobile_phone: ["click_phone"],
  final_phone: ["click_phone"],
  footer_phone: ["click_phone"],
  contacts_phone: ["click_phone"],
  contacts_inline_phone: ["click_phone"],
  mobile_telegram: ["click_tg"],
  header_menu_telegram: ["click_tg"],
  dialog_telegram: ["click_tg"],
  mobile_max: ["click_max"],
  header_menu_max: ["click_max"],
  dialog_max: ["click_max"],
  hero_avito_reviews: ["click_avito"],
  avito_reviews_banner: ["click_avito"],
  task_dialog_success: ["submit_lead"],
  contact_form_success: ["submit_lead"],
};

function getMetrikaGoalList(ctaId: string) {
  return Array.from(new Set(CTA_METRIKA_GOALS[ctaId] ?? []));
}

function getPrimaryMetrikaGoal(ctaId?: string) {
  if (!ctaId) {
    return "";
  }

  return CTA_METRIKA_GOALS[ctaId]?.[0] ?? "";
}

function MetrikaRouteTracker() {
  const [location] = useLocation();
  const isFirstRouteRender = useRef(true);

  useEffect(() => {
    if (isFirstRouteRender.current) {
      isFirstRouteRender.current = false;
      return;
    }

    sendMetrikaHit(window.location.href);
  }, [location]);

  return null;
}

function trackCtaClick(ctaId: string, placement?: string) {
  if (typeof window === "undefined") {
    return;
  }

  const detail = {
    ctaId,
    placement: placement ?? window.location.pathname,
    path: window.location.pathname,
    timestamp: Date.now(),
  };

  window.dispatchEvent(new CustomEvent("wellsmo:cta-click", { detail }));

  for (const goal of getMetrikaGoalList(ctaId)) {
    sendMetrikaGoal(goal, detail);
  }
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      requestAnimationFrame(() => {
        const target = document.querySelector(hash);

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

function getPageScrollContainers() {
  if (typeof document === "undefined") {
    return [] as HTMLElement[];
  }

  const containers = [
    document.querySelector<HTMLElement>("[data-scroll-container='page']"),
    document.scrollingElement instanceof HTMLElement ? document.scrollingElement : null,
    document.documentElement,
    document.body,
    document.querySelector<HTMLElement>("main"),
  ].filter(Boolean) as HTMLElement[];

  return Array.from(new Set(containers));
}

function getCurrentPageScrollTop() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 0;
  }

  const containerScrollTop = getPageScrollContainers().reduce((maxScroll, element) => Math.max(maxScroll, element.scrollTop || 0), 0);

  return Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0, document.body.scrollTop || 0, containerScrollTop);
}

function scrollPageToTop() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  for (const element of getPageScrollContainers()) {
    element.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function subscribeToPageScroll(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const targets = Array.from(new Set<EventTarget>([window, ...getPageScrollContainers()]));

  targets.forEach((target) => {
    target.addEventListener("scroll", listener, { passive: true });
  });

  window.addEventListener("resize", listener, { passive: true });

  return () => {
    targets.forEach((target) => {
      target.removeEventListener("scroll", listener);
    });

    window.removeEventListener("resize", listener);
  };
}

function ScrollTopFloatingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const viewportThreshold = typeof window === "undefined" ? 320 : Math.max(240, Math.min(360, Math.round(window.innerHeight * 0.5)));
      setIsVisible(getCurrentPageScrollTop() > viewportThreshold);
    };

    handleScroll();
    const unsubscribe = subscribeToPageScroll(handleScroll);

    return unsubscribe;
  }, []);

  return (
    <button
      type="button"
      onClick={scrollPageToTop}
      aria-label="Вернуться наверх"
      className={cn(
        "fixed right-4 bottom-[88px] z-[59] inline-flex size-12 items-center justify-center rounded-full border border-white/55 bg-primary text-[#111723] shadow-[0_20px_48px_rgba(199,154,63,0.52)] ring-2 ring-white/30 backdrop-blur-md transition-all duration-300 lg:right-8 lg:bottom-[110px]",
        isVisible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="size-5 stroke-[2.6]" />
    </button>
  );
}

function usePageSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = "ru";

    const ensureMeta = (selector: string, attribute: "name" | "property", value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }

      return element;
    };

    const ensureLink = (selector: string, rel: string) => {
      let element = document.head.querySelector<HTMLLinkElement>(selector);

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }

      return element;
    };

    const currentUrl = typeof window !== "undefined" ? window.location.href : "https://wells-mo.ru";
    const canonicalUrl = (() => {
      if (typeof window === "undefined") {
        return "https://wells-mo.ru";
      }

      const { origin, pathname } = window.location;
      const canonicalPath = canonicalPathByRoute[pathname] ?? pathname;

      return `${origin}${canonicalPath}`;
    })();
    const keywordPool = [
      "чистка колодцев московская область",
      "ремонт колодцев московская область",
      "гидроизоляция швов колодца",
      "скобирование колец колодца",
      "углубление колодцев",
      "одинцово",
      "истра",
      "дмитров",
      title,
    ];
    const keywords = Array.from(new Set(keywordPool)).join(", ");

    ensureMeta('meta[name="description"]', "name", "description").setAttribute("content", description);
    ensureMeta('meta[name="keywords"]', "name", "keywords").setAttribute("content", keywords);
    ensureMeta('meta[name="robots"]', "name", "robots").setAttribute("content", "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1");
    ensureMeta('meta[property="og:title"]', "property", "og:title").setAttribute("content", title);
    ensureMeta('meta[property="og:description"]', "property", "og:description").setAttribute("content", description);
    ensureMeta('meta[property="og:url"]', "property", "og:url").setAttribute("content", canonicalUrl);
    ensureMeta('meta[property="og:type"]', "property", "og:type").setAttribute("content", "website");
    ensureLink('link[rel="canonical"]', "canonical").setAttribute("href", canonicalUrl);

    let schemaScript = document.head.querySelector<HTMLScriptElement>('script[data-schema="wellsmo-localbusiness"]');
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.dataset.schema = "wellsmo-localbusiness";
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteMeta.name,
      description,
      url: canonicalUrl,
      telephone: siteMeta.phoneHref.replace("tel:", "+"),
      email: siteMeta.email,
      areaServed: ["Московская область", "Одинцово", "Истра", "Дмитров", "Красногорск", "Солнечногорск", "Химки", "Лобня"],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Московская область",
        addressCountry: "RU",
      },
      serviceType: title,
    });
  }, [title, description]);
}

function PrimaryLink({
  href,
  children,
  trackingId,
  trackingPlacement,
}: {
  href: string;
  children: ReactNode;
  trackingId?: string;
  trackingPlacement?: string;
}) {
  const resolvedTrackingId = trackingId ?? href;

  return (
    <Link
      href={href}
      data-cta={resolvedTrackingId}
      data-cta-placement={trackingPlacement ?? href}
      onClick={() => trackCtaClick(resolvedTrackingId, trackingPlacement)}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px] hover:shadow-[0_12px_32px_rgba(193,145,71,0.25)]"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
  trackingId,
  trackingPlacement,
}: {
  href: string;
  children: ReactNode;
  trackingId?: string;
  trackingPlacement?: string;
}) {
  const resolvedTrackingId = trackingId ?? href;

  return (
    <Link
      href={href}
      data-cta={resolvedTrackingId}
      data-cta-placement={trackingPlacement ?? href}
      onClick={() => trackCtaClick(resolvedTrackingId, trackingPlacement)}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-primary/40 hover:bg-white/8"
    >
      {children}
    </Link>
  );
}

function TaskDiscussionDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TaskDiscussionFormState>(initialTaskDiscussionFormState);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [dialogPlacement, setDialogPlacement] = useState("");
  const leadTrackedRef = useRef(false);

  const resetSubmitState = () => {
    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
  };

  const handleFieldChange =
    (field: keyof TaskDiscussionFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;

      setFormData((current) => ({
        ...current,
        [field]: value,
      }));

      resetSubmitState();
    };

  const handleChoiceChange = (field: "service" | "issue" | "depth" | "access" | "contactMethod", value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: current[field] === value ? "" : value,
    }));

    resetSubmitState();
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextPhoneValue = formatRussianPhone(event.target.value);

    setFormData((current) => ({
      ...current,
      phone: nextPhoneValue,
    }));

    resetSubmitState();
  };

  const handlePhoneFocus = () => {
    setFormData((current) => {
      if (current.phone.trim()) {
        return current;
      }

      return {
        ...current,
        phone: PHONE_MASK_FOCUS_PREFIX,
      };
    });
  };

  const openTaskDialog = (options: OpenTaskDialogOptions = {}) => {
    const resolvedPlacement = options.placement ?? (typeof window !== "undefined" ? window.location.pathname : "site");
    const resolvedTrackingId = options.trackingId ?? "task_dialog_open";

    setDialogPlacement(resolvedPlacement);
    setFormData({
      ...initialTaskDiscussionFormState,
      service: options.presetService ?? "",
      issue: options.presetIssue ?? "",
      details: options.presetDetails ?? "",
    });
    setSubmitState("idle");
    setSubmitMessage("");
    leadTrackedRef.current = false;
    setOpen(true);
    trackCtaClick(resolvedTrackingId, resolvedPlacement);
  };

  const trackSuccessfulLead = () => {
    if (leadTrackedRef.current) {
      return;
    }

    leadTrackedRef.current = true;
    trackCtaClick("task_dialog_success", dialogPlacement || "task_dialog");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSubmitState("idle");
      setSubmitMessage("");
    }
  };

  const normalizedPhoneDigits = normalizeRussianPhoneDigits(formData.phone);

  const buildTaskMessage = () => {
    const normalizedData = {
      name: formData.name.trim(),
      phone: formatRussianPhone(formData.phone),
      cityArea: formData.cityArea.trim(),
      address: formData.address.trim(),
      service: formData.service.trim(),
      depth: formData.depth.trim(),
      issue: formData.issue.trim(),
      access: formData.access.trim(),
      contactMethod: formData.contactMethod.trim(),
      details: formData.details.trim(),
      botcheck: formData.botcheck.trim(),
    };

    if (normalizedData.botcheck) {
      return { ok: false as const, message: "Проверка формы не пройдена.", text: "" };
    }

    if (!normalizedData.name || !normalizedData.phone || !normalizedData.cityArea || !normalizedData.address || !normalizedData.service || !normalizedData.depth || !normalizedData.issue || !normalizedData.access || !normalizedData.contactMethod) {
      return {
        ok: false as const,
        message: "Заполните имя, телефон, город или район, адрес, услугу, глубину, проблему, подъезд и удобный канал связи.",
        text: "",
      };
    }

    if (normalizedPhoneDigits.length < 11) {
      return { ok: false as const, message: "Укажите полный номер телефона в формате +7 (999) 123-45-67.", text: "" };
    }

    const text = [
      "Заявка с сайта WELLS-MO",
      `Имя: ${normalizedData.name}`,
      `Телефон: ${normalizedData.phone}`,
      `Город / район: ${normalizedData.cityArea}`,
      `Адрес / ориентир: ${normalizedData.address}`,
      `Услуга: ${normalizedData.service}`,
      `Количество колец / глубина: ${normalizedData.depth}`,
      `Проблема: ${normalizedData.issue}`,
      `Подъезд: ${normalizedData.access}`,
      `Удобная связь: ${normalizedData.contactMethod}`,
      `Комментарий: ${normalizedData.details || "Без комментария"}`,
      `Страница отправки: ${dialogPlacement || (typeof window !== "undefined" ? window.location.pathname : "wells-mo.ru")}`,
    ].join("\n");

    return { ok: true as const, message: "", text };
  };

  const copyRequestToClipboard = async () => {
    const payload = buildTaskMessage();

    if (!payload.ok) {
      setSubmitState("error");
      setSubmitMessage(payload.message);
      return null;
    }

    try {
      await navigator.clipboard.writeText(payload.text);
      trackSuccessfulLead();
      setSubmitState("success");
      setSubmitMessage("Заявка собрана и скопирована. Теперь можно отправить её через Telegram, MAX или почту.");
      return payload.text;
    } catch {
      setSubmitState("error");
      setSubmitMessage("Не удалось скопировать заявку автоматически. Попробуйте ещё раз или отправьте её по телефону.");
      return null;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await copyRequestToClipboard();
  };

  const handleOpenTelegram = async () => {
    const text = await copyRequestToClipboard();
    if (!text) return;
    trackCtaClick("dialog_telegram", dialogPlacement || "task_dialog");
    window.open(siteMeta.telegramUrl, "_blank", "noopener,noreferrer");
  };

  const handleOpenMax = async () => {
    const text = await copyRequestToClipboard();
    if (!text) return;
    trackCtaClick("dialog_max", dialogPlacement || "task_dialog");
    window.open(siteMeta.maxUrl, "_blank", "noopener,noreferrer");
  };

  const handleOpenMail = async () => {
    const payload = buildTaskMessage();

    if (!payload.ok) {
      setSubmitState("error");
      setSubmitMessage(payload.message);
      return;
    }

    const mailtoHref = `mailto:${siteMeta.email}?subject=${encodeURIComponent("Заявка с сайта WELLS-MO")}&body=${encodeURIComponent(payload.text)}`;
    trackSuccessfulLead();
    window.location.href = mailtoHref;
    setSubmitState("success");
    setSubmitMessage("Почтовый клиент открыт. Если нужно, сначала можно скопировать заявку и отправить её в Telegram или MAX.");
  };

  const contextValue = useMemo(() => ({ openTaskDialog }), []);

  return (
    <TaskDiscussionDialogContext.Provider value={contextValue}>
      {children}
      <button
        type="button"
        onClick={() => openTaskDialog({ trackingId: "desktop_floating_request", placement: "desktop_floating_cta" })}
        className="fixed bottom-8 right-8 z-[60] hidden rounded-full border border-primary/30 bg-[#111723]/88 px-5 py-3 text-sm font-semibold text-primary shadow-[0_18px_42px_rgba(0,0,0,0.32)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(193,145,71,0.2)] lg:inline-flex"
      >
        Задать задачу
      </button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-h-[calc(100vh-2rem)] max-w-[min(72rem,calc(100%-2rem))] overflow-y-auto border border-white/10 bg-[#0d1219] p-0 text-white shadow-[0_32px_120px_rgba(0,0,0,0.58)]"
          showCloseButton
        >
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/8 bg-[radial-gradient(circle_at_top,_rgba(193,145,71,0.18),_transparent_55%),linear-gradient(180deg,#111723_0%,#0b0f15_100%)] p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="section-kicker">Задать задачу</div>
              <DialogHeader className="mt-4 text-left">
                <DialogTitle className="font-heading text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                  Заявка без лишних созвонов
                </DialogTitle>
                <DialogDescription className="max-w-md text-sm leading-7 text-white/62">
                  Заполните объект по делу. Мы соберём текст заявки, чтобы вы могли сразу отправить его в Telegram, MAX или на почту.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-8 grid gap-3">
                {[
                  "Если швы текут, одной чистки мало — это сразу видно по форме заявки.",
                  "Если кольца смещены, мы увидим, что нужен не косметический ремонт, а фиксация конструкции.",
                  "Лучше сразу дать адрес, глубину и фото или видео — так проще назвать реальный порядок работ.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/72">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 lg:p-8">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" value={formData.botcheck} onChange={handleFieldChange("botcheck")} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" autoComplete="name" value={formData.name} onChange={handleFieldChange("name")} className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34" placeholder="Имя" />
                  <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={handlePhoneChange} onFocus={handlePhoneFocus} className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34" placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="cityArea" autoComplete="address-level2" value={formData.cityArea} onChange={handleFieldChange("cityArea")} className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34" placeholder="Город / район" />
                  <input name="address" autoComplete="street-address" value={formData.address} onChange={handleFieldChange("address")} className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34" placeholder="Адрес / ориентир" />
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">Тип услуги</div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {discussionServiceOptions.map((option) => (
                      <button key={option} type="button" onClick={() => handleChoiceChange("service", option)} className={cn("rounded-[1.3rem] border px-4 py-4 text-left text-sm font-medium transition", formData.service === option ? "border-primary/45 bg-primary/14 text-primary shadow-[0_14px_32px_rgba(193,145,71,0.18)]" : "border-white/10 bg-white/4 text-white/78 hover:border-primary/30 hover:bg-white/7")}>{option}</button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="space-y-3">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">Количество колец / глубина</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {discussionDepthOptions.map((option) => (
                        <button key={option} type="button" onClick={() => handleChoiceChange("depth", option)} className={cn("rounded-[1.3rem] border px-4 py-4 text-left text-sm font-medium transition", formData.depth === option ? "border-primary/45 bg-primary/14 text-primary shadow-[0_14px_32px_rgba(193,145,71,0.18)]" : "border-white/10 bg-white/4 text-white/78 hover:border-primary/30 hover:bg-white/7")}>{option}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">Есть ли подъезд</div>
                    <div className="grid gap-3">
                      {discussionAccessOptions.map((option) => (
                        <button key={option} type="button" onClick={() => handleChoiceChange("access", option)} className={cn("rounded-[1.3rem] border px-4 py-4 text-left text-sm font-medium transition", formData.access === option ? "border-primary/45 bg-primary/14 text-primary shadow-[0_14px_32px_rgba(193,145,71,0.18)]" : "border-white/10 bg-white/4 text-white/78 hover:border-primary/30 hover:bg-white/7")}>{option}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">Что происходит</div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {discussionIssueOptions.map((option) => (
                      <button key={option} type="button" onClick={() => handleChoiceChange("issue", option)} className={cn("rounded-[1.3rem] border px-4 py-4 text-left text-sm font-medium transition", formData.issue === option ? "border-primary/45 bg-primary/14 text-primary shadow-[0_14px_32px_rgba(193,145,71,0.18)]" : "border-white/10 bg-white/4 text-white/78 hover:border-primary/30 hover:bg-white/7")}>{option}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">Как удобнее связаться</div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {discussionContactMethodOptions.map((option) => (
                      <button key={option} type="button" onClick={() => handleChoiceChange("contactMethod", option)} className={cn("rounded-[1.3rem] border px-4 py-4 text-left text-sm font-medium transition", formData.contactMethod === option ? "border-primary/45 bg-primary/14 text-primary shadow-[0_14px_32px_rgba(193,145,71,0.18)]" : "border-white/10 bg-white/4 text-white/78 hover:border-primary/30 hover:bg-white/7")}>{option}</button>
                    ))}
                  </div>
                </div>
                <textarea name="details" value={formData.details} onChange={handleFieldChange("details")} className="min-h-32 rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-base text-white placeholder:text-white/34" placeholder="Комментарий: что уже делали, когда появилась проблема, есть ли фото/видео, какая точка на карте..." />
                {submitState !== "idle" ? <div className={cn("rounded-[1.4rem] border px-4 py-3 text-sm leading-7", submitState === "success" && "border-emerald-400/30 bg-emerald-500/10 text-emerald-50", submitState === "error" && "border-rose-400/30 bg-rose-500/10 text-rose-50")}>{submitMessage}</div> : null}
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px]">Скопировать заявку</button>
                  <button type="button" onClick={handleOpenMail} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-primary/40 hover:bg-white/8">На почту</button>
                  <button type="button" onClick={handleOpenTelegram} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-primary/40 hover:bg-white/8">Telegram</button>
                  <button type="button" onClick={handleOpenMax} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-primary/40 hover:bg-white/8">MAX</button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TaskDiscussionDialogContext.Provider>
  );
}

function RequestDialogButton({
  children,
  trackingId,
  trackingPlacement,
  presetService,
  presetIssue,
  presetDetails,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  trackingId?: string;
  trackingPlacement?: string;
  presetService?: string;
  presetIssue?: string;
  presetDetails?: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const { openTaskDialog } = useTaskDiscussionDialog();

  return (
    <button
      type="button"
      data-cta={trackingId ?? "task_dialog_open"}
      data-cta-placement={trackingPlacement ?? "dialog_button"}
      data-metrika-goal={getPrimaryMetrikaGoal(trackingId ?? "task_dialog_open")}
      onClick={() =>
        openTaskDialog({
          trackingId,
          placement: trackingPlacement,
          presetService,
          presetIssue,
          presetDetails,
        })
      }
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:translate-y-[-1px] sm:w-auto",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:shadow-[0_12px_32px_rgba(193,145,71,0.25)]"
          : "border border-white/12 bg-white/4 text-white/90 hover:border-primary/40 hover:bg-white/8",
        className,
      )}
    >
      {children}
    </button>
  );
}

function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden">
      <div className="mx-auto max-w-screen-sm rounded-[1.4rem] border border-white/10 bg-[#0b0f15]/72 shadow-[0_-12px_32px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <div className="grid grid-cols-2 gap-2 p-2.5 sm:grid-cols-4">
          <a
            href={siteMeta.phoneHref}
            data-cta="mobile_phone"
            data-cta-placement="mobile_sticky_bar"
            onClick={() => trackCtaClick("mobile_phone", "mobile_sticky_bar")}
            className="inline-flex min-h-[46px] min-w-0 items-center justify-center rounded-full border border-primary/20 bg-primary/12 px-2 py-3 text-xs font-semibold text-primary"
          >
            Позвонить
          </a>
          <a
            href={siteMeta.telegramUrl}
            target="_blank"
            rel="noreferrer"
            data-cta="mobile_telegram"
            data-cta-placement="mobile_sticky_bar"
            onClick={() => trackCtaClick("mobile_telegram", "mobile_sticky_bar")}
            className="inline-flex min-h-[46px] min-w-0 items-center justify-center rounded-full border border-white/12 bg-white/5 px-2 py-3 text-xs font-semibold text-white/88"
          >
            Telegram
          </a>
          <a
            href={siteMeta.maxUrl}
            target="_blank"
            rel="noreferrer"
            data-cta="mobile_max"
            data-cta-placement="mobile_sticky_bar"
            onClick={() => trackCtaClick("mobile_max", "mobile_sticky_bar")}
            className="inline-flex min-h-[46px] min-w-0 items-center justify-center rounded-full border border-white/12 bg-white/5 px-2 py-3 text-xs font-semibold text-white/88"
          >
            MAX
          </a>
          <RequestDialogButton trackingId="mobile_request" trackingPlacement="mobile_sticky_bar" className="px-2 py-3 text-xs">Заявка</RequestDialogButton>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300",
        isScrolled
          ? "border-white/14 bg-[#0b1016]/94 shadow-[0_20px_48px_rgba(2,8,12,0.45)]"
          : "border-white/8 bg-[#0d1118]/82",
      )}
    >
      <div className="container flex min-h-[72px] items-center justify-between gap-3 py-3 lg:min-h-[80px] lg:gap-4">
        <Link href="/" className="min-w-0 flex-1 lg:flex-none">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-[0_10px_24px_rgba(199,154,63,0.18)] lg:size-11">
              <Droplets className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="font-heading text-base font-bold tracking-[-0.04em] text-white lg:text-lg">{siteMeta.name}</div>
              <div className="truncate text-[11px] text-white/55 lg:text-xs">{siteMeta.tagline}</div>
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteMeta.phoneHref}
            data-cta="header_phone"
            data-cta-placement="header_desktop"
            onClick={() => trackCtaClick("header_phone", "header_desktop")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-white/85"
          >
            <Phone className="size-4 text-primary" />
            {siteMeta.phone}
          </a>
          <a
            href="/price/"
            data-cta="header_prices"
            data-cta-placement="header_desktop"
            onClick={() => trackCtaClick("header_prices", "header_desktop")}
            className="inline-flex items-center gap-2 rounded-full border border-primary/24 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary/40 hover:bg-primary/14"
          >
            Посмотреть цены
            <ArrowRight className="size-4" />
          </a>
          <RequestDialogButton trackingId="header_request" trackingPlacement="header_desktop">Оставить заявку</RequestDialogButton>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/8"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
            Меню
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-white lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/8 bg-[#0c1016]/96">
          <div className="container max-h-[calc(100vh-5rem)] overflow-y-auto py-4 lg:py-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start">
              <div className="grid gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-base font-medium text-white/78 transition hover:bg-white/6 hover:text-white",
                      location === item.href && "bg-white/6 text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/rajony-rabot"
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-base font-medium text-white/78 transition hover:bg-white/6 hover:text-white",
                    location === "/rajony-rabot" && "bg-white/6 text-white",
                  )}
                >
                  Районы
                </Link>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4 lg:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">Быстрый доступ</div>
                <div className="mt-4 grid gap-3">
                  <a
                    href={siteMeta.phoneHref}
                    data-cta="header_menu_phone"
                    data-cta-placement="header_menu"
                    onClick={() => trackCtaClick("header_menu_phone", "header_menu")}
                    className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary"
                  >
                    <Phone className="size-4" />
                    {siteMeta.phone}
                  </a>
                  <RequestDialogButton trackingId="header_request_menu" trackingPlacement="header_menu" className="w-full justify-center">
                    Оставить заявку
                  </RequestDialogButton>
                  <a
                    href="/price/"
                    data-cta="header_prices"
                    data-cta-placement="header_menu"
                    onClick={() => trackCtaClick("header_prices", "header_menu")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/22 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary/38 hover:bg-primary/14"
                  >
                    Посмотреть цены
                    <ArrowRight className="size-4" />
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={siteMeta.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cta="header_menu_telegram"
                      data-cta-placement="header_menu"
                      onClick={() => trackCtaClick("header_menu_telegram", "header_menu")}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-white/88 transition hover:bg-white/8"
                    >
                      Telegram
                    </a>
                    <a
                      href={siteMeta.maxUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cta="header_menu_max"
                      data-cta-placement="header_menu"
                      onClick={() => trackCtaClick("header_menu_max", "header_menu")}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-white/88 transition hover:bg-white/8"
                    >
                      MAX
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function SiteBreadcrumbs() {
  const [location] = useLocation();
  const items = useMemo(() => buildBreadcrumbItems(location), [location]);

  return (
    <div className="border-b border-white/6 bg-white/[0.02]">
      <div className="container py-3">
        <Breadcrumb>
          <BreadcrumbList className="text-xs text-white/52 sm:text-sm">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <div key={item.href} className="contents">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-medium text-white/86">{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild className="text-white/56 hover:text-white/86">
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast ? <BreadcrumbSeparator className="text-white/30" /> : null}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 py-10">
      <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div className="space-y-4">
          <div className="font-heading text-2xl font-bold text-white">{siteMeta.name}</div>
          <p className="max-w-md text-sm leading-7 text-white/62">
            Чистка, ремонт, гидроизоляция, скобирование и углубление колодцев по Московской области.
          </p>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary/85">
            Навигация
          </div>
          <div className="grid gap-3 text-sm text-white/70">
            {[...navigation, { href: "/rajony-rabot", label: "Районы" }].map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary/85">
            Связь
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <a
              href={siteMeta.phoneHref}
              data-cta="footer_phone"
              data-cta-placement="footer"
              onClick={() => trackCtaClick("footer_phone", "footer")}
              className="block transition hover:text-white"
            >
              {siteMeta.phone}
            </a>
            <a href={`mailto:${siteMeta.email}`} className="block transition hover:text-white">
              {siteMeta.email}
            </a>
            <div>{siteMeta.coverage}</div>
            <div>{siteMeta.baseLocation}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <TaskDiscussionDialogProvider>
      <div data-scroll-container="page" className="site-shell min-h-screen pb-28 lg:pb-0">
        <ScrollToTop />
        <MetrikaRouteTracker />
        <div className="mesh-glow left-[-8rem] top-24 h-72 w-72 bg-primary/18" />
        <div className="mesh-glow right-[-4rem] top-[30rem] h-64 w-64 bg-sky-400/8" />
        <Header />
        <main className="pt-[72px] lg:pt-[80px]">
          <SiteBreadcrumbs />
          {children}
        </main>
        <ScrollTopFloatingButton />
        <MobileStickyBar />
        <Footer />
      </div>
    </TaskDiscussionDialogProvider>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="section-kicker">{eyebrow}</div>
      <h2 className="section-title text-white">{title}</h2>
      <p className="story-copy max-w-2xl">{description}</p>
    </div>
  );
}

function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-10 lg:pb-16 lg:pt-14">
      <div className="container hero-grid">
        <div className="reveal-rise space-y-8 pb-8 lg:pb-0">
          <div className="copper-chip">
            <span className="inline-block size-2 rounded-full bg-primary" />
            {siteMeta.coverage}
          </div>
          <div className="space-y-5">
            <h1 className="hero-title text-white">Чистка и ремонт колодцев в Московской области</h1>
            <p className="max-w-2xl text-base leading-8 text-white/78 sm:text-lg lg:text-xl">
              Откачка воды, мойка шахты до 400 бар, чистка дна, герметизация швов, скобирование колец, дезинфекция и восстановление колодцев без лишних услуг и размытых обещаний.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1.15fr]">
            <a
              href="#services"
              data-cta="hero_services"
              data-cta-placement="home_hero"
              onClick={() => trackCtaClick("hero_services", "home_hero")}
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[#11141d] transition hover:translate-y-[-1px] hover:bg-primary/90"
            >
              Посмотреть услуги
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#prices"
              data-cta="hero_prices"
              data-cta-placement="home_hero"
              onClick={() => trackCtaClick("hero_prices", "home_hero")}
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-primary/24 bg-primary/12 px-6 py-3 text-sm font-semibold text-primary transition hover:translate-y-[-1px] hover:border-primary/40 hover:bg-primary/16"
            >
              Узнать цены (без «от»)
              <ArrowRight className="size-4" />
            </a>
            <a
              href={AVITO_BRAND_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="hero_avito_reviews"
              data-cta-placement="home_hero"
              onClick={() => trackCtaClick("hero_avito_reviews", "home_hero")}
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-[#6ee7d2]/28 bg-[linear-gradient(135deg,rgba(18,124,107,0.42),rgba(15,22,30,0.98)_44%,rgba(0,170,239,0.18)_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_22px_50px_rgba(2,8,12,0.28)] transition hover:translate-y-[-1px] hover:border-[#6ee7d2]/45"
            >
              <span className="relative flex size-5 shrink-0 items-center justify-center">
                <span className="absolute left-0 top-0 size-2 rounded-full bg-[#97cf26]" />
                <span className="absolute right-0 top-0.5 size-1.5 rounded-full bg-[#00aaef]" />
                <span className="absolute left-0.5 bottom-0 size-1.5 rounded-full bg-[#ff6163]" />
                <span className="absolute right-0 bottom-0 size-2 rounded-full bg-[#8dd6b7]" />
              </span>
              Честные отзывы на Авито
              <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {trustMetrics.map((item) => (
              <div key={item.value} className="hero-stat p-4">
                <div className="metric-value text-primary">{item.value}</div>
                <div className="mt-2 text-sm leading-6 text-white/78">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-rise reveal-rise-delay-1 page-frame overflow-hidden rounded-[2rem] p-3">
          <div className="image-mask min-h-[380px] sm:min-h-[460px] lg:min-h-[620px]">
            <img
              src={assets.hero}
              alt="Чистка и ремонт колодца в Московской области — объект WELLS-MO"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15] via-[#0b0f15]/42 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-full border border-white/14 bg-[#10151d]/84 px-4 py-3 backdrop-blur-md">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-primary/90">WELLS-MO</div>
                <div className="text-sm text-white/78">Чистка и ремонт колодцев</div>
              </div>
              <ShieldCheck className="size-5 text-primary" />
            </div>
            <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] border border-white/12 bg-[#0f141d]/84 p-5 backdrop-blur-xl">
              <div className="mb-3 text-xs uppercase tracking-[0.22em] text-primary/90">
                Что важно клиенту
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Сразу видно фиксированные цены без приставки «от»",
                  "Под героем — реальные фото объектов и понятный порядок работ",
                  "Нижняя панель связи остаётся, поэтому первый экран не перегружен",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/6 p-4 text-sm text-white/82">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const featuredCards = [
    {
      slug: "chistka-kolodcev",
      href: "/cleaning/",
      eyebrow: "Главная услуга",
      title: "Чистка колодцев",
      description:
        "Полная чистка шахты: откачка воды, мойка стенок, очистка дна и разбор реального состояния колодца без поверхностных решений.",
      price: "14 000 ₽",
    },
    {
      slug: "remont-kolodcev",
      href: "/repair/",
      eyebrow: "Главная услуга",
      title: "Ремонт колодцев",
      description:
        "Ремонт швов, устранение течей, восстановление шахты и понятная логика работ, когда колодцу уже мало одной чистки.",
      price: "от 3 000 ₽ за шов",
    },
    {
      slug: "skobirovanie-kolodca",
      href: "/stapling/",
      eyebrow: "Внутри ремонта",
      title: "Скобирование колец",
      description:
        "Фиксируем смещённые кольца, чтобы остановить движение шахты и подготовить колодец к нормальному ремонту швов.",
      price: "от 1 500 ₽ за шов",
    },
    {
      slug: "gidroizolyaciya-shvov",
      href: "/seam-sealing/",
      eyebrow: "Внутри ремонта",
      title: "Гидроизоляция швов",
      description:
        "Закрываем текущие и сухие швы, убираем подсос верховодки и работаем по фактическому состоянию стыков внутри шахты.",
      price: "от 3 000 ₽",
    },
    {
      slug: "uglublenie-kolodcev",
      href: "/uglublenie-kolodcev",
      eyebrow: "Внутри ремонта",
      title: "Углубление колодцев",
      description:
        "Оцениваем пересохший колодец, проверяем состояние шахты и углубляем его только там, где это действительно безопасно и оправдано.",
      price: "по результатам осмотра",
    },
    {
      slug: "donny-shchit-i-graviy",
      href: "/remont-kolodcev#donny-shchit-i-graviy",
      eyebrow: "Внутри ремонта",
      title: "Донный щит и гравий",
      description:
        "Ставим донный щит из лиственницы и засыпаем речной гравий, когда нужно восстановить нижнюю часть колодца и фильтрующий слой.",
      price: "от 10 000 ₽",
    },
    {
      slug: "kopka-kolodcev",
      href: "/kopka-kolodcev",
      eyebrow: "Дополнительная услуга",
      title: "Копка колодцев",
      description:
        "Копаем новые колодцы из ЖБ колец, но оставляем это как отдельное направление, а не как главное лицо сайта.",
      price: "от 8 500 ₽ за кольцо",
    },
    {
      slug: "septik-iz-zhbi-kolec",
      href: "/septik-iz-zhbi-kolec",
      eyebrow: "Дополнительная услуга",
      title: "Септики из ЖБ колец",
      description:
        "Собираем септики из ЖБ колец под ключ с доставкой и монтажом, но держим эту услугу во второстепенном блоке сайта.",
      price: "от 11 000 ₽ за кольцо Ø1 м",
    },
    {
      slug: "vodosnabzhenie-iz-kolodca-v-dom",
      href: "/vodosnabzhenie-iz-kolodca-v-dom",
      eyebrow: "Дополнительная услуга",
      title: "Водоснабжение из колодца в дом",
      description:
        "Подводим воду из колодца в дом как отдельную дополнительную услугу, не смешивая её с главным ремонтом и чисткой шахты.",
      price: "от 2 500 ₽ / пог. м",
    },
  ] as const;

  return (
    <section id="services" className="scroll-mt-28 py-12 lg:py-16">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Ключевые услуги"
          title="Главные направления работ по колодцу"
          description="После реестра цен и реальных фотографий показываем только те услуги, которые чаще всего ищут в горячем трафике: чистку, ремонт, герметизацию, скобирование и связанные работы по шахте."
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {featuredCards.map((service) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] ?? Wrench;

            return (
              <Link
                key={service.slug}
                href={service.href}
                className="glass-panel card-hover flex h-full flex-col rounded-[1.8rem] p-5"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.2em] text-white/46">
                    {service.eyebrow}
                  </div>
                </div>
                <h3 className="service-card-title text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">{service.description}</p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-primary/88">Технология и этапы</span>
                  <span className="inline-flex items-center gap-2 text-white/68">
                    Подробнее <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div className="page-frame rounded-[2rem] p-6 lg:p-8">
          <div className="section-kicker">Почему доверяют</div>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Почему клиенты <span className="text-gradient-metal">доверяют работу</span>
          </h2>
          <p className="story-copy mt-5">
            Решение о заказе принимают не по красивым словам, а по тому, насколько спокойно и
            понятно объяснены работы, показаны реальные объекты и соблюдена аккуратность на
            участке.
          </p>
          <div className="metal-line my-8" />
          <div className="space-y-5">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/62">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              src: assets.fieldCrew,
              alt: "Бригада WELLS-MO выполняет чистку и ремонт колодцев в Московской области",
            },
            {
              src: assets.wellDigging,
              alt: "Копка колодца из ЖБ колец в Московской области",
            },
            {
              src: assets.septic,
              alt: "Монтаж септика из ЖБ колец в Московской области",
            },
            {
              src: assets.waterSupply,
              alt: "Водоснабжение из колодца в частный дом в Московской области",
            },
          ].map((asset, index) => (
            <div key={asset.src} className={cn("image-mask page-frame overflow-hidden rounded-[1.8rem]", index === 0 ? "md:col-span-2 min-h-[260px]" : "min-h-[240px]")}>
              <img
                src={asset.src}
                alt={asset.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Этапы работ"
          title="Выезд, откачка, мойка 400 бар и дезинфекция"
          description="Ниже показана техническая последовательность работ по горячим заявкам: сначала выезд и диагностика, затем откачка воды, мойка шахты и только после этого герметизация, дезинфекция и финальная проверка."
        />
        <div className="grid gap-5 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.number} className="glass-panel rounded-[1.8rem] p-6">
              <div className="metric-value text-primary">{step.number}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Фотографии наших работ"
          title="Реальные объекты до и после работ"
          description="Сразу после прайса показываем реальные фотографии из объектов WELLS-MO, чтобы решение принималось по фактам: видно состояние шахты до работ и результат после чистки, герметизации и восстановления."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item) => (
            <figure key={item.title} className="page-frame overflow-hidden rounded-[1.8rem]">
              <div className="image-mask min-h-[300px] border-b border-white/10 bg-[#0f141d]">
                <img
                  src={item.image}
                  alt={`${item.service} в Московской области — ${item.stage} — ${item.title}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption className="space-y-4 p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
                      item.stage === "До работ"
                        ? "border-rose-400/28 bg-rose-500/10 text-rose-100"
                        : "border-emerald-400/28 bg-emerald-500/10 text-emerald-100",
                    )}
                  >
                    {item.stage}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/78">
                    {item.service}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-primary/88">{item.location}</div>
                <h3 className="text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
                <p className="text-sm leading-7 text-white/74">{item.result}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="prices" className="scroll-mt-28 py-12 lg:py-16">
      <div className="container grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="reveal-rise space-y-5">
          <div className="section-kicker">Единый реестр цен</div>
          <h2 className="section-title text-white">Фиксированные цены без приставки «от»</h2>
          <p className="story-copy text-white/78">
            Сразу под первым экраном показываем единый прайс по самым частым работам: без размытых вилок, без «от» и без необходимости сначала звонить, чтобы понять порядок бюджета.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Только горячие и часто заказываемые позиции",
              "Фиксированная стоимость по каждой строке реестра",
              "Единый якорь #prices для всех CTA на сайте",
            ].map((item) => (
              <div key={item} className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4 text-sm leading-6 text-white/82">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="reveal-rise reveal-rise-delay-1 page-frame overflow-hidden rounded-[2rem] border-white/12 bg-[#0d131b]/96">
          <div className="divide-y divide-white/10">
            {pricing.map((item) => (
              <div key={item.service} className="grid gap-3 p-5 md:grid-cols-[1.12fr_190px] md:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.service}</h3>
                  <div className="mt-2 text-sm leading-6 text-white/74">{item.note}</div>
                </div>
                <div className="text-left font-heading text-2xl font-bold text-primary md:text-right">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  const guarantees = [
    {
      title: "Понятный объём работ",
      text: "До начала работ клиент понимает, что именно будет сделано, какие этапы обязательны и от чего зависит итоговая смета.",
    },
    {
      title: "Аккуратность на участке",
      text: "Работы организуются так, чтобы не превращать участок в строительный хаос и не оставлять после себя лишнюю грязь.",
    },
    {
      title: "Фото и объяснение результата",
      text: "После завершения видно, что именно сделано по шахте, швам, дну или водоснабжению, и что теперь требуется по эксплуатации.",
    },
  ];

  const included = [
    "Осмотр состояния шахты и понятное объяснение проблемы",
    "Согласование объёма работ до начала основного этапа",
    "Аккуратная чистка, ремонт или монтаж по задаче объекта",
    "Фотофиксация ключевых этапов и итогового результата",
    "Рекомендации по дальнейшей эксплуатации колодца",
    "Связь после работ по уточняющим вопросам клиента",
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="container grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-5">
          <div className="section-kicker">Гарантия и состав работ</div>
          <h2 className="section-title text-white">Что получает клиент помимо самой услуги</h2>
          <p className="story-copy">
            Доверие растёт, когда заранее видно не только цену, но и правила работы:
            что входит в услугу, как проходит объект и на чём строится гарантия качества.
          </p>
          <div className="rounded-[1.6rem] border border-primary/18 bg-primary/8 p-5 text-sm leading-7 text-white/78">
            Каждая задача начинается с оценки реального состояния колодца. Поэтому гарантия строится
            на правильно подобранном объёме работ, а не на формальных обещаниях без осмотра.
          </div>
        </div>
        <div className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-3">
            {guarantees.map((item) => (
              <div key={item.title} className="glass-panel rounded-[1.6rem] p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="section-kicker">Обычно входит в работу</div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4 text-sm leading-7 text-white/74">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AvitoBrandIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/14 bg-[#0d141b]/85 shadow-[0_18px_45px_rgba(2,8,12,0.36)]",
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute left-[16%] top-[18%] size-4 rounded-full bg-[#97cf26] shadow-[0_0_28px_rgba(151,207,38,0.55)]" />
      <span className="absolute right-[18%] top-[20%] size-3.5 rounded-full bg-[#00aaef] shadow-[0_0_24px_rgba(0,170,239,0.45)]" />
      <span className="absolute left-[22%] bottom-[20%] size-4 rounded-full bg-[#ff6163] shadow-[0_0_24px_rgba(255,97,99,0.4)]" />
      <span className="absolute right-[18%] bottom-[18%] size-5 rounded-full bg-[#8dd6b7] shadow-[0_0_28px_rgba(141,214,183,0.38)]" />
      <div className="relative rounded-full border border-white/10 bg-[#0f1821]/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/94">
        Avito
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Отзывы и Avito"
          title="Отзывы по видам работ и переход к полному профилю"
          description="Финальный блок страницы собран как нижняя точка доверия: отзывы распределены по типам задач, а под ними остаётся прямой переход в официальный профиль WELLS-MO на Авито."
        />
        <div className="space-y-6">
          <div className="reveal-rise reveal-rise-delay-1 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item) =>
              "image" in item && item.image ? (
                <figure key={item.quote} className="page-frame overflow-hidden rounded-[1.8rem] border-white/12 bg-[#0d131b]/96">
                  <div className="image-mask min-h-[280px] border-b border-white/10 bg-[#0f141d]">
                    <img
                      src={item.image}
                      alt={item.alt ?? "Реальный отзыв клиента о чистке и ремонте колодца в Московской области"}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="space-y-3 p-6">
                    {"service" in item && item.service ? (
                      <div className="inline-flex w-fit items-center rounded-full border border-primary/22 bg-primary/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                        {item.service}
                      </div>
                    ) : null}
                    <p className="text-sm leading-7 text-white/78">{item.quote}</p>
                    <div className="text-sm uppercase tracking-[0.18em] text-primary/85">{item.author}</div>
                  </figcaption>
                </figure>
              ) : (
                <blockquote key={item.quote} className="glass-panel rounded-[1.8rem] p-6">
                  {"service" in item && item.service ? (
                    <div className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/22 bg-primary/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.service}
                    </div>
                  ) : null}
                  <p className="text-base leading-8 text-white/82">“{item.quote}”</p>
                  <footer className="mt-6 text-sm uppercase tracking-[0.18em] text-primary/85">
                    {item.author}
                  </footer>
                </blockquote>
              ),
            )}
          </div>
          <a
            href={AVITO_BRAND_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Открыть официальный профиль WELLS-MO на Авито в новой вкладке"
            onClick={() => trackCtaClick("avito_reviews_banner", "home_testimonials")}
            className="group reveal-rise reveal-rise-delay-2 relative block overflow-hidden rounded-[2rem] border border-[#6ee7d2]/26 bg-[linear-gradient(135deg,rgba(18,124,107,0.38),rgba(15,22,30,0.98)_42%,rgba(0,170,239,0.16)_100%)] p-5 shadow-[0_28px_80px_rgba(2,8,12,0.4)] transition duration-300 hover:-translate-y-1 hover:border-[#6ee7d2]/42 sm:p-6 lg:p-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(151,207,38,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(0,170,239,0.16),transparent_32%)]" />
            <div className="relative grid gap-5 sm:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_auto] xl:items-center">
              <AvitoBrandIcon className="size-[4.5rem] rounded-[1.55rem]" />
              <div className="space-y-3">
                <div className="inline-flex w-fit items-center rounded-full border border-white/12 bg-white/7 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/82">
                  Официальный профиль на Авито
                </div>
                <div className="max-w-3xl text-lg font-semibold leading-8 text-white sm:text-[1.35rem] sm:leading-9">
                  Посмотреть честные отзывы на Авито.
                </div>
                <p className="max-w-3xl text-sm leading-7 text-white/76 sm:text-[0.98rem]">
                  Там собраны реальные оценки по чистке, ремонту, герметизации швов и комплексному восстановлению колодцев без рекламной полировки.
                </p>
              </div>
              <div className="flex min-h-16 w-full items-center justify-between gap-4 rounded-[1.35rem] border border-white/12 bg-white/8 px-4 py-4 text-left sm:px-5 xl:min-w-[18rem] xl:w-auto">
                <div>
                  <div className="text-sm font-semibold text-white">Открыть профиль и отзывы</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#6ee7d2]">Новая вкладка / мобильное приложение</div>
                </div>
                <ArrowRight className="size-5 shrink-0 text-[#6ee7d2] transition duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ items = globalFaq }: { items?: readonly { question: string; answer: string }[] }) {
  return (
    <section className="py-12 lg:py-16">
      <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="section-kicker">FAQ</div>
            <h2 className="section-title mt-4 text-white">Вопросы, которые снимают сомнения</h2>
            <p className="story-copy mt-5">
              Ниже собраны ответы на вопросы, которые чаще всего возникают до выезда: по цене,
              порядку работ, срокам и тому, что действительно нужно делать на объекте.
            </p>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <details key={item.question} className="glass-panel group rounded-[1.5rem] p-5">
              <summary className="flex list-none items-center justify-between gap-4 text-left text-lg font-semibold text-white marker:hidden">
                {item.question}
                <ChevronDown className="size-5 text-primary transition group-open:rotate-180" />
              </summary>
              <p className="pt-4 text-sm leading-7 text-white/62">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationHubSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Города и районы"
          title="Выезжаем по всей Московской области"
          description="Работаем по Московской области. В приоритете — Одинцово, Красногорск, Истра, Дмитров, Нахабино, Дедовск, Звенигород, Новая Рига, Рублёвка, Барвиха и Павловская Слобода. Дополнительные направления показываем ниже отдельно."
        />
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="flex items-center gap-3 text-primary">
              <MapPin className="size-5" />
              <div className="section-kicker">Основные направления выезда</div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featuredSeoLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`${location.type === "city" ? "/goroda" : "/rajony"}/${location.slug}`}
                  className="glass-panel card-hover rounded-[1.5rem] p-4"
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-primary/85">
                    {location.type === "city" ? "Город" : "Район"}
                  </div>
                  <div className="mt-3 text-xl font-semibold text-white">{location.name}</div>
                  <p className="mt-3 text-sm leading-6 text-white/62">{location.focus}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="section-kicker">Масштаб покрытия</div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="glass-panel rounded-[1.5rem] p-5">
                <div className="metric-value text-primary">{citySeoLocations.length}</div>
                <h3 className="mt-2 text-lg font-semibold text-white">Города по выезду</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Города, по которым регулярно выезжаем на чистку, ремонт, гидроизоляцию, скобирование и углубление колодцев.
                </p>
              </div>
              <div className="glass-panel rounded-[1.5rem] p-5">
                <div className="metric-value text-primary">{districtSeoLocations.length}</div>
                <h3 className="mt-2 text-lg font-semibold text-white">Районы и округа</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Дополнительные районы и округа, где также принимаем заявки и выезжаем на объекты.
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-white/4 p-5 text-sm leading-7 text-white/68">
              По каждому направлению можно посмотреть услуги, реальные работы и сразу связаться по своему объекту, не тратя время на лишние объяснения.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="pb-18 pt-10 lg:pb-24">
      <div className="container">
        <div className="page-frame overflow-hidden rounded-[2rem] p-8 lg:p-12">
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-5">
              <div className="section-kicker">Следующий шаг</div>
              <h2 className="section-title text-white">
                Нужна чистка, ремонт или <span className="text-gradient-metal">диагностика колодца</span>?
              </h2>
              <p className="story-copy max-w-2xl">
                Опишите задачу, район и текущее состояние объекта. Чем точнее исходные данные,
                тем быстрее можно понять формат работ и сориентировать вас по следующему шагу.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <RequestDialogButton trackingId="final_request" trackingPlacement="final_cta">
                  Задать задачу <ArrowRight className="size-4" />
                </RequestDialogButton>
                <a
                  href={siteMeta.phoneHref}
                  data-cta="final_phone"
                  data-cta-placement="final_cta"
                  onClick={() => trackCtaClick("final_phone", "final_cta")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/88"
                >
                  <Phone className="size-4 text-primary" />
                  {siteMeta.phone}
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Чистка колодцев и промывка шахты",
                "Ремонт швов, гидроизоляция и скобирование",
                "Углубление, донный щит и восстановление шахты",
                "Дополнительные услуги: копка, септики, дренаж и водоснабжение",
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPageBlock({
  eyebrow,
  title,
  description,
  image,
  price,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  price: string;
}) {
  return (
    <section className="pb-12 pt-14 lg:pb-16 lg:pt-20">
      <div className="container grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-end">
        <div className="space-y-5">
          <div className="section-kicker">{eyebrow}</div>
          <h1 className="hero-title text-white">{title}</h1>
          <p className="max-w-2xl text-lg leading-8 text-white/68">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <RequestDialogButton trackingId="page_hero_discuss" trackingPlacement="page_hero">
              Получить консультацию <ArrowRight className="size-4" />
            </RequestDialogButton>
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">
              {price}
            </div>
          </div>
        </div>
        <div className="page-frame overflow-hidden rounded-[2rem] p-3">
          <div className="image-mask min-h-[340px] lg:min-h-[480px]">
            <img
              src={image}
              alt={`${title} в Московской области — WELLS-MO`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceGallerySection({ defaultServiceSlug }: { defaultServiceSlug: string }) {
  const [activeFilter, setActiveFilter] = useState(defaultServiceSlug);

  useEffect(() => {
    setActiveFilter(defaultServiceSlug);
  }, [defaultServiceSlug]);

  const galleryFilters = useMemo(
    () => [{ slug: "all", label: "Все работы" }, ...services.map((item) => ({ slug: item.slug, label: item.shortTitle }))],
    [],
  );

  const serviceTitles = useMemo(
    () =>
      Object.fromEntries(
        services.map((item) => [item.slug, { shortTitle: item.shortTitle, title: item.title }]),
      ) as Record<string, { shortTitle: string; title: string }>,
    [],
  );

  const visibleGalleryItems = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? serviceGalleryItems
        : serviceGalleryItems.filter((item) => item.serviceSlug === activeFilter);

    return [...filtered].sort((left, right) => {
      const leftPriority = Number(left.serviceSlug === defaultServiceSlug);
      const rightPriority = Number(right.serviceSlug === defaultServiceSlug);

      return rightPriority - leftPriority;
    });
  }, [activeFilter, defaultServiceSlug]);

  return (
    <section className="py-12 lg:py-16">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Фотогалерея"
          title="Примеры выполненных работ по всем ключевым услугам"
          description="Реальные объекты помогают быстрее понять объём работ, уровень исполнения и результат по разным задачам на практике."
        />
        <div className="flex flex-wrap gap-3">
          {galleryFilters.map((filter) => {
            const isActive = filter.slug === activeFilter;

            return (
              <button
                key={filter.slug}
                type="button"
                onClick={() => setActiveFilter(filter.slug)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "border-primary/35 bg-primary/12 text-primary shadow-[0_10px_30px_rgba(193,145,71,0.18)]"
                    : "border-white/10 bg-white/4 text-white/74 hover:border-white/20 hover:bg-white/7 hover:text-white",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visibleGalleryItems.map((item) => {
            const serviceInfo = serviceTitles[item.serviceSlug];

            return (
              <article key={item.id} className="page-frame card-hover overflow-hidden rounded-[1.8rem]">
                <div className="image-mask min-h-[220px] border-b border-white/8">
                  <img
                  src={item.image}
                  alt={`${item.title} — ${serviceInfo?.title ?? "услуги WELLS-MO"} в Московской области`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-white/45">
                    <span>{serviceInfo?.shortTitle ?? "Услуга"}</span>
                    <span>{item.location}</span>
                  </div>
                  <div className="text-xl font-semibold leading-tight text-white">{item.title}</div>
                  <p className="text-sm leading-7 text-white/62">{item.result}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-7 text-white/54">
            Выше собраны работы, максимально близкие к текущей услуге. При необходимости можно сразу перейти к другим типам задач.
          </p>
          <SecondaryLink href="/nashi-raboty">Открыть страницу работ</SecondaryLink>
        </div>
      </div>
    </section>
  );
}

function ServiceContent({ slug }: { slug: string }) {
  const service = useMemo(() => services.find((item) => item.slug === slug), [slug]);
  const isDeepeningPage = slug === "uglublenie-kolodcev";
  const serviceSeoTitle = service
    ? isDeepeningPage
      ? `Углубление колодцев в Московской области | ${siteMeta.name}`
      : `${service.title} — ${siteMeta.region} | ${siteMeta.name}`
    : `Страница не найдена | ${siteMeta.name}`;
  const serviceSeoDescription = service
    ? isDeepeningPage
      ? "Углубление пересохших колодцев по Московской области: оценка шахты, откачка воды, работа на глубине, усиление колец, ремонт швов и восстановление притока воды."
      : `${service.title} по ${siteMeta.region.toLowerCase()}. ${service.intro}`
    : "Нужная страница услуги не найдена.";
  const serviceHeroTitle = service ? (isDeepeningPage ? "Углубление колодцев в Московской области" : service.title) : "";
  const serviceHeroDescription = service
    ? isDeepeningPage
      ? "Углубление пересохших колодцев по Московской области: сначала оцениваем состояние шахты, проверяем кольца и швы, а затем предлагаем безопасное решение по глубине, грунту и реальной конструкции колодца."
      : service.description
    : "";

  usePageSeo(serviceSeoTitle, serviceSeoDescription);

  if (!service) {
    return (
      <SiteLayout>
        <section className="container py-28">
          <div className="page-frame rounded-[2rem] p-10">
            <h1 className="text-4xl font-bold text-white">Страница не найдена</h1>
            <p className="mt-4 text-white/65">Похоже, нужная услуга сейчас недоступна. Вернитесь к основным услугам или свяжитесь с нами напрямую.</p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const related = services.filter((item) => item.slug !== slug).slice(0, 3);
  const priorityPagesForService = priorityServiceCities
    .map((city) => ({ city, page: findPriorityServiceCityPage(city.slug, slug) }))
    .filter((item): item is { city: LocalSeoLocation; page: PriorityServiceCityPage } => Boolean(item.page));

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow={service.eyebrow}
        title={serviceHeroTitle}
        description={serviceHeroDescription}
        image={service.image}
        price={service.price}
      />

      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div className="space-y-8">
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Когда нужна услуга</div>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{service.intro}</h2>
              <p className="story-copy mt-5">{service.description}</p>
            </div>
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Что входит</div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {service.includes.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4 text-sm leading-7 text-white/74">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="page-frame rounded-[2rem] p-6 lg:sticky lg:top-24 lg:p-8">
            <div className="section-kicker">Ключевые акценты</div>
            <div className="mt-6 space-y-4">
              {service.highlights.map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-primary/16 bg-primary/8 p-4 text-sm leading-7 text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container space-y-10">
            <SectionHeading
              eyebrow="Этапы"
              title="Как проходит услуга от осмотра до результата"
              description="Реальная последовательность работ помогает заранее понять, как проходит объект, что делается на каждом этапе и откуда формируется итоговый результат."
            />
          <div className="grid gap-5 lg:grid-cols-4">
            {service.steps.map((step, index) => (
              <div key={step.title} className="glass-panel rounded-[1.8rem] p-6">
                <div className="metric-value text-primary">0{index + 1}</div>
                <div className="mt-4 text-xl font-semibold text-white">{step.title}</div>
                <p className="mt-3 text-sm leading-7 text-white/62">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceGallerySection defaultServiceSlug={service.slug} />

      <FaqSection items={service.faq} />

      <section className="py-12 lg:py-16">
        <div className="container space-y-10">
            <SectionHeading
              eyebrow="Города выезда"
              title={`${service.title} по основным направлениям Подмосковья`}
              description="Выезжаем по основным направлениям Подмосковья и берём в работу объекты с разным состоянием шахты, воды и инженерной части."
            />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {priorityPagesForService.map(({ city, page }) => (
              <Link key={page.path} href={page.path} className="glass-panel card-hover rounded-[1.8rem] p-6">
                <div className="section-kicker">{city.officialName}</div>
                <div className="mt-4 text-2xl font-semibold text-white">{page.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{page.focus}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Открыть страницу по городу <ArrowRight className="size-4" />
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container space-y-10">
          <SectionHeading
            eyebrow="Комплексный подход"
            title="Если по объекту нужна не одна работа, решаем вопрос целиком"
            description="После осмотра нередко становится понятно, что объекту требуется не один этап. Поэтому ниже собраны услуги, которые чаще всего дополняют друг друга на одном выезде."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={getServiceHref(item.slug)} className="glass-panel card-hover rounded-[1.8rem] p-6">
                <div className="section-kicker">{item.eyebrow}</div>
                <div className="mt-4 text-2xl font-semibold text-white">{item.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{item.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Подробнее об услуге <ArrowRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </SiteLayout>
  );
}

const supplementalServicePages = {
  "bottom-filter": {
    seoTitle: `Донный фильтр для колодца — ${siteMeta.region} | ${siteMeta.name}`,
    seoDescription:
      "Донный фильтр для колодца в Московской области: восстановление нижней части шахты, подбор лиственницы, гальки или щебня и аккуратная сборка после осмотра состояния дна.",
    eyebrow: "Восстановление нижней части шахты",
    title: "Донный фильтр для колодца",
    description:
      "Если дно заилилось, фильтрующий слой разрушен или нижняя зона колодца требует восстановления, помогаем собрать донный фильтр под состояние конкретной шахты, а не по шаблону.",
    image: assets.userBottomShield,
    price: "от 5 000 ₽",
    intro:
      "Донный фильтр нужен, когда нижняя часть колодца потеряла рабочую структуру и источник требует аккуратного восстановления после осмотра.",
    body:
      "На таких объектах важно сначала посмотреть, что происходит на дне: есть ли песок, размыв, просадка, старый щит или разрушенный фильтрующий слой. После этого подбираем решение — лиственница, галька, щебень или комбинированная сборка — и объясняем, почему именно оно подходит этому колодцу.",
    includes: [
      "Осмотр нижней части шахты и состояния дна",
      "Подбор материала фильтра под конкретный объект",
      "Подготовка основания перед монтажом",
      "Сборка фильтрующего слоя и рекомендации по эксплуатации",
    ],
    highlights: [
      "Работаем после диагностики, а не по универсальной схеме",
      "Учитываем состав дна, песок, глину и разрушение старого слоя",
      "Можно совместить с чисткой, дезинфекцией и локальным ремонтом",
      "Объясняем, когда донный фильтр действительно нужен, а когда нет",
    ],
    steps: [
      {
        title: "Осмотр основания",
        text: "Смотрим нижнюю часть шахты, оцениваем размыв, заиливание, остатки старого щита и реальную геометрию дна.",
      },
      {
        title: "Подбор решения",
        text: "Определяем, нужен ли щит, галька, щебень или комбинированный вариант, чтобы не ставить лишние материалы.",
      },
      {
        title: "Монтаж фильтра",
        text: "Подготавливаем основание и собираем донный фильтр аккуратно, с учётом состояния шахты и глубины.",
      },
      {
        title: "Финальная проверка",
        text: "Показываем результат, объясняем дальнейшую эксплуатацию и подсказываем, нужны ли дополнительные работы по шахте.",
      },
    ],
    faq: [
      {
        question: "Когда нужен донный фильтр, а когда достаточно чистки?",
        answer:
          "Если проблема только в загрязнении ила и налёта, часто хватает чистки. Если нижний фильтрующий слой разрушен, дно размыто или основание уже не держит структуру, нужен донный фильтр или восстановление нижней части шахты.",
      },
      {
        question: "Из чего собирается донный фильтр?",
        answer:
          "В зависимости от состояния колодца используем лиственницу, речную гальку, щебень или комбинируем материалы. Решение принимается после осмотра, а не заранее по телефону.",
      },
      {
        question: "Можно ли сделать донный фильтр в один выезд с чисткой?",
        answer:
          "Во многих случаях да. Если объект позволяет, совмещаем чистку, дезинфекцию, восстановление дна и другие необходимые этапы в одном рабочем выезде.",
      },
    ],
  },
  disinfection: {
    seoTitle: `Дезинфекция колодца — ${siteMeta.region} | ${siteMeta.name}`,
    seoDescription:
      "Дезинфекция колодца в Московской области после чистки, застоя воды или загрязнений. Помогаем вернуть колодец в рабочее состояние и объясняем, когда нужна именно дезинфекция, а не только откачка.",
    eyebrow: "Санитарная обработка после работ",
    title: "Дезинфекция колодца",
    description:
      "Когда вода получила запах, колодец долго стоял без обслуживания или после чистки нужна финальная санитарная обработка, выполняем дезинфекцию как часть реального восстановления источника.",
    image: assets.userAfterWashing,
    price: "от 14 000 ₽ в составе работ",
    intro:
      "Дезинфекция нужна не как формальность, а как этап после чистки, загрязнений, застоя воды или обслуживания колодца по фактическому состоянию объекта.",
    body:
      "Одна только откачка воды не решает вопрос с налётом, запахом и накопившимися загрязнениями. Поэтому сначала приводим шахту в порядок, оцениваем состояние воды, стенок и дна, а затем выполняем дезинфекцию и объясняем, что важно контролировать после завершения работ.",
    includes: [
      "Осмотр воды, стенок и нижней части шахты",
      "Подготовка колодца после чистки или перед санитарной обработкой",
      "Дезинфекция по фактическому состоянию объекта",
      "Рекомендации по дальнейшей эксплуатации и повторной проверке воды",
    ],
    highlights: [
      "Дезинфекцию не отделяем от реального состояния шахты",
      "Часто выполняем в комплексе с чисткой и восстановлением дна",
      "Объясняем, когда проблема в загрязнении, а когда — в конструкции",
      "Подходим аккуратно к колодцам после простоя и сезонных загрязнений",
    ],
    steps: [
      {
        title: "Диагностика воды",
        text: "Понимаем, что именно беспокоит владельца: запах, мутность, застой воды или последствия долгого простоя без обслуживания.",
      },
      {
        title: "Подготовка колодца",
        text: "При необходимости выполняем чистку, откачку и удаление загрязнений, чтобы дезинфекция имела смысл и не была поверхностной мерой.",
      },
      {
        title: "Санитарная обработка",
        text: "Проводим дезинфекцию как финальный этап восстановления источника и контролируем состояние основных зон шахты.",
      },
      {
        title: "Рекомендации",
        text: "Подсказываем, когда можно возвращаться к обычной эксплуатации и какие признаки важно отслеживать после обработки.",
      },
    ],
    faq: [
      {
        question: "Можно ли сделать только дезинфекцию без чистки?",
        answer:
          "Иногда да, но если в шахте есть ил, налёт, осадок и загрязнения, одной дезинфекции недостаточно. Сначала нужно привести объект в рабочее состояние.",
      },
      {
        question: "Когда особенно часто нужна дезинфекция?",
        answer:
          "После долгого простоя, при запахе, помутнении воды, сезонных загрязнениях и как финальный этап после комплексной чистки колодца.",
      },
      {
        question: "Нужен ли осмотр перед работой?",
        answer:
          "Да. Даже для дезинфекции важно понять состояние шахты, воды, дна и швов, чтобы не пропустить проблему, которую одна санитарная обработка не решит.",
      },
    ],
  },
} as const;

type SupplementalServiceKey = keyof typeof supplementalServicePages;

function SupplementalServicePage({ slug }: { slug: SupplementalServiceKey }) {
  const page = supplementalServicePages[slug];
  const related = services.filter((item) => ["chistka-kolodcev", "remont-kolodcev", "gidroizolyaciya-shvov"].includes(item.slug));

  usePageSeo(page.seoTitle, page.seoDescription);

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        image={page.image}
        price={page.price}
      />

      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div className="space-y-8">
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Когда нужна услуга</div>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{page.intro}</h2>
              <p className="story-copy mt-5">{page.body}</p>
            </div>
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Что входит</div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {page.includes.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4 text-sm leading-7 text-white/74">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="page-frame rounded-[2rem] p-6 lg:sticky lg:top-24 lg:p-8">
            <div className="section-kicker">Ключевые акценты</div>
            <div className="mt-6 space-y-4">
              {page.highlights.map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-primary/16 bg-primary/8 p-4 text-sm leading-7 text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container space-y-10">
          <SectionHeading
            eyebrow="Этапы"
            title="Как проходит работа от осмотра до результата"
            description="Показываем понятную логику действий по объекту, чтобы было ясно, где начинается диагностика и из чего складывается итоговый результат по колодцу."
          />
          <div className="grid gap-5 lg:grid-cols-4">
            {page.steps.map((step, index) => (
              <div key={step.title} className="glass-panel rounded-[1.8rem] p-6">
                <div className="metric-value text-primary">0{index + 1}</div>
                <div className="mt-4 text-xl font-semibold text-white">{step.title}</div>
                <p className="mt-3 text-sm leading-7 text-white/62">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={page.faq} />

      <section className="py-12 lg:py-16">
        <div className="container space-y-10">
          <SectionHeading
            eyebrow="Комплексный подход"
            title="Что ещё часто делают вместе с этой услугой"
            description="На реальном объекте дезинфекция, донный фильтр, чистка и ремонт нередко связаны между собой, поэтому ниже собраны страницы, которые чаще всего дополняют друг друга."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={getServiceHref(item.slug)} className="glass-panel card-hover rounded-[1.8rem] p-6">
                <div className="section-kicker">{item.eyebrow}</div>
                <div className="mt-4 text-2xl font-semibold text-white">{item.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{item.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Подробнее об услуге <ArrowRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </SiteLayout>
  );
}

export function HomePage() {
  usePageSeo(
    "Чистка и ремонт колодцев в Московской области | WELLS-MO",
    "Профессиональная чистка и ремонт колодцев по Московской области: откачка воды, мойка шахты до 400 бар, чистка дна, герметизация швов, скобирование колец, дезинфекция и восстановление старых шахт.",
  );

  return (
    <SiteLayout>
      <HomeHero />
      <PricingSection />
      <CasesSection />
      <ServicesPreview />
      <ProcessSection />
      <TestimonialsSection />
    </SiteLayout>
  );
}

export function ServicesPage() {
  usePageSeo(
    `Чистка и ремонт колодцев и дополнительные услуги — ${siteMeta.region} | ${siteMeta.name}`,
    "Основные услуги по колодцам в Московской области: чистка, ремонт, гидроизоляция швов, скобирование и углубление. Дополнительно выполняем копку колодцев, септики из ЖБ колец, дренажные колодцы и подводку воды в дом.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Основные услуги"
        title="Чистка и ремонт колодцев и дополнительные работы"
        description="Главные направления сайта — чистка и ремонт колодцев. Отдельно раскрываем гидроизоляцию швов, скобирование, углубление, донный щит и гравий. Дополнительно показываем копку колодцев, септики из ЖБ колец, дренажные колодцы и водоснабжение из колодца в дом."
        image={assets.fieldCrew}
        price="8 направлений работ"
      />
      <ServicesPreview />
      <ProcessSection />
      <CtaSection />
    </SiteLayout>
  );
}

export function PricingPage() {
  usePageSeo(
    `Цены на чистку и ремонт колодцев — ${siteMeta.region} | ${siteMeta.name}`,
    "Цены на чистку и ремонт колодцев в Московской области: стартовые ориентиры по чистке, герметизации швов, скобированию, донному фильтру и дополнительным работам с пояснением, от чего зависит итоговая смета.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Цены и условия"
        title="Цены на чистку и ремонт колодцев"
        description="На странице собраны стартовые цены по основным работам. Точная смета зависит от глубины шахты, состояния швов, дна, объёма загрязнений, материалов и дополнительных операций после осмотра объекта."
        image={assets.repair}
        price="Стартовые ориентиры"
      />
      <PricingSection />
      <GuaranteeSection />
      <FaqSection />
      <CtaSection />
    </SiteLayout>
  );
}

export function WorksPage() {
  usePageSeo(
    `Наши работы по чистке и ремонту колодцев — ${siteMeta.region} | ${siteMeta.name}`,
    "Реальные кейсы по чистке, ремонту, гидроизоляции, скобированию и углублению колодцев по Московской области. Фото процессов, результаты работ и понятная подача по объектам.",
  );

  return (
    <SiteLayout>
        <HeroPageBlock
          eyebrow="Портфолио"
          title="Наши работы"
          description="Кейсы и реальные фотографии усиливают доверие лучше любых общих обещаний. Здесь видно задачу, процесс и результат по настоящим объектам."
          image={assets.cleaning}
          price="Реальные объекты"
        />
      <CasesSection />
      <TestimonialsSection />
      <CtaSection />
    </SiteLayout>
  );
}

export function ContactsPage() {
  usePageSeo(
    `Контакты для чистки и ремонта колодцев — ${siteMeta.region} | ${siteMeta.name}`,
    "Контакты для чистки и ремонта колодцев в Московской области: телефон, Telegram, MAX и форма заявки. Можно сразу прислать фото или видео колодца, чтобы быстрее получить предварительный разбор ситуации.",
  );

  const [formData, setFormData] = useState<ContactFormState>(initialContactFormState);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const resetSubmitState = () => {
    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
  };

  const handleFieldChange =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;

      setFormData((current) => ({
        ...current,
        [field]: value,
      }));

      resetSubmitState();
    };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextPhoneValue = formatRussianPhone(event.target.value);

    setFormData((current) => ({
      ...current,
      phone: nextPhoneValue,
    }));

    resetSubmitState();
  };

  const handlePhoneFocus = () => {
    setFormData((current) => {
      if (current.phone.trim()) {
        return current;
      }

      return {
        ...current,
        phone: PHONE_MASK_FOCUS_PREFIX,
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "loading") {
      return;
    }

    const normalizedPhoneDigits = normalizeRussianPhoneDigits(formData.phone);

    const normalizedData = {
      name: formData.name.trim(),
      phone: formatRussianPhone(formData.phone),
      location: formData.location.trim(),
      message: formData.message.trim(),
      botcheck: formData.botcheck.trim(),
    };

    if (!normalizedData.name || !normalizedData.phone || !normalizedData.location || !normalizedData.message) {
      setSubmitState("error");
      setSubmitMessage("Пожалуйста, заполните имя, телефон, район и описание задачи перед отправкой заявки.");
      return;
    }

    if (normalizedPhoneDigits.length < 11) {
      setSubmitState("error");
      setSubmitMessage("Укажите полный номер телефона в формате +7 (999) 123-45-67.");
      return;
    }

    setSubmitState("loading");
    setSubmitMessage("Отправляем заявку. Обычно это занимает несколько секунд.");
    trackCtaClick("contact_form_submit", "contacts_form");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Новая заявка с ${siteMeta.name}`,
          from_name: siteMeta.name,
          name: normalizedData.name,
          phone: normalizedData.phone,
          location: normalizedData.location,
          message: normalizedData.message,
          page: "Контакты",
          site: "wells-mo.ru",
          recipient: siteMeta.email,
          botcheck: normalizedData.botcheck,
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Сервис отправки не подтвердил приём заявки.");
      }

      setFormData(initialContactFormState);
      trackCtaClick("contact_form_success", "contacts_form");
      setSubmitState("success");
      setSubmitMessage("Заявка отправлена. Мы получили обращение и свяжемся с вами после просмотра информации по объекту.");
    } catch (error) {
      console.error("Ошибка отправки заявки", error);
      setSubmitState("error");
      setSubmitMessage("Не удалось отправить заявку автоматически. Пожалуйста, позвоните по номеру телефона на странице или напишите на info@wells-mo.ru.");
    }
  };

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Связь и заявка"
        title="Контакты для чистки и ремонта колодцев"
        description="Позвоните, напишите в Telegram или MAX либо оставьте заявку. Если есть фото или видео колодца, сразу пришлите их вместе с адресом и описанием проблемы — так проще дать предварительную оценку и понять порядок работ."
        image={assets.fieldCrew}
        price={siteMeta.coverage}
      />
      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="section-kicker">Как связаться</div>
            <div className="mt-5 space-y-5 text-white/72">
              <a
                href={siteMeta.phoneHref}
                data-cta="contacts_phone"
                data-cta-placement="contacts_page"
                onClick={() => trackCtaClick("contacts_phone", "contacts_page")}
                className="block text-2xl font-semibold text-white"
              >
                {siteMeta.phone}
              </a>
              <a href={`mailto:${siteMeta.email}`} className="block text-base transition hover:text-white">
                {siteMeta.email}
              </a>
              <p className="story-copy">
                Базируемся в {siteMeta.baseLocation}. Сообщите район, задачу и текущее состояние
                колодца, чтобы быстрее понять формат работ и сориентировать вас по выезду.
              </p>
              <div className="rounded-[1.4rem] border border-primary/18 bg-primary/8 p-4 text-sm leading-7 text-white/78">
                Для предварительной оценки удобно сразу отправить фото или короткое видео шахты, воды, швов и нижней части колодца. Это не заменяет осмотр, но помогает быстрее понять, идёт ли речь о чистке, ремонте, донном фильтре или комплексной заявке.
              </div>
            </div>
            <div className="mt-8 grid gap-4">
              {[
                {
                  label: "Мутная вода, запах или длительный простой",
                  presetIssue: "Вода мутная",
                  presetService: "Чистка колодца",
                  presetDetails: "Вода мутная, появился запах или колодец долго стоял без обслуживания.",
                },
                {
                  label: "Течь через швы, смещение колец или деформация шахты",
                  presetIssue: "Течь по швам",
                  presetService: "Ремонт швов",
                  presetDetails: "Есть течь через швы, смещение колец или нужна герметизация шахты.",
                },
                {
                  label: "Нужно провести воду в дом из существующего колодца",
                  presetIssue: "Нужно провести воду в дом",
                  presetService: "Водоснабжение из колодца в дом",
                  presetDetails: "Нужно обсудить подачу воды в дом из существующего колодца.",
                },
              ].map((item) => (
                <RequestDialogButton
                  key={item.label}
                  variant="secondary"
                  trackingId="contacts_issue_card"
                  trackingPlacement="contacts_quick_issue"
                  presetIssue={item.presetIssue}
                  presetService={item.presetService}
                  presetDetails={item.presetDetails}
                  className="w-full justify-between rounded-[1.4rem] border border-white/8 bg-white/4 p-4 text-left text-sm leading-7 text-white/74"
                >
                  <span className="text-left">{item.label}</span>
                  <ArrowRight className="size-4 shrink-0 text-primary" />
                </RequestDialogButton>
              ))}
            </div>
          </div>
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="section-kicker">Форма заявки</div>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={formData.botcheck}
                onChange={handleFieldChange("botcheck")}
              />
              <input
                name="name"
                autoComplete="name"
                required
                disabled={submitState === "loading"}
                value={formData.name}
                onChange={handleFieldChange("name")}
                className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Ваше имя"
              />
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                disabled={submitState === "loading"}
                value={formData.phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="+7 (___) ___-__-__"
              />
              <input
                name="location"
                autoComplete="address-level2"
                required
                disabled={submitState === "loading"}
                value={formData.location}
                onChange={handleFieldChange("location")}
                className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Район или населённый пункт"
              />
              <textarea
                name="message"
                required
                disabled={submitState === "loading"}
                value={formData.message}
                onChange={handleFieldChange("message")}
                className="min-h-36 rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-base text-white placeholder:text-white/34 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Кратко опишите задачу"
              />
              {submitState !== "idle" ? (
                <div
                  className={cn(
                    "rounded-[1.4rem] border px-4 py-3 text-sm leading-7",
                    submitState === "success" && "border-emerald-400/30 bg-emerald-500/10 text-emerald-50",
                    submitState === "error" && "border-rose-400/30 bg-rose-500/10 text-rose-50",
                    submitState === "loading" && "border-white/10 bg-white/5 text-white/78",
                  )}
                >
                  {submitMessage}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={submitState === "loading"}
                data-cta="contact_form_submit"
                data-cta-placement="contacts_form"
                data-metrika-goal={getPrimaryMetrikaGoal("contact_form_submit")}
                aria-label="Следующий шаг — отправить заявку"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {submitState === "loading" ? "Отправляем заявку..." : "Отправить заявку"}
                <ArrowRight className="size-4" />
              </button>
              <p className="text-sm leading-7 text-white/45">
                Для быстрого контакта можно сразу{" "}                <a
                  href={siteMeta.phoneHref}
                  data-cta="contacts_inline_phone"
                  data-cta-placement="contacts_form"
                  onClick={() => trackCtaClick("contacts_inline_phone", "contacts_form")}
                  className="text-white transition hover:text-primary"
                >
                  позвонить по номеру {siteMeta.phone}
                </a>
{" "}
                или{" "}
                <a href={`mailto:${siteMeta.email}`} className="text-white transition hover:text-primary">
                  написать на {siteMeta.email}
                </a>
                . Работаем по всей Московской области.
              </p>
            </form>
          </div>
        </div>
      </section>
      <FaqSection />
    </SiteLayout>
  );
}

export function AboutPage() {
  usePageSeo(
    `О компании и подходе к работам — ${siteMeta.region} | ${siteMeta.name}`,
    "Подход к чистке, ремонту, гидроизоляции, скобированию и углублению колодцев по всей Московской области. Дополнительные направления — копка, септики и водоснабжение из колодца в дом.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="О подходе"
        title="О компании"
        description="Здесь кратко объяснён подход к работе: сначала осмотр, затем понятное решение и после этого — аккуратное выполнение задачи без лишних услуг."
        image={assets.hero}
        price="Спокойный профессиональный тон"
      />
      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 xl:grid-cols-[1fr_1fr]">
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="section-kicker">Позиционирование</div>
            <h2 className="mt-4 text-4xl font-bold text-white">Профильная команда без лишнего пафоса</h2>
            <p className="story-copy mt-5">
              Вместо лозунгов мы показываем нормальный рабочий процесс: как оцениваем объект,
              почему не предлагаем ненужные операции и как связываем состояние шахты с
              дальнейшим бытовым результатом для клиента.
            </p>
          </div>
          <div className="grid gap-5">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="glass-panel rounded-[1.7rem] p-6">
                <div className="text-xl font-semibold text-white">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </SiteLayout>
  );
}

export function FAQPage() {
  usePageSeo(
    `Частые вопросы по чистке и ремонту колодцев — ${siteMeta.region} | ${siteMeta.name}`,
    "Ответы на частые вопросы о чистке, ремонте, гидроизоляции, скобировании и углублении колодцев по всей Московской области. Дополнительно разобраны копка, септики и водоснабжение из колодца в дом.",
  );

  return (
    <SiteLayout>
        <HeroPageBlock
          eyebrow="Ответы заранее"
          title="Частые вопросы"
          description="FAQ помогает снять тревогу заранее, понять порядок работ и быстрее принять спокойное решение без давления и недосказанности."
          image={assets.repair}
          price="Вопросы и ответы"
        />
      <FaqSection />
      <CtaSection />
    </SiteLayout>
  );
}

export function CleaningPage() {
  return <ServiceContent slug="chistka-kolodcev" />;
}

export function RepairPage() {
  return <ServiceContent slug="remont-kolodcev" />;
}

export function DeepeningPage() {
  return <ServiceContent slug="uglublenie-kolodcev" />;
}

export function WaterSupplyPage() {
  return <ServiceContent slug="vodosnabzhenie-iz-kolodca-v-dom" />;
}

export function WaterproofingPage() {
  return <ServiceContent slug="gidroizolyaciya-shvov" />;
}

export function BottomFilterPage() {
  return <SupplementalServicePage slug="bottom-filter" />;
}

export function DisinfectionPage() {
  return <SupplementalServicePage slug="disinfection" />;
}

export function WellBracingPage() {
  return <ServiceContent slug="skobirovanie-kolodca" />;
}

export function DrainageWellPage() {
  return <ServiceContent slug="drenazhnyy-kolodec" />;
}

export function WellDiggingPage() {
  return <ServiceContent slug="kopka-kolodcev" />;
}

export function SepticPage() {
  return <ServiceContent slug="septik-iz-zhbi-kolec" />;
}

function LocalSeoPageContent({ location }: { location: LocalSeoLocation | undefined }) {
  usePageSeo(
    location
      ? `Чистка и ремонт колодцев — ${location.name} | ${siteMeta.name}`
      : `Локальная страница не найдена | ${siteMeta.name}`,
    location
      ? `Чистка и ремонт колодцев, гидроизоляция швов, скобирование и углубление — ${location.name}, Московская область. Дополнительно выполняем копку колодцев, септики из ЖБ колец и водоснабжение из колодца в дом.`
      : "Локальная страница не найдена.",
  );

  if (!location) {
    return (
      <SiteLayout>
        <section className="container py-28">
          <div className="page-frame rounded-[2rem] p-10">
            <h1 className="text-4xl font-bold text-white">Локация не найдена</h1>
            <p className="mt-4 text-white/65">
              Нужная услуга по этому направлению сейчас недоступна. Выберите другое направление или свяжитесь с нами напрямую, чтобы обсудить объект.
            </p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const targetHref = location.type === "city" ? "/goroda" : "/rajony";
  const siblingLocations = (location.type === "city" ? citySeoLocations : districtSeoLocations)
    .filter((item) => item.slug !== location.slug)
    .slice(0, 6);
  const priorityPagesForCity = services
    .map((service) => ({ service, page: findPriorityServiceCityPage(location.slug, service.slug) }))
    .filter((item): item is { service: (typeof services)[number]; page: PriorityServiceCityPage } => Boolean(item.page));

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow={location.type === "city" ? "Город" : "Район"}
        title={`Чистка и ремонт колодцев — ${location.name}`}
        description={`Работаем по направлению ${location.name} и выезжаем на объекты по чистке, ремонту, гидроизоляции швов, скобированию колец и углублению колодцев. Дополнительно берём копку колодцев, септики из ЖБ колец, дренажные колодцы и водоснабжение из колодца в дом.`}
        image={location.asset}
        price={location.officialName}
      />

      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Работа по направлению</div>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Работаем по объектам в {location.name} и рядом
              </h2>
              <p className="story-copy mt-5">
                Ниже собраны основные услуги по вашему направлению, чтобы можно было сразу понять формат работ и быстро обсудить объект по телефону или через заявку.
              </p>
            </div>
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Что можно заказать</div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {services.map((service) => {
                  const priorityPage = findPriorityServiceCityPage(location.slug, service.slug);

                  return (
                      <Link
                        key={service.slug}
                        href={priorityPage?.path ?? getServiceHref(service.slug)}
                        className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4 transition hover:border-primary/25 hover:bg-white/6"
                      >

                      <div className="text-lg font-semibold text-white">{service.title}</div>
                      <p className="mt-2 text-sm leading-7 text-white/62">
                        {service.shortTitle} — {location.name}. {service.price}
                      </p>
                      {priorityPage ? (
                        <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/85">
                          Страница по услуге <ArrowRight className="size-3.5" />
                        </div>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">По вашему направлению</div>
              <p className="story-copy mt-5">{location.focus}</p>
              <div className="mt-6 rounded-[1.5rem] border border-primary/18 bg-primary/8 p-4 text-sm leading-7 text-white/78">
                Основные запросы: чистка колодцев {location.name}, ремонт колодцев {location.name},
                гидроизоляция швов {location.name}, углубление колодцев {location.name}.
              </div>
            </div>
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Соседние направления</div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {siblingLocations.map((item) => (
                  <Link
                    key={item.slug}
                    href={`${targetHref}/${item.slug}`}
                    className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/70 transition hover:border-primary/25 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            {priorityPagesForCity.length ? (
              <div className="page-frame rounded-[2rem] p-6 lg:p-8">
                <div className="section-kicker">Частые задачи по этому направлению</div>
                <div className="mt-5 grid gap-3">
                  {priorityPagesForCity.map(({ service, page }) => (
                    <Link
                      key={page.path}
                      href={page.path}
                      className="rounded-[1.2rem] border border-primary/18 bg-primary/8 px-4 py-4 text-sm leading-7 text-white/78 transition hover:border-primary/35 hover:bg-primary/12"
                    >
                      <div className="font-semibold text-white">{page.title}</div>
                      <div className="mt-1 text-white/62">{page.focus}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="section-kicker">Что важно по этому направлению</div>
            <h2 className="section-title mt-4 text-white">Услуги, реальные задачи и быстрый контакт по вашему объекту</h2>
            <p className="story-copy mt-5">
              Ниже собраны основные услуги, типовые задачи и быстрый способ связаться по объекту, чтобы без лишней теории перейти к сути работ.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              `Услуги по ${location.name} без лишней теории`,
              `Быстрый контакт и понятный состав работ`,
              `Соседние города и районы Московской области`,
            ].map((item) => (
              <div key={item} className="glass-panel rounded-[1.7rem] p-5 text-sm leading-7 text-white/72">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
      <CtaSection />
    </SiteLayout>
  );
}

function LocalServiceCityPageContent({
  citySlug,
  serviceSlug,
}: {
  citySlug: string;
  serviceSlug: string;
}) {
  const city = citySeoLocations.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.slug === serviceSlug);
  const page = findPriorityServiceCityPage(citySlug, serviceSlug);

  usePageSeo(
    page ? page.seoTitle : `Страница услуги по городу не найдена | ${siteMeta.name}`,
    page ? page.seoDescription : "Нужное направление услуги сейчас недоступно.",
  );

  if (!city || !service || !page) {
    return (
      <SiteLayout>
        <section className="container py-28">
          <div className="page-frame rounded-[2rem] p-10">
            <h1 className="text-4xl font-bold text-white">Страница не найдена</h1>
            <p className="mt-4 text-white/65">
              Нужное направление услуги по этому городу сейчас недоступно. Вернитесь к основным услугам или свяжитесь с нами напрямую.
            </p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const siblingPages = priorityServiceCityPages
    .filter((item) => item.serviceSlug === serviceSlug && item.citySlug !== citySlug)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      city: citySeoLocations.find((location) => location.slug === item.citySlug),
    }))
    .filter((item): item is PriorityServiceCityPage & { city: LocalSeoLocation } => Boolean(item.city));

  const relatedPagesInCity = services
    .filter((item) => item.slug !== serviceSlug)
    .map((item) => ({ service: item, page: findPriorityServiceCityPage(citySlug, item.slug) }))
    .filter((item): item is { service: (typeof services)[number]; page: PriorityServiceCityPage } => Boolean(item.page));

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Город и услуга"
        title={page.title}
        description={page.lead}
        image={service.image}
        price={page.badge}
      />

      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-8">
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">По конкретной услуге</div>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{service.title} в {city.name} с акцентом на реальную задачу клиента</h2>
              <p className="story-copy mt-5">{page.description}</p>
              <p className="story-copy mt-5">{page.focus}</p>
            </div>
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Что входит в услугу</div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {service.includes.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4 text-sm leading-7 text-white/74">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Работа по городу</div>
              <div className="mt-4 text-2xl font-semibold text-white">{city.officialName}</div>
              <p className="story-copy mt-5">
                Здесь можно сразу увидеть услугу именно по {city.name}: без общих формулировок,
                с понятным описанием работ и быстрым переходом к заявке по вашему объекту.
              </p>
            </div>
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Соседние города по услуге</div>
              <div className="mt-5 grid gap-3">
                {siblingPages.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-4 text-sm leading-7 text-white/74 transition hover:border-primary/25 hover:text-white"
                  >
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-white/62">{item.city.officialName}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="section-kicker">Другие услуги по городу</div>
            <h2 className="section-title mt-4 text-white">Другие услуги в {city.name}</h2>
            <p className="story-copy mt-5">
              Если по объекту нужна не одна работа, здесь можно сразу посмотреть дополняющие услуги и обсудить полный объём работ без повторных объяснений.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedPagesInCity.map(({ service: relatedService, page: relatedPage }) => (
              <Link key={relatedPage.path} href={relatedPage.path} className="glass-panel card-hover rounded-[1.7rem] p-5">
                <div className="section-kicker">{city.name}</div>
                <div className="mt-3 text-xl font-semibold text-white">{relatedService.title}</div>
                <p className="mt-3 text-sm leading-7 text-white/62">{relatedPage.focus}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={service.faq} />
      <CtaSection />
    </SiteLayout>
  );
}

export function LocalCityServicePage({ citySlug, serviceSlug }: { citySlug: string; serviceSlug: string }) {
  return <LocalServiceCityPageContent citySlug={citySlug} serviceSlug={serviceSlug} />;
}

export function LocalCityPage({ slug }: { slug: string }) {
  const location = citySeoLocations.find((item) => item.slug === slug);
  return <LocalSeoPageContent location={location} />;
}

export function LocalDistrictPage({ slug }: { slug: string }) {
  const location = districtSeoLocations.find((item) => item.slug === slug);
  return <LocalSeoPageContent location={location} />;
}

export function SeoAreasPage() {
  usePageSeo(
    `Города и районы работ по Московской области | ${siteMeta.name}`,
    "Города и районы Московской области, куда выезжаем по чистке, ремонту, гидроизоляции, скобированию и углублению колодцев. Дополнительные направления — копка колодцев, септики из ЖБ колец и водоснабжение из колодца в дом.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="География работ"
        title="Города и районы Московской области"
        description="Принимаем заявки по городам и районам Московской области на чистку, ремонт, гидроизоляцию, скобирование и углубление колодцев. Дополнительные работы — копка колодцев, септики из ЖБ колец и водоснабжение из колодца в дом."
        image={assets.hero}
        price={`${allSeoLocations.length} направлений`}
      />
      <LocationHubSection />
      <section className="py-12 lg:py-16">
        <div className="container grid gap-8 xl:grid-cols-2">
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3 text-primary">
              <Building2 className="size-5" />
              <div className="section-kicker">Города</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {citySeoLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/goroda/${location.slug}`}
                  className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/70 transition hover:border-primary/25 hover:text-white"
                >
                  {location.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3 text-primary">
              <MapPin className="size-5" />
              <div className="section-kicker">Районы и округа</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {districtSeoLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/rajony/${location.slug}`}
                  className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/70 transition hover:border-primary/25 hover:text-white"
                >
                  {location.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="container space-y-10">
            <SectionHeading
              eyebrow="Приоритетные связки"
              title="Основные услуги по городам Московской области"
              description="По основным городам вынесены отдельные страницы с услугами, чтобы можно было сразу посмотреть нужное направление и обсудить объект."
            />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredPriorityServiceCityPages.map((page) => (
              <Link key={page.path} href={page.path} className="glass-panel card-hover rounded-[1.7rem] p-5">
                <div className="section-kicker">Приоритетная посадочная</div>
                <div className="mt-3 text-xl font-semibold text-white">{page.title}</div>
                <p className="mt-3 text-sm leading-7 text-white/62">{page.focus}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </SiteLayout>
  );
}

export function SiteMapHint() {
  return <>{serviceOrder.length + allSeoLocations.length + priorityServiceCityPages.length}</>;
}
