import { Component, inject, signal } from '@angular/core';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { TextEditor } from '../../../../components/text-editor/text-editor';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';
import { ENV } from '../../../../environments/env.generated';


@Component({
    selector: 'app-email-type-page',
    imports: [TextEditor],
    templateUrl: './emailTypePage.html',
    styleUrl: '../../../../styles/global/globals.module.scss'
})
export class EmailTypePage {
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("setupEmailTemplateMessages", this.localeService.getLocale());

    actionResponse = signal<any>({});
    data = this.actionResponse().data;
    id!: string;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;

        const locale = this.localeService.getLocale()

        const bodyReq = {
            id: this.id,
            locale: locale()
        }

        this.http.post(`${ENV.APP_SERVER}/api/getEmailTemplate`, bodyReq).subscribe({
            next: (res) => {
                console.log("getEmailTemplate", res);
                this.actionResponse.set(res);
            },
            error: (error) => {
                this.actionResponse.set(error);
            },
        });
    }
}
