import { Component } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../models/models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.scss',
  imports: [
    MatProgressSpinnerModule,
    CommonModule
  ],
})
export class TenantComponent {

  currentTenant: Tenant | null = null;

  loading = true;
  constructor(private tenantService: TenantService) {
          
  }
      
  ngOnInit(): void {
    this.tenantService.getTenant().subscribe((tenant: Tenant) => {
      this.currentTenant = tenant;
      this.loading = false;
    })
  }
}
