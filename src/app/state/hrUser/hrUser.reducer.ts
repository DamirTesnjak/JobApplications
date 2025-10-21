import { createReducer, on } from "@ngrx/store";
import updateWholeObjectInState from "../../../utils/methods/updateWholeObjectInState";
import * as Actions from './hrUser.actions';

export const initialStateHrUser = {
    id: '',
    profilePicture: {
        file: {
            name: '',
            data: '',
            contentType: '',
        },
    },
    name: '',
    surname: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    username: '',
};

export const hrUserReducer = createReducer(
    initialStateHrUser,
    on(Actions.updateHrUser, (state, payload) => updateWholeObjectInState(state, payload.hrUser))
)