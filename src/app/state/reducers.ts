import { createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import updateWholeObjectInState from '../../utils/methods/updateWholeObjectInState';

export const initialStateCompanyEmailConfigs = {
    id: '',
    emailHost: '',
    port: '',
    email: '',
    username: '',
    companyName: '',
    password: '',
};

export const companyEmailConfigsReducer = createReducer(
    initialStateCompanyEmailConfigs,
    on(Actions.updateCompanyEmailConfigs, (state, payload) => updateWholeObjectInState(state, payload.emailConfigs))
)