import { cn } from "@/lib/utils";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";
import { siteMeta } from "@/lib/site-content";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="site-shell flex min-h-screen items-center justify-center px-4 py-12">
          <div className="page-frame w-full max-w-3xl rounded-[2rem] p-8 text-center lg:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-destructive/25 bg-destructive/10 text-destructive">
              <AlertTriangle className="size-8" />
            </div>

            <div className="section-kicker mt-6">Техническая пауза</div>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Страница временно перезагружается
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
              Иногда браузер или соединение могут дать краткий сбой. Обновите страницу и
              продолжите просмотр. Если проблема повторится, лучше сразу связаться по телефону.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:translate-y-[-1px]"
                )}
              >
                <RotateCcw size={16} />
                Обновить страницу
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-primary/35 hover:text-white"
              >
                <Home size={16} className="text-primary" />
                На главную
              </a>
            </div>

            <a
              href={siteMeta.phoneHref}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/4 px-5 py-3 text-sm font-semibold text-white/82 transition hover:border-primary/30 hover:text-white"
            >
              {siteMeta.phone}
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
