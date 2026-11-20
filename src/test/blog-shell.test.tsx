import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogShell } from "@/components/yoin/BlogShell";
import { useLang } from "@/lib/i18n";
import { articles, readingMinutes } from "@/lib/blog-content";

// Regression: blog content calling useLang() must render inside the shell's provider.
function Child() {
  const { t } = useLang();
  return <h1>{t.blog.headline}</h1>;
}

describe("Blog shell", () => {
  it("provides language context to blog content", () => {
    render(
      <BlogShell>
        <Child />
      </BlogShell>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "چند صفحه برای بیشتر خواندن.",
    );
    expect(screen.getAllByRole("link", { name: "وبلاگ" })[0]).toHaveAttribute("href", "/blog");
  });

  it("has one published article with a clean slug and unique section ids", () => {
    const [article] = articles;
    expect(article?.slug).toMatch(/^[a-z0-9-]+$/);
    const ids = article!.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(readingMinutes(article!)).toBeGreaterThan(3);
  });
});
