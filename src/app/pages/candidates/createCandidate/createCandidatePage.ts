import { Component } from '@angular/core';
import { initialStateCandidate } from '../../../state/candidate/candidate.reducer';
import { STORE_REDUCER_NAME } from '../../../../constants/constants';
import { EditForm } from '../../../../components/edit-form/edit-form';

@Component({
    selector: 'app-create-candidate-page',
    imports: [EditForm],
    templateUrl: './createCandidatePage.html',
})
export class CreateCandidatePage {
    STORE_REDUCER_NAME = STORE_REDUCER_NAME;
    initialStateCandidate = initialStateCandidate;
}
