import { createAction, props } from "@ngrx/store";
import { IInitialStateLocale } from "./locale.state";

export const updateLocale = createAction('[locale] Update localization', props<{ locale: IInitialStateLocale }>());
