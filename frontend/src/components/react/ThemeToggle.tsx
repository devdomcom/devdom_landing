import { useEffect, useState } from "react";

const storageKey = "theme";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const apply = (next: "light" | "dark") => {
    const root = document.documentElement;
    if (next === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    localStorage.setItem(storageKey, next);
    setTheme(next);
  };

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    apply(stored ? stored : systemDark.matches ? "dark" : "light");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(storageKey)) {
        apply(e.matches ? "dark" : "light");
      }
    };
    systemDark.addEventListener("change", handler);
    return () => systemDark.removeEventListener("change", handler);
  }, []);

  return (
    <button
      type="button"
      onClick={() => apply(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-brand-01 transition hover:-translate-y-0.5 hover:shadow-brand-02 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
      style={{
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
        border: "1px solid var(--color-gray-300)",
      }}
      aria-live="polite"
    >
      {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    </button>
  );
}

export default ThemeToggle;
