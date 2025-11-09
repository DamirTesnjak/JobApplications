import { Component, EnvironmentInjector, inject } from '@angular/core';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { TextEditor } from '../../../../components/text-editor/text-editor';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';


@Component({
    selector: 'app-setup-email-template-messages-page',
    imports: [TextEditor],
    templateUrl: './setupEmailTemplateMessagesPage.html',
    styleUrl: '../../../../styles/global/globals.module.scss'
})
export class SetupEmailTemplateMessagesPage {
    injector = inject(EnvironmentInjector);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("setupEmailTemplateMessages", this.localeService.getLocale());
}
