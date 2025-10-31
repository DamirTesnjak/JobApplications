import { createReducer, on } from "@ngrx/store";
import updateWholeObjectInState from "../../../utils/methods/updateWholeObjectInState";
import * as Actions from './locale.actions';

export const initialStateLocale = {
    locale: "en"
};

export const localeReducer = createReducer(
    initialStateLocale,
    on(Actions.updateLocale, (state, payload) => updateWholeObjectInState(state, payload.locale))
)