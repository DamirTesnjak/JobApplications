import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PAGES } from '../../../../locales/constants';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { Button } from '../../../../components/button/button.component';
import { DeleteProfileButton } from '../../../../components/delete-profile-button/delete-profile-button';

@Component({
    selector: 'app-candidate-profile-layout',
    imports: [RouterOutlet, RouterLink, Button],
    templateUrl: './candidatesLayout.html',
})
export class CandidatesLayout {
    translation = useTranslation(PAGES.candidates);
}
