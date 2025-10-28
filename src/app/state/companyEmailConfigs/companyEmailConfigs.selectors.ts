import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IInitialStateCompanyEmailConfigs } from "./copmanyEmailConfigs.state";

export const selectTaskState = createFeatureSelector<IInitialStateCompanyEmailConfigs>('candidate');

export const selectCompanyEmailConfigs = createSelector(selectTaskState, (state: IInitialStateCompanyEmailConfigs) => state);