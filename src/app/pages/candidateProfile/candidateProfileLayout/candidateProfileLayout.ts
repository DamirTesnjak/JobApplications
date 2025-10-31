import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { PAGES } from '../../../../locales/constants';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { Button } from '../../../../components/button/button.component';
import { DeleteProfileButton } from '../../../../components/delete-profile-button/delete-profile-button';
import { getFile, IFile } from '../../../../utils/getFile/getFile';
import { HttpClient } from '@angular/common/http';
import { DATABASES } from '../../../../constants/constants';
import { updateCandidate } from '../../../state/candidate/candidate.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-candidate-profile-layout',
    imports: [RouterOutlet, RouterLink, Button, DeleteProfileButton],
    templateUrl: './candidateProfileLayout.html',
    styleUrl: './candidateProfileLayout.scss'
})
export class CandidateProfileLayout {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);

    translation = useTranslation(PAGES.candidatesProfile);

    actionResponse = signal<any>({});
    data = this.actionResponse().data;
    id!: string;
    DATABASES = DATABASES;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;

        const bodyReq = {
            id: this.id,
        }

        this.http.post("api/getCandidateProfile", bodyReq).subscribe({
            next: (res) => {
                console.log("getCandidateProfile", res);
                this.actionResponse.set(res);
                this.store.dispatch(updateCandidate({ candidate: res.data }))

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
