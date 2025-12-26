import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { PAGES } from '../../../../locales/constants';
import { Button } from '../../../../components/button/button.component';
import { DeleteProfileButton } from '../../../../components/delete-profile-button/delete-profile-button';
import { getFile, IFile } from '../../../../utils/getFile/getFile';
import { HttpClient } from '@angular/common/http';
import { DATABASES } from '../../../../constants/constants';
import { Store } from '@ngrx/store';
import { LogoutButton } from '../../../../components/header/logout-button/logout-button';
import { updateHrUser } from '../../../state/hrUser/hrUser.actions';
import { IInitialStateHrUser } from '../../../state/hrUser/hrUser.state';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';
import { ENV } from '../../../../environments/env.generated';

interface IResponse {
    successMessage: string;
    errorMessage?: string;
    data: IInitialStateHrUser;
    success?: boolean;
}

@Component({
    selector: 'app-hruser-profile-layout',
    imports: [RouterOutlet, RouterLink, Button, DeleteProfileButton, LogoutButton],
    templateUrl: './hrUserProfileLayout.html',
    styleUrl: './hrUserProfileLayout.scss'
})
export class HrUserProfileLayout {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation(PAGES.candidatesProfile, this.localeService.getLocale());

    actionResponse = signal<any>({});
    data = this.actionResponse().data;
    id!: string;
    DATABASES = DATABASES;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;

        const locale = this.localeService.getLocale()
        const bodyReq = {
            id: this.id,
            locale: locale()
        }

        this.http.post(`${ENV.APP_SERVER}/api/getHrUserProfile`, bodyReq, { observe: 'response' }).subscribe({
            next: (res) => {
                console.log("getHrUserProfile", res);
                const response = res.body as IResponse;
                this.actionResponse.set(response);
                this.store.dispatch(updateHrUser({ hrUser: response.data }))
            },
            error: (error) => {
                this.actionResponse.set(error);
            },
        });
    }

    getPicture(file: IFile) {
        return getFile(file);
    }
}
