import { Component, Input, signal } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
import { candidateCongratulationEmailJobPosition } from '../../utils/emailMessagesTemplates/messageCandidateSelected';
import { candidateRejectionEmailJobPosition } from '../../utils/emailMessagesTemplates/messageCandidateRejected';
import { candidateEmailFiredFromJobPosition } from '../../utils/emailMessagesTemplates/messageEmployeeGotFired';
import { IData } from './type';
import addHTMLTags from '../../utils/addHTMLTags/addHTMLTags';
import { EDIT_TEXT_BUTTON } from '../../constants/constants';
import { InputComponent } from '../input/input';
import { Button } from "../button/button.component";

@Component({
    selector: 'app-text-editor',
    imports: [InputComponent, Button],
    templateUrl: './text-editor.html',
})
export class TextEditor {
    @Input() data: IData = {
        emailText: "",
        emailType: "",
    };

    translation = useTranslation("en", "textEditor");

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

    handleChangeOnSelectEmailTemplate(event: SelectChangeEvent) {
        const previewElement = document.getElementById('preview');
        if (previewElement) {
            previewElement.innerHTML = this.preDefinedEmailTemplates[event.target.value];
            setEmailTemplate({
                manualEditing: false,
                selectedCategory: event.target.value,
            });
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
}
