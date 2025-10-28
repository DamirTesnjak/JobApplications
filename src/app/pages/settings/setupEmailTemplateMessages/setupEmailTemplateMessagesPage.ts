import { Component } from '@angular/core';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { TextEditor } from '../../../../components/text-editor/text-editor';


@Component({
    selector: 'app-setup-email-template-messages-page',
    imports: [TextEditor],
    templateUrl: './setupEmailTemplateMessagesPage.html',
})
export class SetupEmailTemplateMessagesPage {
    translation = useTranslation("en", "setupEmailTemplateMessages");
}
