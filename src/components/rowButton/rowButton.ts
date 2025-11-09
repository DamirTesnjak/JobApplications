import { Component, inject, Input } from '@angular/core';
import { Button } from '../button/button.component';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../snackBar.service';
import { snackbarProps } from '../globalConstant';
import { useTranslation } from '../../utils/translation/useTranslation';
import { DetectLocaleChangeService } from '../../utils/translation/detectLocaleChange.service';

interface IButtonIcons {
    [x: string]: "ArchiveIcon" | "WorkIcon" | "CancelIcon" | "LogoutIcon";
    archive: "ArchiveIcon",
    hire: "WorkIcon",
    reject: "CancelIcon",
    fire: "LogoutIcon"
}

@Component({
    selector: 'app-row-button',
    imports: [Button],
    templateUrl: './rowButton.html',
})
export class RowButton {
    private localeService = inject(DetectLocaleChangeService);
    translation = useTranslation("sendEmail", this.localeService.getLocale());

    private http = inject(HttpClient);
    private snackBarService = inject(SnackBarService);

    @Input() clientId!: string;
    @Input() value!: string;
    @Input() name!: string;
    @Input() text!: string;
    @Input() iconName!: string;

    snackbarProps = snackbarProps;

    buttonIcons: IButtonIcons = {
        archive: "ArchiveIcon",
        hire: "WorkIcon",
        reject: "CancelIcon",
        fire: "LogoutIcon"
    };

    handleFormAction(event: Event): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const locale = this.localeService.getLocale()

        const bodyReq = {
            formData: formData,
            locale: locale()
        }

        this.http.post(`api/sendEmail`, bodyReq).subscribe({
            next: (res) => {
                console.log("sendEmail", res);
                this.snackBarService.openSnackBar({
                    ...this.snackbarProps,
                    message: this.translation("emailSend"),
                    type: 'success',
                });
            },
            error: (err) => this.snackBarService.openSnackBar({ ...this.snackbarProps, message: this.translation("emailSendError"), type: 'error' }),
        });
        // this.onClick.emit();
    }
}
