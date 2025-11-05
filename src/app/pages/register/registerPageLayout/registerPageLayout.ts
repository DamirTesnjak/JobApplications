import { Component, EnvironmentInjector, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useTranslation } from '../../../../utils/translation/useTranslation';

@Component({
    selector: 'app-loging-page-layout',
    imports: [RouterOutlet],
    templateUrl: './registerPageLayout.html',
})
export class RegisterPageLayout {
    injector = inject(EnvironmentInjector);
    translation = useTranslation("register", this.injector);
}
