import { Component } from '@angular/core';
import { useTranslation } from '../../../utils/translation/useTranslation';

@Component({
    selector: 'app-settings-page',
    imports: [],
    templateUrl: './settingsPage.html',
})
export class SettingsPage {
    translation = useTranslation("settings");
}
