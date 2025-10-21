import { createReducer, on } from "@ngrx/store";
import updateWholeObjectInState from "../../../utils/methods/updateWholeObjectInState";
import * as Actions from './candidate.actions';

export const initialStateCandidate = {
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
    contact: {
        address: '',
        city: '',
        zipCode: '',
        country: '',
        email: '',
        phoneNumber: '',
        linkedIn: '',
    },
    curriculumVitae: {
        file: {
            name: '',
            data: '',
            contentType: '',
        },
    },
    status: {
        archived: false,
        employed: false,
        rejected: false,
        fired: false,
    },
};

export const candidateReducer = createReducer(
    initialStateCandidate,
    on(Actions.updateCandidate, (state, payload) => updateWholeObjectInState(state, payload.candidate))
)