import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { useTranslation, routing } from '../../utils/translation/useTranslation';
import { Button } from "../button/button.component";

@Component({
    selector: 'app-locale-switcher',
    imports: [MatIconModule, Button],
    templateUrl: './locale-switcher.html',
    styleUrl: './locale-switcher.scss'
})
export class LocaleSwitcher {
    locales = routing.locales;
    defaultLocale = signal("en");
    translation = useTranslation(this.defaultLocale(), "localeSwitcher");

    JSONParse(value: string) {
        return JSON.parse(value);
    }

    onSelectChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.defaultLocale.set(value)

    };
}
