/*
Design reminder for this file:
Даже служебная страница должна сохранять индустриальную кинематографичность бренда и не выпадать из общего премиального визуального языка.
*/

import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="site-shell flex min-h-screen items-center justify-center px-4 py-12">
      <div className="page-frame w-full max-w-3xl rounded-[2rem] p-8 text-center lg:p-12">
        <div className="section-kicker">404</div>
        <h1 className="mt-4 text-5xl font-bold text-white md:text-7xl">Страница не найдена</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/64 md:text-lg">
          Возможно, адрес изменился или раздел ещё не добавлен в структуру сайта. Вернитесь на
          главную и продолжите просмотр услуг.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px]"
          >
            <ArrowLeft className="size-4" />
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
