import { Component, EnvironmentInjector, inject, signal } from '@angular/core';
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
    injector = inject(EnvironmentInjector);

    translation = useTranslation(PAGES.candidatesProfile, this.injector);

    actionResponse = signal<any>({});
    data = this.actionResponse().data;
    id!: string;
    DATABASES = DATABASES;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;

        const bodyReq = {
            id: this.id,
            injector: this.injector
        }

        this.http.post("api/getCandidateProfile", bodyReq, { observe: 'response' }).subscribe({
            next: (res) => {
                console.log("getCandidateProfile", res);
                const response = res.body as IResponse;
                this.actionResponse.set(response);
                this.store.dispatch(updateCandidate({ candidate: response.data }))

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
