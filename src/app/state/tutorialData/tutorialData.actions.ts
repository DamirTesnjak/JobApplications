import { createAction, props } from "@ngrx/store";
import { ITutorialData } from "./tutorialData.state";

export const updateTutorialData = createAction('[Tutorial Data] Update Tutorial Data', props<{ tutorialData: ITutorialData }>());