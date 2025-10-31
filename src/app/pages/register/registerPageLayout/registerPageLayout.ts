import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useTranslation } from '../../../../utils/translation/useTranslation';

@Component({
    selector: 'app-loging-page-layout',
    imports: [RouterOutlet],
    templateUrl: './registerPageLayout.html',
})
export class RegisterPageLayout {
    translation = useTranslation("register");
}
