import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BlogShell } from "@/components/yoin/BlogShell";

// Provider and site landmarks surround BOTH children, including direct SSR requests.
export const Route = createFileRoute("/blog")({ component: BlogLayout });

function BlogLayout() {
  return (
    <BlogShell>
      <Outlet />
    </BlogShell>
  );
}
