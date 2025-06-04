import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private msalService: MsalService, private router: Router) {}

  login() {
    this.msalService.loginPopup().subscribe({
      next: async (response) =>{
        console.log(response);
        const token = await this.getToken();
        localStorage.setItem('accessToken', token!)
        this.router.navigate(["/"]);
      },
      error: (error) =>{
        console.error(error);
      }
    })
  }

  getToken() {
    const account = this.msalService.instance.getAllAccounts()[0];
    if (account) {
      return this.msalService.instance.acquireTokenSilent({
        scopes: environment.azure.scopes,
        account: account
      }).then(response => {
        return response.accessToken;
      }).catch(error => {
        console.error('Token acquisition failed', error);
        return null;
      });
    }
    return null;
  }

  isAuthenticated(): boolean {
    const accounts = this.msalService.instance.getAllAccounts();
    return accounts.length > 0;
  }

  public logout() {
    localStorage.removeItem('accessToken');
    this.msalService.logoutPopup({
      postLogoutRedirectUri:  "/"
    }).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
