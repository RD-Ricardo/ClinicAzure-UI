import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignIns } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baserUrl = `${environment.baseUrl}/api/users`
  
  constructor(
    private http: HttpClient
  ) { }


  public getSignIns(){
    return this.http.get<SignIns[]>(`${this.baserUrl}/get-sign-ins`);
  }

}
