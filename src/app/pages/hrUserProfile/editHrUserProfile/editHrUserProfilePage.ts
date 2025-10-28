import { Component, inject } from '@angular/core';
import { STORE_REDUCER_NAME } from '../../../../constants/constants';
import { EditForm } from '../../../../components/edit-form/edit-form';
import { ActivatedRoute } from '@angular/router';
import { stateSelector } from '../../../../utils/stateSelector/stateSelector';
import { Store } from '@ngrx/store';
import { IInitialStateHrUser } from '../../../state/hrUser/hrUser.state';

@Component({
    selector: 'app-edit-hr-profile-page',
    imports: [EditForm],
    templateUrl: './editHrUserProfilePage.html',
})
export class EditHrUserProfilePage {
    private route = inject(ActivatedRoute);
    private store = inject(Store);

    STORE_REDUCER_NAME = STORE_REDUCER_NAME;

    id!: string;
    signal = stateSelector("hrUser", this.store);
    state = this.signal() as IInitialStateHrUser;

    initialStateHrUser!: IInitialStateHrUser;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.initialStateHrUser = this.state;
    }
}
