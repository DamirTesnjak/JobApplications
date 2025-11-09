import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PAGES } from '../../../../locales/constants';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { Button } from '../../../../components/button/button.component';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-candidate-layout',
    imports: [RouterOutlet, RouterLink, Button],
    templateUrl: './candidatesLayout.html',
    styleUrl: '../../../../styles/global/globals.module.scss'
})
export class CandidatesLayout {
    private localeService = inject(DetectLocaleChangeService);
    translation = useTranslation(PAGES.candidates, this.localeService.languageString);
}
