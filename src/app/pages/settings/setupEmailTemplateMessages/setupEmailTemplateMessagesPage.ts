import { Component, EnvironmentInjector, inject } from '@angular/core';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { TextEditor } from '../../../../components/text-editor/text-editor';


@Component({
    selector: 'app-setup-email-template-messages-page',
    imports: [TextEditor],
    templateUrl: './setupEmailTemplateMessagesPage.html',
})
export class SetupEmailTemplateMessagesPage {
    injector = inject(EnvironmentInjector);
    translation = useTranslation("setupEmailTemplateMessages", this.injector);
}
