import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MessageDisplay } from '../../../../components/message-display/message-display';
import { TableComponent } from '../../../../components/table/table';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { emailTemplatesColumnDef } from './emailTemplatesTableDataProps';

@Component({
    selector: 'app-create-candidate-page',
    imports: [MessageDisplay, TableComponent],
    templateUrl: './overviewEmailTemplateMessages.html',
})
export class CandidatesPage {
    private http = inject(HttpClient);

    translation = useTranslation("en", "emailTemplatePage");
    tableColumnsDef = emailTemplatesColumnDef;

    columnsToDisplay = [
        "emailType", "button1", "button2"
    ];

    signal = signal({});
    results = this.signal() as any;

    ngOnInit() {
        this.http.post("api/getEmailTemplates", {}).subscribe({
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
