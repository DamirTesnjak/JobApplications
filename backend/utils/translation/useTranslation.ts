import EN_locale from "../../locales/en.json";
import SL_locale from "../../locales/sl.json";
import HR_locale from "../../locales/hr.json";
import { Signal } from "@angular/core";

const locales: Record<string, any> = {
    en: EN_locale,
    sl: SL_locale,
    hr: HR_locale,
};

export const routing = {
    locales: ['en', 'sl', "hr"],
}

export function useTranslation(mainKey: string, language: string | Signal<string>) {

    return (key: string): string => {
        const getLocaleCode = typeof language === "function"
            ? (language as Signal<string>)
            : (() => language as string);

        const localeCode = getLocaleCode();
        const translations = locales[localeCode] ?? locales['en'];
        return translations[mainKey][key];
    }
}