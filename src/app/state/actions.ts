import { createAction, props } from '@ngrx/store';
import { ITutorialData } from './types';
import { IInitialStateCompanyEmailConfigs } from '../../utils/methods/flattenObject';

export const updateTutorialData = createAction('[Tutorial Data] Update Tutorial Data', props<{ tutorialData: ITutorialData }>());
export const updateCompanyEmailConfigs = createAction('[Company Email Configs] Update Company Email Configs', props<{ emailConfigs: IInitialStateCompanyEmailConfigs }>());