import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { LOCALES } from "@/i18n";

export function LocaleSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "en" || value === "id") {
      i18n.changeLanguage(value);
    }
  };

  return (
    <div className="relative flex items-center">
      <Languages className="absolute left-3 w-4 h-4 text-stone-500 pointer-events-none" />
      <select
        value={i18n.language}
        onChange={handleChange}
        aria-label="Select language"
        className="h-9 pl-9 pr-8 rounded-xl border border-stone-200 bg-white text-sm text-stone-700 hover:border-stone-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 appearance-none cursor-pointer"
      >
        {LOCALES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
      <div className="absolute right-2.5 pointer-events-none text-stone-400">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 4L6 8L10 4" />
        </svg>
      </div>
    </div>
  );
}
