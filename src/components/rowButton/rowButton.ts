import { Component, inject, Input } from '@angular/core';
import { Button } from '../button/button.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-row-button',
    imports: [Button],
    templateUrl: './rowButton.html',
})
export class RowButton {
    private http = inject(HttpClient);


    @Input() clientId!: string;
    @Input() value!: string;
    @Input() name!: string;
    @Input() text!: string;
    @Input() iconName!: string;

    buttonIcons = {
        archive: "ArchiveIcon",
        hire: "WorkIcon",
        reject: "CancelIcon",
        fire: "LogoutIcon"
    };

    handleFormAction(event: Event): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const bodyReq = {
            formData: formData,
        }

        this.http.post(`api/sendEmail}`, bodyReq).subscribe({
            next: (res) => {
                console.log("sendEmail", res);
                this.actionResponse.set(res);
            },
            error: (error) => {
                this.actionResponse.set(error);
            },
        });
        // this.onClick.emit();
    }
}
