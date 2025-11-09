import { effect, inject, Injectable, signal } from '@angular/core';
import { stateSelector } from '../stateSelector/stateSelector';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })

export class DetectLocaleChangeService {
    private readonly store = inject(Store);

    localeState = stateSelector("locale", this.store);
    language = signal<string>("en");

    localeEffect = effect(() => {
        const locale = this.localeState() as { locale: string };
        this.language.set(locale.locale ?? 'en');
    });

    getLocale() {
        return this.language;
    }
}