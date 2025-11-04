import { Component, inject, signal } from '@angular/core';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { SelectInput } from '../../../../components/select-input/selectInput';
import { Button } from "../../../../components/button/button.component";
import { HttpClient } from '@angular/common/http';
import { stateSelector } from '../../../../utils/stateSelector/stateSelector';
import { ITutorialData } from '../../../state/tutorialData/tutorialData.state';
import { Store } from '@ngrx/store';
import { SnackBarService } from '../../../../components/snackBar.service';
import { snackbarProps } from '../../../../components/globalConstant';
import { IEmailTemplateSchema } from '../../../../utils/dbConfig/models/emailTemplateModel';

interface IResponseEmailTemplates {
    successMessage: string;
    errorMessage?: string;
    emailTemplates: IEmailTemplateSchema[];
    success?: boolean;
}

interface IResponseMapEmailTemplates {
    successMessage: string;
    errorMessage?: string;
    success?: boolean;
    error?: boolean;

}

interface IEmailTemplate {
    emailType: string;
    emailText: string;
}

@Component({
    selector: 'app-map-template-nessages-page',
    imports: [SelectInput, Button],
    templateUrl: './mapTemplateMessagesPage.html',
})
export class MapTemplateMessagesPage {
    private http = inject(HttpClient);
    private readonly store = inject(Store);
    private snackBarService = inject(SnackBarService);

    snackbarProps = snackbarProps;

    translation = useTranslation("mapTemplateMessages");

    signalEmailTemplates = signal<IEmailTemplateSchema[]>([]);
    stateEmailTemplates = this.signalEmailTemplates() as IEmailTemplate[];
    emailTemplates = this.stateEmailTemplates;

    signalTutorial = stateSelector("tutorialData", this.store);
    stateTutorialRunning = this.signalTutorial() as ITutorialData;
    tutorialRunning = this.stateTutorialRunning.tutorialRunning;

    selectDropdownEmailList =
        this.emailTemplates?.map((emailTemplate) => ({
            id: emailTemplate.emailType,
            text: emailTemplate.emailType,
            value: emailTemplate.emailType,
        })) || [];

    ngOnInit() {
        this.http.post("api/getEmailTemplates", {}, { observe: 'response' }).subscribe({
            next: (res) => {
                console.log("getEmailTemplates", res);
                const response = res.body as IResponseEmailTemplates;
                this.signalEmailTemplates.set(response.emailTemplates);

            },
            error: (error) => {
                this.signalEmailTemplates.set(error);
            },
        });
    }

    handleFormAction(event: Event) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const bodyReq = {
            formData: formData,
        }

        this.http.post('api/mapEmailTemplates', bodyReq, { observe: 'response' }).subscribe({
            next: (res) => {
                console.log('resMapEmailTemplates', res);
                const response = res.body as IResponseMapEmailTemplates;
                this.snackBarService.openSnackBar({
                    ...this.snackbarProps,
                    message: response.successMessage,
                    type: 'success',
                });
            },
            error: (err) => this.snackBarService.openSnackBar({ ...this.snackbarProps, message: err.errorMessage, type: 'error' }),
        });
        //this.onClick.emit();
    }
}
