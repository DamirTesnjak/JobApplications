import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MessageDisplay } from '../../../../components/message-display/message-display';
import { TableComponent } from '../../../../components/table/table';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { emailTemplatesColumnDef } from './emailTemplatesTableDataProps';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-create-candidate-page',
    imports: [MessageDisplay, TableComponent],
    templateUrl: './overviewEmailTemplateMessagesPage.html',
    styleUrl: '../../../../styles/global/globals.module.scss'
})
export class OverviewEmailTemplateMessagesPage {
    private http = inject(HttpClient);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("emailTemplatePage", this.localeService.getLocale());
    tableColumnsDef = emailTemplatesColumnDef;

    columnsToDisplay = [
        "emailType", "button1", "button2"
    ];

    signal = signal({});
    results = this.signal() as any;

    ngOnInit() {
        const locale = this.localeService.getLocale()

        this.http.post("api/getEmailTemplates", {
            locale: locale()
        }).subscribe({
            next: (res) => {
                console.log("getEmailTemplates", res);
                this.signal.set(res);

            },
            error: (error) => {
                this.signal.set(error);
            },
        });
    }
}
