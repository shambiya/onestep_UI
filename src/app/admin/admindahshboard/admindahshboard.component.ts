import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateuserComponent } from '../createuser/createuser.component';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthService } from 'src/app/services/auth.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AddLeadComponent } from '../add-lead/add-lead.component';
import { AddAppComponent } from '../add-app/add-app.component';
import { AddTrackerComponent } from '../add-tracker/add-tracker.component';

@Component({
  selector: 'app-admindahshboard',
  templateUrl: './admindahshboard.component.html',
  styleUrls: ['./admindahshboard.component.css']
})
export class AdmindahshboardComponent implements OnInit {
  displayedColumns = ['action','firstName', 'lastName', 'email', 'roles'];
  userDetails: any;
  public dataSource:any;
  subscriptionList: Subscription[] = [];
  selectedStudy: boolean = false;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, breakpointObserver: BreakpointObserver, public dialog: MatDialog, public userservice: AuthService,){
    let subscription: Subscription = breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        [ 'firstName', 'lastName', 'email', 'roles', 'action'] :
        [ 'firstName', 'lastName', 'email', 'roles', 'action'];
    });
    this.subscriptionList.push(subscription);
  }

  ngOnInit() {

  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(AddAppComponent, {
      width: '400px',
      autoFocus: false,
      data: ''
    });

    let subscription2: Subscription = dialogRef.afterClosed().subscribe(_result => {
      this.getAlluser();
    });
    this.subscriptionList.push(subscription2);
  }

  openDeleteUserDialog(row:any){

  }

  openEditUserDialog(row:any) {
    
  }

  getAlluser() {
    let subscription1: Subscription = this.userservice.getalluser().subscribe((data: any) => {
      this.dataSource = data;
    });
    this.subscriptionList.push(subscription1);
  }
  
  

  onSubmit() {
  }

}
