import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  public createUserForm: FormGroup;
  public message: string;
  public isSubmitted = false;
  public emailErrorMessage: any;
  public userIdErrorMessage: any;
  roles: any;
  subscriptionList: Subscription[] = [];
  constructor(public dialogRef: MatDialogRef<CreateuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private _snackBar: MatSnackBar,
    private userservice: AuthService ) {

    let subscription:Subscription = this.userservice.getuserrole().subscribe(roles => {
      this.roles = roles;
    });
    this.subscriptionList.push(subscription);
  }

  // constructor() { }
 
  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      userName: [null, 
        Validators.compose([
          Validators.required,

          Validators.minLength(3),

          Validators.maxLength(20),
        ]),
      ],
      
      userEmpId: [null, 
        Validators.required,

          Validators.minLength(3),

          Validators.maxLength(10),
      ],
      roleId: [null, Validators.compose([Validators.required])],

    });
    
  }


  validate(){
    if (this.createUserForm.valid) {
      this.createUser();
    }
    else {
      this.validateAllFormFields(this.createUserForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  createUser() {
    this.emailErrorMessage = "";
    this.userIdErrorMessage = "";
    this.createUserForm.patchValue({userId: this.createUserForm.value.email});
    let subscription1:Subscription = this.userservice.createuser(this.createUserForm.value).subscribe((pro: any) => {
    if(pro.status === 400) {
      this._snackBar.open(pro.message, '', {duration: 5000,panelClass :['red-snackbar']});
      return; 
       }
       if(pro.status === 406) {
        this._snackBar.open(pro.message, '', {duration: 5000,panelClass :['red-snackbar']});
        return; 
       }
     else {
      this.dialogRef.close();
    }
    });
    this.subscriptionList.push(subscription1);
  }
  ngOnDestroy() {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }

}
