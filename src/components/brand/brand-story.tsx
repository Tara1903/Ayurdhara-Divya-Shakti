import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BrandStoryContent } from "@/lib/storefront/home";

export function BrandStory({ story }: { story: BrandStoryContent }) {
  return (
    <section className="page-shell section-space pb-12 pt-4">
      <div className="grid gap-5 overflow-hidden rounded-[36px] border border-[rgba(39,62,40,0.08)] bg-[rgba(255,255,255,0.88)] shadow-[0_24px_72px_rgba(39,48,30,0.09)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[18rem] overflow-hidden">
          <Image
            src={story.image}
            alt={story.title}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 px-6 py-8 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
            {story.eyebrow}
          </p>
          <h2 className="max-w-2xl font-serif-display text-4xl leading-[0.94] text-[var(--color-ink)] md:text-[2.8rem]">
            {story.title}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-muted)]">{story.body}</p>
          <div>
            <Link
              href={story.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-forest)]"
            >
              {story.linkLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
