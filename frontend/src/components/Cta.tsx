import type { FC } from "react";

type CtaProps = {
  headline?: string;
  subhead?: string;
  ctaLabel?: string;
};

const Cta: FC<CtaProps> = ({
  headline = "Ready to ship blazing-fast pages?",
  subhead = "Astro + React + Tailwind give you speed, flexibility, and control over UX and SEO.",
  ctaLabel = "Start the dev server",
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
      <h2 className="text-2xl font-semibold text-white">{headline}</h2>
      <p className="mt-2 text-base text-slate-200">{subhead}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href="https://docs.astro.build/en/getting-started/"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
        >
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </a>
        <a
          href="https://tailwindcss.com/docs"
          className="text-sm font-semibold text-emerald-100 underline decoration-dotted underline-offset-4 hover:text-white"
        >
          Tailwind docs
        </a>
      </div>
    </div>
  );
};

export default Cta;
