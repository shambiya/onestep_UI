import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', Validators.required]
    });
  
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    this.router.navigate(['/update-password'])
    // const { username, password } = this.form.value;

    // this.authService.login(username, password).subscribe(
    //   data => {
    //     this.tokenStorage.saveToken(data.accessToken);
    //     this.tokenStorage.saveUser(data);
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.tokenStorage.getUser().roles;
    //     this.reloadPage();
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
        
    //   }
    // );
  }
  
  reloadPage(): void {
    let roles = this.roles.filter(p => p === 'ROLE_ADMIN' || p === 'ROLE_LEAD' || p === 'ROLE_MEMBER');
    if (roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/lead-dashboard']);
    }
    //  else if (roles.includes('ROLE_CUSTOMER')) {
    //   this.router.navigate(['/customer-dashboard']);
    // } else if (roles.includes('ROLE_DRIVER')) {
    //   this.router.navigate(['/driver-dashboard']);
    // } else {
    //   alert('You do not have any roles. Please contact an administrator.');
    // }
  }
}
