import { Component, inject } from '@angular/core';
import { IIinitialStateCandidate } from '../../../state/candidate/candidate.state';
import { STORE_REDUCER_NAME } from '../../../../constants/constants';
import { EditForm } from '../../../../components/edit-form/edit-form';
import { ActivatedRoute } from '@angular/router';
import { stateSelector } from '../../../../utils/stateSelector/stateSelector';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-edit-candidate-page',
    imports: [EditForm],
    templateUrl: './editCandidatePage.html',
    styleUrl: '../../../../styles/global/globals.module.scss'
})
export class EditCandidatePage {
    private route = inject(ActivatedRoute);
    private store = inject(Store);

    STORE_REDUCER_NAME = STORE_REDUCER_NAME;

    id!: string;
    signal = stateSelector("candidate", this.store);
    state = this.signal() as IIinitialStateCandidate;

    initialStateCandidate!: IIinitialStateCandidate;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.initialStateCandidate = this.state;
    }
}
