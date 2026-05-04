/*
Design reminder for this file:
Индустриальная кинематографичность с техно-премиальной подачей.
Каждая страница должна ощущаться как часть единого дорогого интерфейса: крупные заголовки, воздух, стеклянные панели, тёмная база, латунные акценты и реальные изображения.
*/

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
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
  "uglublenie-kolodcev": MoveDown,
  "vodosnabzhenie-iz-kolodca-v-dom": Droplets,
} as const;

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
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

    ensureMeta('meta[name="description"]', "name", "description").setAttribute("content", description);
    ensureMeta('meta[property="og:title"]', "property", "og:title").setAttribute("content", title);
    ensureMeta('meta[property="og:description"]', "property", "og:description").setAttribute("content", description);
  }, [title, description]);
}

function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px] hover:shadow-[0_12px_32px_rgba(193,145,71,0.25)]"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-primary/40 hover:bg-white/8"
    >
      {children}
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0d1118]/72 backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex size-11 overflow-hidden rounded-2xl border border-primary/25 bg-primary/10 shadow-[0_10px_24px_rgba(199,154,63,0.18)]">
              <img
                src={assets.userLogo}
                alt={`${siteMeta.name} — логотип компании`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="font-heading text-lg font-bold tracking-[-0.04em] text-white">{siteMeta.name}</div>
              <div className="truncate text-xs text-white/55">{siteMeta.tagline}</div>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "site-link text-sm font-medium text-white/70 transition hover:text-white",
                location === item.href && "nav-link-active",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteMeta.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-white/85"
          >
            <Phone className="size-4 text-primary" />
            {siteMeta.phone}
          </a>
          <PrimaryLink href="/kontakty">Оставить заявку</PrimaryLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-white lg:hidden"
          aria-label="Открыть меню"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/8 bg-[#0c1016]/95 lg:hidden">
          <div className="container space-y-2 py-4">
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
            <a
              href={siteMeta.phoneHref}
              className="mt-3 flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary"
            >
              <Phone className="size-4" />
              {siteMeta.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 py-10">
      <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div className="space-y-4">
          <div className="font-heading text-2xl font-bold text-white">{siteMeta.name}</div>
          <p className="max-w-md text-sm leading-7 text-white/62">
            Современный сайт для услуг по колодцам и водоснабжению: спокойная подача,
            аккуратная инженерная логика и премиальное визуальное ощущение.
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
            <a href={siteMeta.phoneHref} className="block transition hover:text-white">
              {siteMeta.phone}
            </a>
            <a href={`mailto:${siteMeta.email}`} className="block transition hover:text-white">
              {siteMeta.email}
            </a>
            <div>На связи — {siteMeta.ownerName}</div>
            <div>{siteMeta.region}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen">
      <ScrollToTop />
      <div className="mesh-glow left-[-8rem] top-24 h-72 w-72 bg-primary/18" />
      <div className="mesh-glow right-[-4rem] top-[30rem] h-64 w-64 bg-sky-400/8" />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
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
    <section className="relative overflow-hidden pb-16 pt-14 lg:pb-24 lg:pt-20">
      <div className="container hero-grid">
        <div className="space-y-8 pb-8 lg:pb-0">
          <div className="copper-chip">
            <span className="inline-block size-2 rounded-full bg-primary" />
            {siteMeta.region}
          </div>
          <div className="space-y-5">
            <h1 className="hero-title text-white">
              Чистка, ремонт и <span className="text-gradient-metal">вода в доме</span>
              <br />
              из колодца
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/68 lg:text-xl">
              Возвращаем колодцу нормальную работу, устраняем течи и загрязнение,
              организуем стабильную подачу воды в дом и показываем решение без лишних
              обещаний и визуального шума.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="/kontakty">
              Получить консультацию
              <ArrowRight className="size-4" />
            </PrimaryLink>
            <SecondaryLink href="/uslugi">Посмотреть услуги</SecondaryLink>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {trustMetrics.map((item) => (
              <div key={item.value} className="hero-stat p-4">
                <div className="metric-value text-primary">{item.value}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="page-frame overflow-hidden rounded-[2rem] p-3">
          <div className="image-mask min-h-[460px] lg:min-h-[620px]">
            <img
              src={assets.hero}
              alt="Премиальный объект с колодцем и работой специалистов"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15] via-[#0b0f15]/42 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-full border border-white/12 bg-[#10151d]/72 px-4 py-3 backdrop-blur-md">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-primary/90">WELLS-MO</div>
                <div className="text-sm text-white/65">Сервис по колодцам и воде в доме</div>
              </div>
              <ShieldCheck className="size-5 text-primary" />
            </div>
            <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] border border-white/10 bg-[#0f141d]/68 p-5 backdrop-blur-xl">
              <div className="mb-3 text-xs uppercase tracking-[0.22em] text-primary/90">
                Что важно клиенту
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Понятный объём работ",
                  "Аккуратная работа на участке",
                  "Реальные фото процессов и результата",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/4 p-4 text-sm text-white/74">
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
  return (
    <section className="py-18 lg:py-24">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Ключевые направления"
          title="Многостраничный сайт вокруг реальных задач клиента"
          description="Каждая основная услуга вынесена в отдельную страницу, чтобы посетитель быстро находил нужное решение, а сайт усиливал локальное SEO и коммерческую подачу."
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] ?? Wrench;

            return (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="glass-panel card-hover flex h-full flex-col rounded-[1.8rem] p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/18 bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                    {service.eyebrow}
                  </div>
                </div>
                <div className="service-card-title text-white">{service.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{service.description}</p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-primary">{service.price}</span>
                  <span className="inline-flex items-center gap-2 text-white/62">
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
    <section className="py-18 lg:py-24">
      <div className="container grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div className="page-frame rounded-[2rem] p-6 lg:p-8">
          <div className="section-kicker">Почему доверяют</div>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Премиальность через <span className="text-gradient-metal">ясность и детали</span>
          </h2>
          <p className="story-copy mt-5">
            Здесь нет громких заявлений ради эффекта. Доверие строится на понятной логике,
            спокойной подаче, реальных фото и аккуратной инженерной структуре сайта.
          </p>
          <div className="metal-line my-8" />
          <div className="space-y-5">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                <div className="text-lg font-semibold text-white">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-white/62">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[assets.cleaning, assets.repair, assets.waterSupply, assets.hero].map((asset, index) => (
            <div key={asset} className={cn("image-mask page-frame overflow-hidden rounded-[1.8rem]", index === 0 ? "md:col-span-2 min-h-[260px]" : "min-h-[240px]")}>
              <img src={asset} alt="Реальный процесс работ" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="py-18 lg:py-24">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Как проходит работа"
          title="Маршрут клиента от запроса до готового результата"
          description="На сайте важно показать порядок действий: это снижает тревожность и помогает воспринимать услугу как понятный инженерный процесс, а не как набор случайных работ."
        />
        <div className="grid gap-5 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.number} className="glass-panel rounded-[1.8rem] p-6">
              <div className="metric-value text-primary">{step.number}</div>
              <div className="mt-4 text-xl font-semibold text-white">{step.title}</div>
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
    <section className="py-18 lg:py-24">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Реальные объекты"
          title="Кейсы, которые заменяют лишние обещания"
          description="Портфолио показывает не просто красивые кадры, а связку задачи, процесса и результата. Именно так сайт выглядит убедительно и дорого одновременно."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {cases.map((item) => (
            <article key={item.title} className="page-frame overflow-hidden rounded-[1.8rem]">
              <div className="image-mask min-h-[300px] border-b border-white/8">
                <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-primary/90">{item.location}</div>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">{item.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-18 lg:py-24">
      <div className="container grid gap-8 xl:grid-cols-[1fr_1.15fr] xl:items-start">
        <div className="space-y-5">
          <div className="section-kicker">Цены и ориентиры</div>
          <h2 className="section-title text-white">Стоимость должна быть понятной, но честной</h2>
          <p className="story-copy">
            Вместо слишком точных обещаний на сайте лучше показывать ориентиры. Это звучит
            профессиональнее и помогает не менять условия после осмотра объекта.
          </p>
          <SecondaryLink href="/ceny">Открыть страницу цен</SecondaryLink>
        </div>
        <div className="page-frame overflow-hidden rounded-[2rem]">
          <div className="divide-y divide-white/8">
            {pricing.map((item) => (
              <div key={item.service} className="grid gap-3 p-5 md:grid-cols-[1.1fr_160px] md:items-center">
                <div>
                  <div className="text-lg font-semibold text-white">{item.service}</div>
                  <div className="mt-2 text-sm leading-6 text-white/58">{item.note}</div>
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

function TestimonialsSection() {
  return (
    <section className="py-18 lg:py-24">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Отзывы"
          title="Тон сайта — сдержанный, а отзывы усиливают решение"
          description="Клиенту важно услышать не рекламный лозунг, а подтверждение того, что задачу действительно разобрали и решили по делу."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((item) =>
            "image" in item && item.image ? (
              <figure key={item.quote} className="page-frame overflow-hidden rounded-[1.8rem]">
                <div className="image-mask min-h-[280px] border-b border-white/8 bg-[#0f141d]">
                  <img
                    src={item.image}
                    alt={item.alt ?? item.author}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption className="space-y-3 p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary/90">Визуальное подтверждение</div>
                  <p className="text-sm leading-7 text-white/70">{item.quote}</p>
                  <div className="text-sm uppercase tracking-[0.18em] text-primary/85">{item.author}</div>
                </figcaption>
              </figure>
            ) : (
              <blockquote key={item.quote} className="glass-panel rounded-[1.8rem] p-6">
                <p className="text-base leading-8 text-white/78">“{item.quote}”</p>
                <footer className="mt-6 text-sm uppercase tracking-[0.18em] text-primary/85">
                  {item.author}
                </footer>
              </blockquote>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ items = globalFaq }: { items?: readonly { question: string; answer: string }[] }) {
  return (
    <section className="py-18 lg:py-24">
      <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="section-kicker">FAQ</div>
          <h2 className="section-title mt-4 text-white">Вопросы, которые снимают сомнения</h2>
          <p className="story-copy mt-5">
            Хороший сервисный сайт не прячет ответы. Он показывает логику работ, разбирает
            типовые опасения и помогает перейти к заявке без напряжения.
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
    <section className="py-18 lg:py-24">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Города и районы"
          title="Отдельные локальные страницы для SEO и удобной навигации"
          description="Для усиления локального SEO сайт получает самостоятельные посадочные страницы по городам и районам Московской области. Внутри — единый стиль, локальные заголовки, точные мета-теги и связка с ключевыми услугами."
        />
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="flex items-center gap-3 text-primary">
              <MapPin className="size-5" />
              <div className="section-kicker">Приоритетные локации</div>
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
                <div className="mt-2 text-lg font-semibold text-white">Страницы по городам</div>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Под отдельные городские запросы с локальными заголовками и перелинковкой.
                </p>
              </div>
              <div className="glass-panel rounded-[1.5rem] p-5">
                <div className="metric-value text-primary">{districtSeoLocations.length}</div>
                <div className="mt-2 text-lg font-semibold text-white">Страницы по районам</div>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Под округа и районные кластеры, чтобы расширить поисковое покрытие.
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-white/4 p-5 text-sm leading-7 text-white/68">
              Каждая локальная страница связана с основными услугами, формой заявки и общим хабом
              локаций. Это делает структуру сайта понятной и для пользователя, и для поисковых
              систем.
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
                Нужна чистка, ремонт или <span className="text-gradient-metal">вода в доме</span>?
              </h2>
              <p className="story-copy max-w-2xl">
                Опишите задачу, район и текущее состояние объекта. Такой формат заявки выглядит
                профессионально, помогает быстрее оценить задачу и делает путь клиента спокойным
                и понятным.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href="/kontakty">
                  Оставить заявку <ArrowRight className="size-4" />
                </PrimaryLink>
                <a
                  href={siteMeta.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/88"
                >
                  <Phone className="size-4 text-primary" />
                  {siteMeta.phone}
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Чистка и обслуживание колодцев",
                "Ремонт и герметизация шахты",
                "Углубление по результатам осмотра",
                "Подводка воды в дом под ключ",
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
            <PrimaryLink href="/kontakty">
              Обсудить задачу <ArrowRight className="size-4" />
            </PrimaryLink>
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">
              {price}
            </div>
          </div>
        </div>
        <div className="page-frame overflow-hidden rounded-[2rem] p-3">
          <div className="image-mask min-h-[340px] lg:min-h-[480px]">
            <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
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
    <section className="py-18 lg:py-24">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Фотогалерея"
          title="Примеры выполненных работ по всем ключевым услугам"
          description="На сервисной странице важно не только объяснить, как работает услуга, но и показать реальные визуальные сценарии. Галерея помогает быстро переключаться между типами работ и смотреть примеры без выхода из маршрута."
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
                  <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
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
            По умолчанию выше показаны работы, максимально близкие к текущей услуге. При необходимости можно сразу переключиться на другие типы задач.
          </p>
          <SecondaryLink href="/nashi-raboty">Открыть страницу работ</SecondaryLink>
        </div>
      </div>
    </section>
  );
}

function ServiceContent({ slug }: { slug: string }) {
  const service = useMemo(() => services.find((item) => item.slug === slug), [slug]);

  usePageSeo(
    service
      ? `${service.title} — ${siteMeta.region} | ${siteMeta.name}`
      : `Страница не найдена | ${siteMeta.name}`,
    service
      ? `${service.title} по ${siteMeta.region.toLowerCase()}. ${service.intro}`
      : "Нужная страница услуги не найдена в текущей структуре сайта.",
  );

  if (!service) {
    return (
      <SiteLayout>
        <section className="container py-28">
          <div className="page-frame rounded-[2rem] p-10">
            <h1 className="text-4xl font-bold text-white">Страница не найдена</h1>
            <p className="mt-4 text-white/65">Похоже, нужная услуга ещё не добавлена в структуру сайта.</p>
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
        title={service.title}
        description={service.description}
        image={service.image}
        price={service.price}
      />

      <section className="py-18 lg:py-24">
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

      <section className="py-18 lg:py-24">
        <div className="container space-y-10">
          <SectionHeading
            eyebrow="Этапы"
            title="Как раскрывается услуга на отдельной странице"
            description="Каждая ключевая страница должна показывать не набор общих обещаний, а реальную последовательность действий и профессиональную логику работ."
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

      <section className="py-18 lg:py-24">
        <div className="container space-y-10">
          <SectionHeading
            eyebrow="Приоритетные города"
            title={`${service.title} в ключевых городах Подмосковья`}
            description="Для усиления локального SEO у ключевых услуг появляются отдельные посадочные страницы под самые важные города. Это помогает работать точнее и по сервисным, и по геозависимым запросам."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {priorityPagesForService.map(({ city, page }) => (
              <Link key={page.path} href={page.path} className="glass-panel card-hover rounded-[1.8rem] p-6">
                <div className="section-kicker">{city.officialName}</div>
                <div className="mt-4 text-2xl font-semibold text-white">{page.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{page.focus}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Открыть локальную страницу <ArrowRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 lg:py-24">
        <div className="container space-y-10">
          <SectionHeading
            eyebrow="Другие услуги"
            title="Сайт остаётся связным и помогает перейти к смежным задачам"
            description="Если клиент пришёл за одной услугой, ему важно быстро увидеть, что команда может закрыть и соседние инженерные задачи — без выпадения из единого визуального контекста."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} className="glass-panel card-hover rounded-[1.8rem] p-6">
                <div className="section-kicker">{item.eyebrow}</div>
                <div className="mt-4 text-2xl font-semibold text-white">{item.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/62">{item.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Перейти к странице <ArrowRight className="size-4" />
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
    "Чистка колодцев, ремонт и водоснабжение из колодца в дом — Московская область | WELLS-MO",
    "Чистка колодцев, ремонт шахты, углубление и подводка воды в дом по Московской области. Современная структура сайта, понятная подача и реальные фото работ.",
  );

  return (
    <SiteLayout>
      <HomeHero />
      <ServicesPreview />
      <WhyChooseSection />
      <ProcessSection />
      <CasesSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <LocationHubSection />
      <CtaSection />
    </SiteLayout>
  );
}

export function ServicesPage() {
  usePageSeo(
    `Услуги по колодцам и водоснабжению — ${siteMeta.region} | ${siteMeta.name}`,
    "Отдельные страницы услуг по чистке колодцев, ремонту, углублению и подводке воды в дом по Московской области.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Структура услуг"
        title="Услуги по колодцам и водоснабжению"
        description="Главная задача этого раздела — быстро развести посетителя по конкретным страницам: чистка, ремонт, углубление и подводка воды в дом."
        image={assets.hero}
        price="Понятная структура"
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
    "Ориентировочные цены на чистку колодцев, ремонт шахты, углубление и водоснабжение из колодца в дом по Московской области.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Коммерческий ориентир"
        title="Цены на услуги"
        description="Страница стоимости показывает ориентиры по основным работам и объясняет, почему точная смета зависит от состояния объекта и состава решения."
        image={assets.repair}
        price="От прозрачных ориентиров"
      />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </SiteLayout>
  );
}

export function WorksPage() {
  usePageSeo(
    `Наши работы по колодцам и водоснабжению — ${siteMeta.region} | ${siteMeta.name}`,
    "Кейсы по чистке колодцев, ремонту и подводке воды в дом: реальные объекты, процессы и результаты по Московской области.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Портфолио"
        title="Наши работы"
        description="Кейсы и реальные фотографии усиливают доверие лучше любых общих обещаний. Здесь сайт показывает задачу, процесс и результат в одном визуальном языке."
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
    `Контакты и заявка на работы по колодцам — ${siteMeta.region} | ${siteMeta.name}`,
    "Контакты, форма заявки и быстрый способ связаться по вопросам чистки колодцев, ремонта и подводки воды в дом по Московской области.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Связь и заявка"
        title="Контакты"
        description="Контактная страница должна быть короткой, уверенной и удобной. Для мобильной версии главное — сразу показать следующий шаг и быстрый способ связи."
        image={assets.waterSupply}
        price={siteMeta.region}
      />
      <section className="py-18 lg:py-24">
        <div className="container grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="section-kicker">Как связаться</div>
            <div className="mt-5 space-y-5 text-white/72">
              <a href={siteMeta.phoneHref} className="block text-2xl font-semibold text-white">
                {siteMeta.phone}
              </a>
              <a href={`mailto:${siteMeta.email}`} className="block text-base transition hover:text-white">
                {siteMeta.email}
              </a>
              <p className="story-copy">
                На связи — {siteMeta.ownerName}. Опишите район, задачу и текущее состояние колодца,
                чтобы быстрее перейти к нормальной оценке работ без длинных уточнений.
              </p>
            </div>
            <div className="mt-8 grid gap-4">
              {[
                "Мутная вода, запах или длительный простой",
                "Течь через швы, смещение колец или деформация шахты",
                "Нужно провести воду в дом из существующего колодца",
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4 text-sm leading-7 text-white/74">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="section-kicker">Форма заявки</div>
            <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
              <input
                className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34"
                placeholder="Ваше имя"
              />
              <input
                className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34"
                placeholder="Телефон"
              />
              <input
                className="h-14 rounded-2xl border border-white/10 bg-white/4 px-4 text-base text-white placeholder:text-white/34"
                placeholder="Район или населённый пункт"
              />
              <textarea
                className="min-h-36 rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-base text-white placeholder:text-white/34"
                placeholder="Кратко опишите задачу"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px]"
              >
                Отправить заявку
                <ArrowRight className="size-4" />
              </button>
              <p className="text-sm leading-7 text-white/45">
                Для быстрого контакта можно сразу связаться с {siteMeta.ownerName}: позвонить по
                номеру {siteMeta.phone} или написать на {siteMeta.email}.
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
    "Спокойный профессиональный подход к чистке и ремонту колодцев, углублению и организации воды в доме по Московской области.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="О подходе"
        title="О компании"
        description="Эта страница нужна не для самохвальства, а для спокойного объяснения подхода: сначала осмотр, затем логика работ, после этого — понятный результат без лишних услуг."
        image={assets.hero}
        price="Спокойный профессиональный тон"
      />
      <section className="py-18 lg:py-24">
        <div className="container grid gap-8 xl:grid-cols-[1fr_1fr]">
          <div className="page-frame rounded-[2rem] p-6 lg:p-8">
            <div className="section-kicker">Позиционирование</div>
            <h2 className="mt-4 text-4xl font-bold text-white">Профильная команда без лишнего пафоса</h2>
            <p className="story-copy mt-5">
              Вместо лозунгов сайт рассказывает о нормальном процессе: как вы оцениваете объект,
              почему не предлагаете ненужные операции и как связываете состояние шахты с
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
    "Ответы на частые вопросы о чистке колодцев, ремонте шахты, углублении и подводке воды в дом по Московской области.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Ответы заранее"
        title="Частые вопросы"
        description="FAQ нужен не только для SEO, но и для нормального коммерческого диалога: он помогает снять тревогу и показать профессиональную логику без давления."
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

function LocalSeoPageContent({ location }: { location: LocalSeoLocation | undefined }) {
  usePageSeo(
    location
      ? `Чистка и ремонт колодцев — ${location.name} | ${siteMeta.name}`
      : `Локальная страница не найдена | ${siteMeta.name}`,
    location
      ? `Чистка колодцев, ремонт шахты, углубление и подводка воды в дом — ${location.name}, Московская область. Отдельная локальная страница с услугами, FAQ и заявкой.`
      : "Локальная SEO-страница не найдена.",
  );

  if (!location) {
    return (
      <SiteLayout>
        <section className="container py-28">
          <div className="page-frame rounded-[2rem] p-10">
            <h1 className="text-4xl font-bold text-white">Локация не найдена</h1>
            <p className="mt-4 text-white/65">
              Нужная локальная страница пока отсутствует в текущей структуре сайта.
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
        eyebrow={location.type === "city" ? "Городская страница" : "Районная страница"}
        title={`Чистка, ремонт и вода в доме — ${location.name}`}
        description={`Отдельная локальная страница под запросы по локации ${location.name}. Здесь сохранён единый премиальный стиль сайта, а контент сфокусирован на чистке колодцев, ремонте, углублении и водоснабжении для частных домов и дач.`}
        image={location.asset}
        price={location.officialName}
      />

      <section className="py-18 lg:py-24">
        <div className="container grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Локальная релевантность</div>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Страница собрана под запросы по локации {location.name}
              </h2>
              <p className="story-copy mt-5">
                Такая посадочная страница помогает сайту лучше работать по геозависимым запросам.
                Пользователь сразу видит, что выезжают именно по его направлению, а поисковая
                структура становится глубже и понятнее.
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
                      href={priorityPage?.path ?? `/${service.slug}`}
                      className="rounded-[1.4rem] border border-white/8 bg-white/4 p-4 transition hover:border-primary/25 hover:bg-white/6"
                    >
                      <div className="text-lg font-semibold text-white">{service.title}</div>
                      <p className="mt-2 text-sm leading-7 text-white/62">
                        {service.shortTitle} — {location.name}. {service.price}
                      </p>
                      {priorityPage ? (
                        <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/85">
                          Отдельная SEO-страница <ArrowRight className="size-3.5" />
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
              <div className="section-kicker">Фокус страницы</div>
              <p className="story-copy mt-5">{location.focus}</p>
              <div className="mt-6 rounded-[1.5rem] border border-primary/18 bg-primary/8 p-4 text-sm leading-7 text-white/78">
                Основные запросы: чистка колодцев {location.name}, ремонт колодцев {location.name},
                вода из колодца в дом {location.name}.
              </div>
            </div>
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Переходы по локациям</div>
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
                <div className="section-kicker">Приоритетные страницы услуг</div>
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

      <section className="py-18 lg:py-24">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="section-kicker">Как это работает</div>
            <h2 className="section-title mt-4 text-white">От локального запроса к заявке</h2>
            <p className="story-copy mt-5">
              На локальной странице пользователь не теряется в общей структуре сайта. Он получает
              понятный вход: видит свои услуги, свою локацию и быстрый путь к заявке или звонку.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              `Отдельный локальный заголовок под ${location.name}`,
              `Связка с услугами и общим разделом работ`,
              `Перелинковка на соседние города и районы для расширения охвата`,
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
    page ? page.seoDescription : "Нужная локальная страница услуги пока не добавлена.",
  );

  if (!city || !service || !page) {
    return (
      <SiteLayout>
        <section className="container py-28">
          <div className="page-frame rounded-[2rem] p-10">
            <h1 className="text-4xl font-bold text-white">Страница не найдена</h1>
            <p className="mt-4 text-white/65">
              Нужная связка услуги и города пока отсутствует в текущей структуре сайта.
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
        eyebrow="Приоритетная связка"
        title={page.title}
        description={page.lead}
        image={service.image}
        price={page.badge}
      />

      <section className="py-18 lg:py-24">
        <div className="container grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-8">
            <div className="page-frame rounded-[2rem] p-6 lg:p-8">
              <div className="section-kicker">Что закрывает страница</div>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{service.title} в {city.name} без общей шаблонности</h2>
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
              <div className="section-kicker">Локальный фокус</div>
              <div className="mt-4 text-2xl font-semibold text-white">{city.officialName}</div>
              <p className="story-copy mt-5">
                Для этой связки важно соединить конкретную услугу с конкретной локацией: пользователь
                сразу понимает, что страница отвечает именно на его запрос по {city.name}, а не
                ведёт на общий обзор без географического акцента.
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

      <section className="py-18 lg:py-24">
        <div className="container grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="section-kicker">Перелинковка внутри города</div>
            <h2 className="section-title mt-4 text-white">Другие услуги в {city.name}</h2>
            <p className="story-copy mt-5">
              Приоритетные города получают не одну, а группу сервисных страниц. Это позволяет
              аккуратно разводить запросы и усиливать внутреннюю SEO-структуру без потери удобства.
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
    "Отдельные SEO-страницы по городам и районам Московской области для услуг по колодцам, ремонту и водоснабжению из колодца в дом.",
  );

  return (
    <SiteLayout>
      <HeroPageBlock
        eyebrow="Локальное SEO"
        title="Города и районы Московской области"
        description="В этом разделе собраны отдельные страницы по локациям. Каждая страница помогает лучше отрабатывать локальные запросы и вести посетителя к нужной услуге без потери общего премиального стиля."
        image={assets.hero}
        price={`${allSeoLocations.length} локальных страниц`}
      />
      <LocationHubSection />
      <section className="py-18 lg:py-24">
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
      <section className="py-18 lg:py-24">
        <div className="container space-y-10">
          <SectionHeading
            eyebrow="Приоритетные связки"
            title="Отдельные страницы услуг в самых важных городах"
            description="Для ключевых городов сайт получает не только общие городские страницы, но и отдельные посадочные под конкретные услуги. Это усиливает локальное SEO и делает навигацию точнее."
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
