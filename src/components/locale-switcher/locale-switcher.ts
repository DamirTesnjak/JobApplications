import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { useTranslation, routing } from '../../utils/translation/useTranslation';
import { Button } from "../button/button.component";
import { Store } from '@ngrx/store';
import { stateSelector } from '../../utils/stateSelector/stateSelector';
import { updateLocale } from '../../app/state/locale/locale.actions';
import { DetectLocaleChangeService } from '../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-locale-switcher',
    imports: [MatIconModule, Button],
    templateUrl: './locale-switcher.html',
    styleUrl: './locale-switcher.scss'
})
export class LocaleSwitcher {
    private store = inject(Store);
    private localeService = inject(DetectLocaleChangeService);


    locales = routing.locales;

    localeSignal = stateSelector("locale", this.store);
    state = this.localeSignal() as any;

    defaultLocale = signal(this.state.locale);

    translation = useTranslation("localeSwitcher", this.localeService.getLocale());

    JSONParse(value: string) {
        return JSON.parse(value);
    }

    onSelectChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.defaultLocale.set(value)
        this.store.dispatch(updateLocale({
            locale: {
                locale: value
            }
        }))
    };
}
