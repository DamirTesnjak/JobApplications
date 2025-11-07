import { Component, EnvironmentInjector, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useTranslation } from '../../../../utils/translation/useTranslation';

@Component({
    selector: 'app-loging-page-layout',
    imports: [RouterOutlet],
    templateUrl: './registerPageLayout.html',
    styleUrl: '../../../../styles/global/globals.module.scss'

})
export class RegisterPageLayout {
    injector = inject(EnvironmentInjector);
    translation = useTranslation("register", this.injector);
}
