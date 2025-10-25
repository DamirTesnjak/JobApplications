import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore, provideState } from '@ngrx/store';
import { candidateReducer } from './state/candidate/candidate.reducer';
import { hrUserReducer } from './state/hrUser/hrUser.reducer';
import { tutorialDataReducer } from './state/tutorialData/tutorialData.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore(),
    provideState({ name: 'candidate', reducer: candidateReducer }),
    provideState({ name: 'hrUser', reducer: hrUserReducer }),
    provideState({ name: 'tutorialData', reducer: tutorialDataReducer }),
  ]
};
