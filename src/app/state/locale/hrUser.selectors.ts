import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IInitialStateLocale } from "./locale.state";

export const selectTaskState = createFeatureSelector<IInitialStateLocale>('hrUser');

// 2) Basic selectors on the slice:
export const selectHrUser = createSelector(
    selectTaskState,
    (state: IInitialStateLocale) => state
);