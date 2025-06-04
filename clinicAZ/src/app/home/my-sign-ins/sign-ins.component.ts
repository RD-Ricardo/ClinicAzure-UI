import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SignIns } from '../../models/models';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-ins',
  imports: [
    MatTableModule,
    CommonModule,
    MatProgressSpinner
  ],
  templateUrl: './sign-ins.component.html',
  styleUrl: './sign-ins.component.scss',

})
export class SignInsComponent {


  displayedColumns: string[] = ['userDisplayName', 'createdDateTime', 'errorCode'];
  dataSource: SignIns[] = [];
  loading = true;
    
  constructor(private userService: UserService) {
      
  }
  
  ngOnInit(): void {
    this.userService.getSignIns().subscribe((signIns: SignIns[]) =>{
      this.dataSource = signIns;
      this.loading = false;
    })
  }
}
