/*
Design reminder for this file:
Даже служебная страница должна сохранять индустриальную кинематографичность бренда и не выпадать из общего премиального визуального языка.
*/

import { ArrowLeft, Phone } from "lucide-react";
import { Link } from "wouter";
import { trackPhoneClick } from "@/lib/metrika";
import { siteMeta } from "@/lib/site-content";

export default function NotFound() {
  return (
    <div className="site-shell flex min-h-screen items-center justify-center px-4 py-12">
      <div className="page-frame w-full max-w-3xl rounded-[2rem] p-8 text-center lg:p-12">
        <div className="section-kicker">404</div>
        <h1 className="mt-4 text-5xl font-bold text-white md:text-7xl">Страница не найдена</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/64 md:text-lg">
          Возможно, ссылка устарела или адрес был введён с ошибкой. Вернитесь на главную,
          откройте нужную услугу через меню или сразу свяжитесь по телефону.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px]"
          >
            <ArrowLeft className="size-4" />
            На главную
          </Link>
          <a
            href={siteMeta.phoneHref}
            onClick={() => trackPhoneClick("not_found_page")}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-primary/35 hover:text-white"
          >
            <Phone className="size-4 text-primary" />
            {siteMeta.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
