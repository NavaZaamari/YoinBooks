import { useState, type ReactNode } from "react";
import { LangProvider, useLang } from "@/lib/i18n";
import { Header, type AuthMode } from "./Header";
import { Footer } from "./Closing";
import { AuthModal } from "./AuthModal";

export function BlogShell({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <Shell>{children}</Shell>
    </LangProvider>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const { lang, dir, t } = useLang();
  const [auth, setAuth] = useState<AuthMode | null>(null);
  return (
    <div lang={lang} dir={dir} className="relative min-h-screen overflow-x-clip">
      <div aria-hidden className="paper-overlay" />
      <div aria-hidden className="paper-foxing" />
      <div aria-hidden className="paper-vignette" />
      <a
        href="#blog-main"
        lang="fa"
        className="sr-only z-50 bg-seed px-4 py-2 text-plaster focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
      >
        {t.blog.skip}
      </a>
      <Header onAuth={setAuth} homePath="/" blogActive />
      <main id="blog-main" tabIndex={-1} lang="fa" dir="rtl" className="relative">
        {children}
      </main>
      <Footer />
      <AuthModal mode={auth} onModeChange={setAuth} onClose={() => setAuth(null)} />
    </div>
  );
}
