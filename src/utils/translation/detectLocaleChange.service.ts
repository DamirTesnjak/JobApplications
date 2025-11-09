import { effect, inject, Injectable, signal } from '@angular/core';
import { stateSelector } from '../stateSelector/stateSelector';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class DetectLocaleChangeService {
    private readonly store = inject(Store);

    localeState = stateSelector("locale", this.store);
    language = signal<string>("en");
    languageString = this.language() as string;

    localeEffect = effect(() => {
        const locale = this.localeState() as { locale: string };
        console.log('locale changed:', locale?.locale);
        this.language.set(locale.locale);
    });

    getLocale() {
        return this.languageString;
    }
}