import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputProps } from './type';

@Component({
    selector: 'app-input',
    imports: [MatIconModule],
    templateUrl: './input.html',
    styleUrl: './input.module.scss'
})
export class InputComponent {
    @Input() label: InputProps["label"] | null = null;
    @Input() name: InputProps["name"] = "";
    @Input() className: InputProps["className"] = "standard";
    @Input() flow: InputProps["flow"] = "flowRow";
    @Input() role: InputProps["role"] | null = null;
    @Input() type: InputProps["type"] = "text";
    @Input() value: InputProps["value"] | null = null;
    @Input() defaultValue: InputProps["defaultValue"] | null = null;
    @Input() readOnly: InputProps["readOnly"] = false;
    @Input() required: InputProps["required"] = false;
    @Input() checked: InputProps["checked"] = false;
    @Input() errorMessage: InputProps["errorMessage"] = null;

    @Output() change = new EventEmitter<Event>();

    CLASS_NAME = {
        input: 'input',
        standard: 'standard',
        full: 'full',
        outline: 'outlined',
        inputButton: 'inputButton',
        flowColumn: 'flowColumn',
        flowRow: 'flowRow',
        uploadButton: 'uploadButton',
        checkbox: 'checkbox',
        label: 'label',
    }
}
