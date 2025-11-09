import { Component, EnvironmentInjector, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
import { candidateCongratulationEmailJobPosition } from '../../utils/emailMessagesTemplates/messageCandidateSelected';
import { candidateRejectionEmailJobPosition } from '../../utils/emailMessagesTemplates/messageCandidateRejected';
import { candidateEmailFiredFromJobPosition } from '../../utils/emailMessagesTemplates/messageEmployeeGotFired';
import { IData } from './type';
import addHTMLTags from '../../utils/addHTMLTags/addHTMLTags';
import { EDIT_TEXT_BUTTON } from '../../constants/constants';
import { InputComponent } from '../input/input';
import { Button } from "../button/button.component";
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../snackBar.service';
import { snackbarProps } from '../globalConstant';
import { SelectInput } from '../select-input/selectInput';
import { IFormDataObject } from '../../utils/formValidation/getFormDataObject';
import { DetectLocaleChangeService } from '../../utils/translation/detectLocaleChange.service';

interface IResponse {
    successMessage: string;
    errorMessage?: string;
    success?: boolean;
    prevState?: IFormDataObject;
}

@Component({
    selector: 'app-text-editor',
    imports: [InputComponent, Button, SelectInput],
    templateUrl: './text-editor.html',
    styleUrl: './text-editor.scss'
})
export class TextEditor {
    private snackBarService = inject(SnackBarService);
    private localeService = inject(DetectLocaleChangeService);

    @Input() data: IData = {
        emailText: "",
        emailType: "",
    };
    @Output() onClick = new EventEmitter<void>();

    constructor(private http: HttpClient) { }

    snackbarProps = snackbarProps;
    injector = inject(EnvironmentInjector);
    translation = useTranslation("textEditor", this.localeService.getLocale());

    textAreaText = signal({
        manualEditing: false,
        text: this.data?.emailText || candidateCongratulationEmailJobPosition,
    })

    selectDropdownEmailList = [
        { id: 'candidateHired', text: this.translation('hire'), value: "candidateHired" },
        { id: 'candidateRejected', text: this.translation('reject'), value: "candidateRejected" },
        { id: 'employeeFired', text: this.translation('fire'), value: "employeeFired" },
    ];

    preDefinedEmailTemplates: {
        [x: string]: string;
        candidateHired: string;
        candidateRejected: string;
        employeeFired: string;
    } = {
            candidateHired: candidateCongratulationEmailJobPosition,
            candidateRejected: candidateRejectionEmailJobPosition,
            employeeFired: candidateEmailFiredFromJobPosition,
        }

    handleChangeOnSelectEmailTemplate(event: any) {
        const previewElement = document.getElementById('preview');
        if (previewElement) {
            previewElement.innerHTML = this.preDefinedEmailTemplates[event.target.value];
            this.textAreaText.set({
                manualEditing: false,
                text: this.preDefinedEmailTemplates[event.target.value],
            });
        }
    };

    changeWhenTyping() {
        const editorElement = document.getElementById(
            'editor',
        )! as HTMLInputElement;
        const previewElement = document.getElementById('preview')!;
        previewElement.innerHTML = editorElement.value;
        this.textAreaText.set({
            manualEditing: true,
            text: editorElement.value,
        });
    };

    onButtonTextEditorClick(button: string) {
        const editTextButtonsKeys = Object.keys(EDIT_TEXT_BUTTON);

        for (const key of editTextButtonsKeys) {
            if (button === key) {
                const textAreaElementWithChangedInnerHTMl = addHTMLTags({
                    startTag: EDIT_TEXT_BUTTON[button].startTag,
                    endTag: EDIT_TEXT_BUTTON[button].endTag,
                    textAreaElementId: 'editor',
                });
                const previewElement = document.getElementById('preview')!;
                previewElement.innerHTML = textAreaElementWithChangedInnerHTMl.value;
                this.textAreaText.set({
                    manualEditing: true,
                    text: textAreaElementWithChangedInnerHTMl.value,
                });
            }
        }
    };

    handleFormAction(event: Event) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const bodyReq = {
            formData: formData,
            injector: this.injector
        }

        this.http.post('api/createEmailTemplate', bodyReq, { observe: 'response' }).subscribe({
            next: (res) => {
                console.log('resCreateEmailTemplate', res);
                const response = res.body as IResponse;
                this.snackBarService.openSnackBar({
                    ...this.snackbarProps,
                    message: response.successMessage,
                    type: 'success',
                });
            },
            error: (err) => this.snackBarService.openSnackBar({ ...this.snackbarProps, message: err.errorMessage, type: 'error' }),
        });
        this.onClick.emit();
    }
}
