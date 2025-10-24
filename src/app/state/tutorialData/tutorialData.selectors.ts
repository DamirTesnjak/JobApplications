import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITutorialData } from "./tutorialData.state";

export const selectTaskState = createFeatureSelector<ITutorialData>('tutorialData');

// 2) Basic selectors on the slice:
export const selectHrUser = createSelector(
    selectTaskState,
    (state: ITutorialData) => state
);