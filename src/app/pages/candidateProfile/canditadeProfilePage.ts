import { Component } from '@angular/core';
import { EditForm } from '../../../components/edit-form/edit-form';
import { initialStateCandidate } from '../../state/candidate/candidate.reducer';
import { IIinitialStateCandidate } from '../../state/candidate/candidate.state';
import { STORE_REDUCER_NAME } from '../../../constants/constants';

@Component({
    selector: 'app-candidate-profile-page',
    imports: [EditForm],
    templateUrl: './candidateProfilePage.html',
})
export class CandidateProfilePage {
    initialStateCandidate: IIinitialStateCandidate = initialStateCandidate;
    STORE_REDUCER_NAME = STORE_REDUCER_NAME;
}
