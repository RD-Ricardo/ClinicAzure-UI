import { MsalGuardConfiguration } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: '4ca456d1-d30e-4b44-81c1-00ff0826438f',
    authority: 'https://login.microsoftonline.com/65c60b75-bb5b-4fa6-9549-27b89302b3cc',
    redirectUri: 'https://app-clinic-az.rdsolutions.digital/auth',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['api://4ca456d1-d30e-4b44-81c1-00ff0826438f/API.Read', "Organization.Read.All"]
  }
};