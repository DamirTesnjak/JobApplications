import { Component, EnvironmentInjector, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useTranslation } from '../../../../utils/translation/useTranslation';

@Component({
    selector: 'app-loging-page-layout',
    imports: [RouterOutlet],
    templateUrl: './loginPageLayout.html',
})
export class LoginPageLayout {
    injector = inject(EnvironmentInjector);
    translation = useTranslation("login", this.injector);
}
