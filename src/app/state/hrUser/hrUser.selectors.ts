import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IInitialStateHrUser } from "./hrUser.state";

export const selectTaskState = createFeatureSelector<IInitialStateHrUser>('hrUser');

// 2) Basic selectors on the slice:
export const selectHrUser = createSelector(
    selectTaskState,
    (state: IInitialStateHrUser) => state
);