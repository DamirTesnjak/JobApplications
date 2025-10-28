import { Component, inject, signal } from '@angular/core';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { TextEditor } from '../../../../components/text-editor/text-editor';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-email-type-page',
    imports: [TextEditor],
    templateUrl: './emailTypePage.html',
})
export class EmailTypePage {
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);

    translation = useTranslation("en", "setupEmailTemplateMessages");

    actionResponse = signal<any>({});
    data = this.actionResponse().data;
    id!: string;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;

        const bodyReq = {
            id: this.id,
        }

        this.http.post("api/getEmailTemplate", bodyReq).subscribe({
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
