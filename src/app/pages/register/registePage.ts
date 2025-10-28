import { Component, effect, inject, signal } from '@angular/core';
import { useTranslation } from '../../../utils/translation/useTranslation';
import { Button } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../../../components/snackBar.service';
import { snackbarProps } from '../../../components/globalConstant';

@Component({
    selector: 'app-register-page',
    imports: [Button, InputComponent],
    templateUrl: './registerPage.html',
})

export class RegisterPage {
    private http = inject(HttpClient);
    private snackBarService = inject(SnackBarService);

    translation = useTranslation("en", "register");
    signal = signal<any>({});
    response = this.signal() as any;
    snackbarProps = snackbarProps;

    inputFields = [
        { name: 'name', type: 'text', label: this.translation('name') },
        { name: 'surname', type: 'text', label: this.translation('surname') },
        {
            name: 'companyName',
            type: 'text',
            label: this.translation('company'),
        },
        {
            name: 'phoneNumber',
            type: 'text',
            label: this.translation('phoneNumber'),
        },
        { name: 'email', type: 'email', label: this.translation('email') },
        { name: 'username', type: 'text', label: this.translation('username') },
        {
            name: 'password',
            type: 'password',
            label: this.translation('password'),
        },
    ];

    handleFormAction(event: Event): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const bodyReq = {
            formData: formData,
        }

        this.http.post("api/createHrUser", bodyReq).subscribe({
            next: (res) => {
                console.log("createHrUser", res);
                this.signal.set(res);
                this.snackBarService.openSnackBar({
                    ...this.snackbarProps,
                    message: this.translation("hrUserCreated"),
                    type: 'success',
                });
            },
            error: (err) => {
                this.signal.set(err);
                this.snackBarService.openSnackBar({ ...this.snackbarProps, message: this.translation("hrUserCreatedError"), type: 'error' })
            },

        });
        // this.onClick.emit();
    }
}
