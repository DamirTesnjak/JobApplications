import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-loging-page-layout',
    imports: [RouterOutlet],
    templateUrl: './registerPageLayout.html',
    styleUrl: '../../../../styles/global/globals.module.scss'

})
export class RegisterPageLayout {
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("register", this.localeService.getLocale());
}
