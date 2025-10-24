import { createAction, props } from '@ngrx/store';
import { IInitialStateCompanyEmailConfigs } from '../../utils/methods/flattenObject';

export const updateCompanyEmailConfigs = createAction('[Company Email Configs] Update Company Email Configs', props<{ emailConfigs: IInitialStateCompanyEmailConfigs }>());