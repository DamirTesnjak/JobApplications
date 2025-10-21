import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IIinitialStateCandidate } from "./candidate.state";

export const selectTaskState = createFeatureSelector<IIinitialStateCandidate>('candidate');

// 2) Basic selectors on the slice:
export const selectCandidate = createSelector(
    selectTaskState,
    (state: IIinitialStateCandidate) => state
);