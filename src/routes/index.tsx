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


const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://yoinbook.com/#webpage",
  url: "https://yoinbook.com/",
  name: "یوئین | Yoin — قفسه‌ی کتاب‌های تو",
  description: "در YOIN کتاب‌های تازه کشف کنید، کتابخانه شخصی خود را بسازید، مسیر مطالعه‌تان را دنبال کنید و تجربه خواندن را با دیگر کتاب‌دوستان به اشتراک بگذارید.",
  isPartOf: { "@id": "https://yoinbook.com/#website" },
  about: { "@id": "https://yoinbook.com/#organization" },
  inLanguage: ["fa-IR", "en"]
};


export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(homeSchema),
      },
    ],
    meta: [
      { title: "یوئین | Yoin — قفسه‌ی کتاب‌های تو" },
      {
        name: "description",
        content: "در YOIN کتاب‌های تازه کشف کنید، کتابخانه شخصی خود را بسازید، مسیر مطالعه‌تان را دنبال کنید و تجربه خواندن را با دیگر کتاب‌دوستان به اشتراک بگذارید."
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "یوئین | Yoin — قفسه‌ی کتاب‌های تو" },
      {
        property: "og:description",
        content: "در YOIN کتاب‌های تازه کشف کنید، کتابخانه شخصی خود را بسازید، مسیر مطالعه‌تان را دنبال کنید و تجربه خواندن را با دیگر کتاب‌دوستان به اشتراک بگذارید."
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "یوئین | Yoin — قفسه‌ی کتاب‌های تو" },
      {
        name: "twitter:description",
        content: "در YOIN کتاب‌های تازه کشف کنید، کتابخانه شخصی خود را بسازید، مسیر مطالعه‌تان را دنبال کنید و تجربه خواندن را با دیگر کتاب‌دوستان به اشتراک بگذارید."
      },
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
