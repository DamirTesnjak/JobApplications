import { Component, effect, EnvironmentInjector, inject, signal } from '@angular/core';
import { useTranslation } from '../../../utils/translation/useTranslation';
import { Button } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { updateHrUser } from '../../state/hrUser/hrUser.actions';
import { Router } from '@angular/router';
import { IHrUserSchema } from '../../../utils/dbConfig/models/hrUserModel';
import { DetectLocaleChangeService } from '../../../utils/translation/detectLocaleChange.service';
import { ENV } from '../../../environments/env.generated';

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
    styleUrl: '../../../styles/global/globals.module.scss'

})

export class LoginPage {
    private http = inject(HttpClient);
    private store = inject(Store);
    private router = inject(Router);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("login", this.localeService.getLocale());
    signal = signal<any>({});
    response = this.signal() as any;

    inputFields = [
        { name: "username", type: "text", label: "username" },
        { name: "password", type: "password", label: "password" },
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
        const locale = this.localeService.getLocale()
        this.http.post(`${ENV.APP_SERVER}/api/getHrUserProfile`, {
            locale: locale()
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
            locale: this.localeService.getLocale()
        }

        this.http.post(`${ENV.APP_SERVER}/api/loginHrUser`, bodyReq).subscribe({
            next: (res) => {
                console.log("loginHrUser", res);
                this.signal.set(res);
            },
            error: (error) => {
                this.signal.set(error);
            },
        });
    }
}
