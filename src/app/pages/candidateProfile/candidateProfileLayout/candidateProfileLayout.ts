import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { PAGES } from '../../../../locales/constants';
import { Button } from '../../../../components/button/button.component';
import { DeleteProfileButton } from '../../../../components/delete-profile-button/delete-profile-button';
import { getFile, IFile } from '../../../../utils/getFile/getFile';
import { HttpClient } from '@angular/common/http';
import { DATABASES } from '../../../../constants/constants';
import { updateCandidate } from '../../../state/candidate/candidate.actions';
import { Store } from '@ngrx/store';
import { IIinitialStateCandidate } from '../../../state/candidate/candidate.state';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';
import { ENV } from '../../../../environments/env.generated';


interface IResponse {
    successMessage: string;
    errorMessage?: string;
    data: IIinitialStateCandidate;
    success?: boolean;
}

@Component({
    selector: 'app-candidate-profile-layout',
    imports: [RouterOutlet, RouterLink, Button, DeleteProfileButton],
    templateUrl: './candidateProfileLayout.html',
    styleUrl: '../../../../styles/global/globals.module.scss'
})
export class CandidateProfileLayout {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation(PAGES.candidatesProfile, this.localeService.getLocale());

    profileData = signal<any>({});
    id!: string;
    DATABASES = DATABASES;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;

        const locale = this.localeService.getLocale()
        const bodyReq = {
            id: this.id,
            locale: locale()
        }

        this.http.post(`${ENV.APP_SERVER}/api/getCandidateProfile`, bodyReq, { observe: 'response' }).subscribe({
            next: (res) => {
                const response = res.body as IResponse;
                this.profileData.set(response.data);
                console.log("PROFILE DATA", this.profileData());
                this.store.dispatch(updateCandidate({ candidate: response.data }));
            },
            error: (error) => {
                this.profileData.set(error);
            },
        });
    }

    getPicture(file: IFile) {
        if (!file) {
            return '';
        }
        return getFile(file);
    }
}
