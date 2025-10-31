import EN_locale from "../../locales/en.json";
import SL_locale from "../../locales/sl.json";
import HR_locale from "../../locales/hr.json";
import { stateSelector } from "../stateSelector/stateSelector";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";

const locales: Record<string, any> = {
    en: EN_locale,
    sl: SL_locale,
    hr: HR_locale,
};

export const routing = {
    locales: ['en', 'sl', "hr"],
}

export function useTranslation(mainKey: string) {
    const store = inject(Store);
    const signal = stateSelector("locale", store);
    const state = signal() as any;
    const lang = state.locale;

    const locale = lang || locales['en'];
    return (key: string): string => {
        const translations = locale[mainKey];
        return translations[key];
    }
}