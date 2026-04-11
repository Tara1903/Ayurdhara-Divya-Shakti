import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAdminAction } from "@/app/actions/admin";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export function AdminShell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl gap-6 px-4 py-10 md:grid-cols-[260px_1fr] md:px-8">
      <aside className="rounded-[32px] border border-[var(--color-line)] bg-white/88 p-6 shadow-[0_18px_60px_rgba(61,44,20,0.08)]">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Admin Control
          </p>
          <h2 className="font-serif-display text-3xl text-[var(--color-ink)]">
            Ayurdhara
          </h2>
        </div>

        <nav className="mt-8 grid gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-surface)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form action={logoutAdminAction} className="mt-8">
          <button
            type="submit"
            className="rounded-full border border-[var(--color-line)] px-4 py-3 text-sm font-medium text-[var(--color-forest)]"
          >
            Logout
          </button>
        </form>
      </aside>

      <main className="space-y-6">
        <header className="rounded-[32px] border border-[var(--color-line)] bg-white/88 p-6 shadow-[0_18px_60px_rgba(61,44,20,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Admin Workspace
          </p>
          <h1 className="mt-3 font-serif-display text-4xl text-[var(--color-ink)]">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
            {description}
          </p>
        </header>
        {children}
      </main>
    </div>
  );
}
