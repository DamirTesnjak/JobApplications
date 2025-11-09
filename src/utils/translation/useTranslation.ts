import EN_locale from "../../locales/en.json";
import SL_locale from "../../locales/sl.json";
import HR_locale from "../../locales/hr.json";
import { Injector, Signal } from "@angular/core";
import { provideStore, Store } from "@ngrx/store";

const locales: Record<string, any> = {
    en: EN_locale,
    sl: SL_locale,
    hr: HR_locale,
};

export const routing = {
    locales: ['en', 'sl', "hr"],
}

const injector = Injector.create({
    providers: [
        { provide: Store, useValue: provideStore() }
    ]
});

export function useTranslation(mainKey: string, language: Signal<string>) {

    return (key: string): string => {
        const localeCode = language();
        const translations = locales[localeCode] ?? locales['en'];
        return translations[mainKey][key];
    }
}