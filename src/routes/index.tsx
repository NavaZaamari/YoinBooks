import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LangProvider, useLang } from "@/lib/i18n";
import { AuthModal } from "@/components/yoin/AuthModal";
import { Bookshop, FinalCta, Footer } from "@/components/yoin/Closing";
import { Features } from "@/components/yoin/Features";
import { Header, type AuthMode } from "@/components/yoin/Header";
import { Hero } from "@/components/yoin/Hero";
import { Onboarding } from "@/components/yoin/Onboarding";

const TITLE = "یوئین | Yoin — قفسه‌ی کتاب‌های تو";
const DESCRIPTION =
  "Yoin is a quiet reading community for Persian and English readers: shelve books, track your reading, set a yearly goal and see what other readers read.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <Landing />
    </LangProvider>
  );
}

function Landing() {
  const { lang, dir } = useLang();
  const [auth, setAuth] = useState<AuthMode | null>(null);

  // Enable scroll reveals / doodle draw-on only once JS runs (content is visible without it).
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
  }, []);

  return (
    <div lang={lang} dir={dir} className="relative min-h-screen overflow-x-clip">
      {/* Book-page atmosphere: grain + fibres, foxing speckles, yellowed edges */}
      <div aria-hidden className="paper-overlay" />
      <div aria-hidden className="paper-foxing" />
      <div aria-hidden className="paper-vignette" />

      <a
        href="#main"
        className="sr-only z-50 rounded-[10px] bg-seed px-4 py-2 text-plaster focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
      >
        {lang === "fa" ? "رفتن به محتوا" : "Skip to content"}
      </a>

      <Header onAuth={setAuth} />
      <main id="main" className="relative">
        {/* faint margin rule running down the content, like a notebook page */}
        <div aria-hidden className="margin-rule z-10 hidden md:block" />
        <Hero onAuth={setAuth} />
        <Features />
        <Onboarding onAuth={setAuth} />
        <Bookshop />
        <FinalCta onAuth={setAuth} />
      </main>
      <Footer />

      <AuthModal mode={auth} onModeChange={setAuth} onClose={() => setAuth(null)} />
    </div>
  );
}
