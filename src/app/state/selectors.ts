import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IIinitialStateCandidate } from "./types";

export const selectCandidateState = createFeatureSelector<IIinitialStateCandidate>('tasks');
export const selectTodosLoading = createSelector(selectTodosState, (state) => state.loading);