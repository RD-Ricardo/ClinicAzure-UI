import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalBroadcastService, MsalGuard, MsalModule, MsalService } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, msalGuardConfig } from './services/msal.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/jwt.interceptor';


export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}

function MSALInitializer(msalService: MsalService): () => Promise<void> {
  return () => msalService.instance.initialize().then(() => { 
    return msalService.instance.handleRedirectPromise().then(result => { 
      const account = result?.account || msalService.instance.getAllAccounts()[0];
      if (account) {
        msalService.instance.setActiveAccount(account);
      }
    });
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfig },
    importProvidersFrom(MsalModule),
    {
      provide: APP_INITIALIZER,
      useFactory: MSALInitializer,
      deps: [MsalService], 
      multi: true 
    },
    MsalService,
    MsalBroadcastService,
  ]
};
