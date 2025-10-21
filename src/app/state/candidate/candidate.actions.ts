import { createAction, props } from "@ngrx/store";
import { IIinitialStateCandidate } from "./candidate.state";

export const updateCandidate = createAction('[Candidate profile] Update Candidate', props<{ candidate: IIinitialStateCandidate }>());