import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'select-input',
    templateUrl: 'selectInput.html',
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
})
export class SelectInput {
    @Input() label: string = "";
    @Input() options!: { value: any, text: string }[];
    @Input() placeholder: string = "";
    @Input() selectionChange: any;
}
