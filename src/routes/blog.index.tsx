import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { readingArticle, articlePath, readingMinutes } from "@/lib/blog-content";
import { dict } from "@/lib/copy";

const blog = dict.fa.blog;
const ogImage = `https://yoinbook.com${readingArticle.socialImage}`;
const canonical = "https://yoinbook.com/blog";
const page = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonical}#webpage`,
  url: canonical,
  name: blog.seoTitle,
  description: blog.description,
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://yoinbook.com/#website" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: `https://yoinbook.com${articlePath(readingArticle)}`,
        name: readingArticle.title,
      },
    ],
  },
};

export const Route = createFileRoute("/blog/")({
  head: () => ({
    scripts: [{ type: "application/ld+json", children: JSON.stringify(page) }],
    links: [{ rel: "canonical", href: canonical }],
    meta: [
      { title: blog.seoTitle },
      { name: "description", content: blog.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fa_IR" },
      { property: "og:site_name", content: "یوئین" },
      { property: "og:title", content: blog.seoTitle },
      { property: "og:description", content: blog.intro },
      { property: "og:url", content: canonical },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: readingArticle.imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: blog.seoTitle },
      { name: "twitter:description", content: blog.intro },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { t, n } = useLang();
  const copy = t.blog;
  const minutes = n(readingMinutes(readingArticle));
  return (
    <>
      <section className="mx-auto max-w-[1120px] px-5 pb-10 pt-12 md:px-8 md:pb-16 md:pt-20">
        <nav
          aria-label={copy.breadcrumb}
          className="mb-12 flex items-center gap-3 text-[14px] text-olive md:mb-16"
        >
          <a href="/" className="ink-link">
            {copy.home}
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.title}</span>
        </nav>
        <div className="grid gap-9 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.62fr)] md:items-end md:gap-16">
          <div className="max-w-[660px]">
            <h1 className="text-[38px] font-extrabold leading-[1.4] md:text-[54px]">
              {copy.headline}
            </h1>
            <p className="mt-5 max-w-[570px] text-[17px] leading-[2] text-olive md:text-[19px]">
              {copy.intro}
            </p>
          </div>
          <p className="border-e border-sage pe-5 text-[14px] leading-8 text-olive md:justify-self-end">
            {copy.count(n(copy.articles.length))}
          </p>
        </div>
      </section>
      <section aria-labelledby="featured-title" className="border-y border-sage/70 bg-straw/55">
        <div className="mx-auto grid max-w-[1120px] gap-8 px-5 py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-14 md:px-8 md:py-14">
          <Link
            to="/blog/$slug"
            params={{ slug: readingArticle.slug }}
            className="group order-2 block overflow-hidden md:order-1"
            aria-label={`${copy.read}: ${readingArticle.title}`}
          >
            <img
              src={readingArticle.image}
              alt={readingArticle.imageAlt}
              width="1200"
              height="780"
              fetchPriority="high"
              className="aspect-[1.54] w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </Link>
          <article className="order-1 md:order-2">
            <p className="chapter-label mb-5">{copy.featured}</p>
            <h2
              id="featured-title"
              className="max-w-[570px] text-[27px] leading-[1.65] md:text-[36px]"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: readingArticle.slug }}
                className="text-ink transition-colors hover:text-seed"
              >
                {readingArticle.title}
              </Link>
            </h2>
            <p className="mt-4 max-w-[550px] text-[16px] leading-[2] text-olive md:text-[17px]">
              {readingArticle.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-olive">
              <time dateTime={readingArticle.publishedAt}>{readingArticle.displayDate}</time>
              <span>{readingArticle.category}</span>
              <span>{copy.minutes(minutes)}</span>
            </div>
            <Link
              to="/blog/$slug"
              params={{ slug: readingArticle.slug }}
              className="ink-link mt-7 inline-flex text-[15px]"
            >
              {copy.read}
            </Link>
          </article>
        </div>
      </section>
      <section
        aria-labelledby="all-articles-title"
        className="mx-auto max-w-[1120px] px-5 py-16 md:px-8 md:py-24"
      >
        <div className="flex items-end justify-between gap-4 border-b border-sage pb-5">
          <h2 id="all-articles-title" className="text-[24px] md:text-[30px]">
            {copy.latest}
          </h2>
        </div>
        <ol className="divide-y divide-sage/80">
          {copy.articles.map((article) => (
            <li key={article.slug}>
              <article className="grid gap-4 py-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-7 md:py-9">
                <div>
                  <p className="text-[13px] text-olive">{article.category}</p>
                  <h3 className="mt-2 text-[21px] leading-[1.65] md:text-[25px]">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: article.slug }}
                      className="text-ink transition-colors hover:text-seed"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-[690px] text-[15px] leading-[1.95] text-olive">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-olive md:flex-col md:items-end md:gap-1">
                  <time dateTime={article.publishedAt}>{article.displayDate}</time>
                  <span>{copy.minutes(n(readingMinutes(article)))}</span>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
