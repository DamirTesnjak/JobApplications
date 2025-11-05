import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IInitialStateLocale } from "./locale.state";

export const selectTaskState = createFeatureSelector<IInitialStateLocale>('locale');

export const selectLocale = createSelector(
    selectTaskState,
    (state: IInitialStateLocale) => state
);