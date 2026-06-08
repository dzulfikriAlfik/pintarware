import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALES } from "@/i18n";

export function LocaleSelector({ className, variant = "default" }) {
  const { i18n } = useTranslation();
  const isMenu = variant === "menu";

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "en" || value === "id") {
      i18n.changeLanguage(value);
    }
  };

  return (
    <div className={cn("relative flex items-center", isMenu && "w-full", className)}>
      <Languages className="absolute left-3 w-4 h-4 text-pencil-gray pointer-events-none" />
      <select
        value={i18n.language}
        onChange={handleChange}
        aria-label="Select language"
        className={cn(
          "h-9 pl-9 rounded-md border border-pencil-gray bg-cream-paper text-sm text-forest-ink hover:border-forest-ink focus:border-forest-ink focus:outline-none focus:ring-2 focus:ring-forest-ink/20 appearance-none cursor-pointer font-roboto-mono",
          isMenu ? "w-full pr-3" : "pr-8"
        )}
      >
        {LOCALES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
      {!isMenu && (
        <div className="absolute right-2.5 pointer-events-none text-pencil-gray">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 4L6 8L10 4" />
          </svg>
        </div>
      )}
    </div>
  );
}
