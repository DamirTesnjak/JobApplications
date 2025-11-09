import { Component, inject } from '@angular/core';
import { useTranslation } from '../../../utils/translation/useTranslation';
import { DetectLocaleChangeService } from '../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-settings-page',
    imports: [],
    templateUrl: './settingsPage.html',
    styleUrl: '../../../styles/global/globals.module.scss'
})
export class SettingsPage {
    private localeService = inject(DetectLocaleChangeService);
    translation = useTranslation("settings", this.localeService.languageString);
}
