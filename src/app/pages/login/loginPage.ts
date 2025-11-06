import { Component, effect, EnvironmentInjector, inject, signal } from '@angular/core';
import { useTranslation } from '../../../utils/translation/useTranslation';
import { Button } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { updateHrUser } from '../../state/hrUser/hrUser.actions';
import { Router } from '@angular/router';
import { IHrUserSchema } from '../../../utils/dbConfig/models/hrUserModel';

interface IResponse {
    successMessage?: string;
    errorMessage?: string;
    data?: IHrUserSchema;
    success?: boolean;
}

@Component({
    selector: 'app-loging-page',
    imports: [Button, InputComponent],
    templateUrl: './loginPage.html',
})

export class LoginPage {
    private http = inject(HttpClient);
    private store = inject(Store);
    private router = inject(Router);

    injector = inject(EnvironmentInjector);
    translation = useTranslation("login", this.injector);
    signal = signal<any>({});
    response = this.signal() as any;

    inputFields = [
        { name: "username", type: "text", label: this.translation("username") },
        { name: "password", type: "password", label: this.translation("password") },
    ];

    constructor() {
        effect(() => {
            const res = this.response;
            if (res && res.success) {
                this.getHrUserProfileData();
            }
        });
    }

    getHrUserProfileData() {
        let result: IResponse = {};
        this.http.post("api/getHrUserProfile", {
            injector: this.injector
        }).subscribe({
            next: (res) => {
                console.log("getHrUserProfile", res);
                result = res
            },
            error: (error) => {
                result = error
            },
        });

        if (result.data) {
            this.store.dispatch(updateHrUser({ hrUser: result.data }))
            this.router.navigate(["/candidates"]);
        }
    };

    handleFormAction(event: Event): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const bodyReq = {
            formData: formData,
            injector: this.injector
        }

        this.http.post("api/loginHrUser", bodyReq).subscribe({
            next: (res) => {
                console.log("loginHrUser", res);
                this.signal.set(res);
            },
            error: (error) => {
                this.signal.set(error);
            },
        });
        // this.onClick.emit();
    }
}
