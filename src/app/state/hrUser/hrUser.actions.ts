import { createAction, props } from "@ngrx/store";
import { IInitialStateHrUser } from "./hrUser.state";

export const updateHrUser = createAction('[HR profile] Update HR profile', props<{ hrUser: IInitialStateHrUser }>());
