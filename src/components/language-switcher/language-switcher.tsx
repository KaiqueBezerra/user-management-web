// src/components/language-switcher.tsx
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed bottom-4 left-4 flex gap-2 z-50">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`px-3 py-1 text-sm rounded cursor-pointer ${
          i18n.language === "en"
            ? "bg-blue-800 text-white border border-blue-700 hover:bg-blue-700"
            : "bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage("pt")}
        className={`px-3 py-1 text-sm rounded cursor-pointer ${
          i18n.language === "pt"
            ? "bg-blue-800 text-white border border-blue-700 hover:bg-blue-700"
            : "bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-700"
        }`}
      >
        PT
      </button>
    </div>
  );
}
