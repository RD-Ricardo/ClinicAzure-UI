import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Group } from '../../models/models';
import { TenantService } from '../../services/tenant.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
})
export class GroupsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'displayName', 'createdAt'];
  dataSource: Group[] = [];
  loading = true;
  
  constructor(private tenantService: TenantService) {
    
  }

  ngOnInit(): void {
    this.tenantService.getGroups().subscribe((groups: Group[]) =>{
      this.dataSource = groups;
      this.loading = false;
    })
  }
}
