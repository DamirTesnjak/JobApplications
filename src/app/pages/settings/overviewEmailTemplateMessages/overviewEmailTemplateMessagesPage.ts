import { HttpClient } from '@angular/common/http';
import { Component, EnvironmentInjector, inject, signal } from '@angular/core';
import { MessageDisplay } from '../../../../components/message-display/message-display';
import { TableComponent } from '../../../../components/table/table';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { emailTemplatesColumnDef } from './emailTemplatesTableDataProps';

@Component({
    selector: 'app-create-candidate-page',
    imports: [MessageDisplay, TableComponent],
    templateUrl: './overviewEmailTemplateMessagesPage.html',
})
export class OverviewEmailTemplateMessagesPage {
    private http = inject(HttpClient);

    injector = inject(EnvironmentInjector);
    translation = useTranslation("emailTemplatePage", this.injector);
    tableColumnsDef = emailTemplatesColumnDef;

    columnsToDisplay = [
        "emailType", "button1", "button2"
    ];

    signal = signal({});
    results = this.signal() as any;

    ngOnInit() {
        this.http.post("api/getEmailTemplates", {
            injector: this.injector
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
