import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { enumsReducer } from '../store/reducers/enums.reducer';
import { securityReducer } from '../store/reducers/security.reducer';
import { SecurityEffects } from '../store/effects/security.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideStore({
      enums: enumsReducer, 
      security: securityReducer
    }),
    provideEffects([SecurityEffects])
  ]
};
