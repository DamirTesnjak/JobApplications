import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Button } from "../button/button.component";

@Component({
    selector: 'app-input-field-upload',
    imports: [MatIconModule, Button],
    templateUrl: './input-field-upload.html',
    styleUrl: './input-field-upload.scss'
})
export class InputFieldUpload {
    @Input() text: string = "";
    @Input() className: string = "";
}

