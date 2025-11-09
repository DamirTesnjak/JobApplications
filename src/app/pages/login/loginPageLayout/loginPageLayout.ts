import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-loging-page-layout',
    imports: [RouterOutlet],
    templateUrl: './loginPageLayout.html',
    styleUrl: '../../../../styles/global/globals.module.scss'
})
export class LoginPageLayout {
    private localeService = inject(DetectLocaleChangeService);
    translation = useTranslation("login", this.localeService.languageString);
}
