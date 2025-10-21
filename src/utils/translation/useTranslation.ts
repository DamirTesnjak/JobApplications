import EN_locale from "../../locales/en.json";
import SL_locale from "../../locales/sl.json";
import HR_locale from "../../locales/hr.json";

const locales: Record<string, any> = {
    en: EN_locale,
    sl: SL_locale,
    hr: HR_locale,
};

export function useTranslation(lang: string, mainKey: string) {
    const locale = locales[lang] || locales['en'];
    return (key: string): string => {
        const translations = locale[mainKey];
        return translations[key];
    }
}