import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group, Tenant, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  baserUrl = `${environment.baseUrl}/api/tenants`
  
  constructor(
    private http: HttpClient
  ) { }


  public getTenant(){
    return this.http.get<Tenant>(`${this.baserUrl}`);
  }

  public getGroups(){
    return this.http.get<Group[]>(`${this.baserUrl}/groups`);
  }

  public getUsers(){
    return this.http.get<User[]>(`${this.baserUrl}/users`);
  }
}
