import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { articlePath, articles, readingMinutes, type Paragraph } from "@/lib/blog-content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "نوشته پیدا نشد | وبلاگ یوئین" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    const { article } = loaderData;
    const canonical = `https://yoinbook.com${articlePath(article)}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      headline: article.title,
      description: article.description,
      image: [`https://yoinbook.com${article.socialImage}`],
      datePublished: article.publishedAt,
      dateModified: article.modifiedAt,
      author: { "@type": "Organization", name: article.author, url: "https://yoinbook.com/" },
      publisher: { "@id": "https://yoinbook.com/#organization" },
      articleSection: article.category,
      articleBody: [
        ...article.intro,
        ...article.sections.flatMap((section) => [section.title, ...section.paragraphs]),
      ]
        .map((part) =>
          typeof part === "string" ? part : `${part.before}${part.label}${part.after}`,
        )
        .join(" "),
      inLanguage: "fa-IR",
      isPartOf: { "@id": "https://yoinbook.com/blog#webpage" },
    };
    return {
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
      links: [{ rel: "canonical", href: canonical }],
      meta: [
        { title: article.seoTitle },
        { name: "description", content: article.description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "fa_IR" },
        { property: "og:site_name", content: "یوئین" },
        { property: "og:title", content: article.seoTitle },
        { property: "og:description", content: article.description },
        { property: "og:url", content: canonical },
        { property: "og:image", content: `https://yoinbook.com${article.socialImage}` },
        { property: "og:image:alt", content: article.imageAlt },
        { property: "article:published_time", content: article.publishedAt },
        { property: "article:modified_time", content: article.modifiedAt },
        { property: "article:section", content: article.category },
        { property: "article:author", content: article.author },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.seoTitle },
        { name: "twitter:description", content: article.description },
        { name: "twitter:image", content: `https://yoinbook.com${article.socialImage}` },
      ],
    };
  },
  component: ArticleRoute,
  notFoundComponent: ArticleNotFound,
});

function ArticleRoute() {
  const { article } = Route.useLoaderData();
  return <ArticleContent article={article} />;
}

function ArticleContent({ article }: { article: (typeof articles)[number] }) {
  const { t, n } = useLang();
  const copy = t.blog;
  const minutes = n(readingMinutes(article));
  return (
    <article lang="fa" dir="rtl">
      <div className="mx-auto max-w-[1120px] px-5 pt-10 md:px-8 md:pt-14">
        <nav
          aria-label={copy.breadcrumb}
          className="flex items-center gap-3 text-[14px] text-olive"
        >
          <Link to="/blog" className="ink-link">
            {copy.title}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="truncate">
            {article.category}
          </span>
        </nav>
      </div>
      <header className="mx-auto max-w-[900px] px-5 pb-8 pt-12 md:px-8 md:pb-12 md:pt-16">
        <p className="chapter-label mb-6">{article.category}</p>
        <h1 className="max-w-[820px] text-[34px] leading-[1.55] md:text-[48px]">{article.title}</h1>
        <p className="mt-6 max-w-[740px] text-[17px] leading-[2] text-olive md:text-[19px]">
          {article.excerpt}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-sage/80 py-4 text-[14px] text-olive">
          <span>{article.author}</span>
          <time dateTime={article.publishedAt}>{article.displayDate}</time>
          <span>{copy.minutes(minutes)}</span>
        </div>
        <p className="mt-3 text-[13px] text-olive">{copy.note}</p>
      </header>
      <figure className="mx-auto max-w-[1120px] px-5 md:px-8">
        <img
          src={article.image}
          alt={article.imageAlt}
          width="1200"
          height="780"
          fetchPriority="high"
          className="aspect-[1.54] w-full object-cover"
        />
        <figcaption className="mt-3 text-[13px] text-olive">{article.caption}</figcaption>
      </figure>
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-12 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] md:gap-16 md:px-8 md:py-16">
        <nav
          aria-label={copy.contents}
          className="h-fit border-y border-sage py-5 lg:sticky lg:top-28 lg:border-t-0"
        >
          <p className="text-[17px] font-bold text-ink">{copy.contents}</p>
          <ol className="mt-3 space-y-2">
            {article.sections.map((section) => (
              <li key={section.id} className="text-[14px] leading-[1.8]">
                <a className="ink-link" href={`#${section.id}`}>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="min-w-0 max-w-[720px]">
          <div className="space-y-6 text-[17px] leading-[2.05] text-ink md:text-[18px]">
            {article.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
            {article.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-28"
              >
                <h2
                  id={`${section.id}-title`}
                  className="border-e-2 border-seed pe-4 text-[25px] leading-[1.65] md:text-[30px]"
                >
                  {section.title}
                </h2>
                <div className="mt-5 space-y-5 text-[17px] leading-[2.05] text-ink md:text-[18px]">
                  {section.paragraphs.map((paragraph, index) => (
                    <ArticleParagraph key={index} paragraph={paragraph} />
                  ))}
                </div>
                {section.subsections?.map((subsection) => (
                  <section key={subsection.title} className="mt-8">
                    <h3 className="text-[20px] leading-[1.7] md:text-[23px]">{subsection.title}</h3>
                    <div className="mt-4 space-y-5 text-[17px] leading-[2.05] text-ink md:text-[18px]">
                      {subsection.paragraphs.map((paragraph, paragraphIndex) => (
                        <ArticleParagraph key={paragraphIndex} paragraph={paragraph} />
                      ))}
                    </div>
                  </section>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
      <footer className="border-y border-sage bg-straw/55">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8 md:py-12">
          <div>
            <p className="text-[23px] font-extrabold leading-[1.5] text-ink md:text-[27px]">
              {copy.endTitle}
            </p>
            <p className="mt-2 text-[15px] leading-[1.9] text-olive">{copy.endText}</p>
          </div>
          <Link to="/" className="ink-link inline-flex w-fit shrink-0">
            {copy.explore}
          </Link>
        </div>
      </footer>
      <div className="mx-auto max-w-[1120px] px-5 py-9 md:px-8">
        <Link to="/blog" className="ink-link">
          {copy.back}
        </Link>
      </div>
    </article>
  );
}

function ArticleParagraph({ paragraph }: { paragraph: Paragraph }) {
  if (typeof paragraph === "string") return <p>{paragraph}</p>;
  return (
    <p>
      {paragraph.before}
      <a href={paragraph.href} className="ink-link">
        {paragraph.label}
      </a>
      {paragraph.after}
    </p>
  );
}

function ArticleNotFound() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-[720px] px-5 py-24">
      <h1 className="text-[34px]">{t.blog.notFound}</h1>
      <p className="my-6 text-olive">{t.blog.notFoundText}</p>
      <Link to="/blog" className="ink-link">
        {t.blog.back}
      </Link>
    </section>
  );
}
