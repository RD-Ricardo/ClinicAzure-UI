import { Component } from '@angular/core';
import { Tenant, User } from '../../models/models';
import { UserService } from '../../services/user.service';
import { TenantService } from '../../services/tenant.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  imports: [
    MatTableModule,
    CommonModule,
    MatProgressSpinner

  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {


  displayedColumns: string[] = ['id', 'displayName', 'userPrincipalName', 'createdAt'];
  dataSource: User[] = [];
  loading = true;
      
  constructor(private tenantService: TenantService) {
        
  }
    
  ngOnInit(): void {
      this.tenantService.getUsers().subscribe((users: User[]) =>{
          this.dataSource = users;
          this.loading = false;
      })
  }
}
