import { Component, EnvironmentInjector, inject } from '@angular/core';
import { useTranslation } from '../../../utils/translation/useTranslation';

@Component({
    selector: 'app-settings-page',
    imports: [],
    templateUrl: './settingsPage.html',
})
export class SettingsPage {
    injector = inject(EnvironmentInjector);
    translation = useTranslation("settings", this.injector);
}
