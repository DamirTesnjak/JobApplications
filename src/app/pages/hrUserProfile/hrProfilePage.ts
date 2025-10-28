import { Component } from '@angular/core';
import { EditForm } from '../../../components/edit-form/edit-form';
import { IInitialStateHrUser } from '../../state/hrUser/hrUser.state';
import { STORE_REDUCER_NAME } from '../../../constants/constants';
import { initialStateHrUser } from '../../state/hrUser/hrUser.reducer';

@Component({
    selector: 'app-hr-profile-page',
    imports: [EditForm],
    templateUrl: './hrProfilePage.html',
})
export class HrProfilePage {
    initialStateHrUser: IInitialStateHrUser = initialStateHrUser;
    STORE_REDUCER_NAME = STORE_REDUCER_NAME;
}
