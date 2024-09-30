import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  passwordStrengthClass = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, this.createPasswordStrengthValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && value.length >= 8;

      if (!passwordValid) {
        return { 'passwordStrength': true };
      }

      return null;
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
       ? null : {'mismatch': true};
  }

  checkPasswordStrength(password: string) {
    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    let score = 0;
    if (password.length >= 8) score++;
    if (hasUpperCase && hasLowerCase) score++;
    if (hasNumeric) score++;
    if (hasSpecialChar) score++;

    if (score <= 2) {
      this.passwordStrengthClass = 'weak-password';
    } else if (score === 3) {
      this.passwordStrengthClass = 'medium-password';
    } else {
      this.passwordStrengthClass = 'strong-password';
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { newPassword, confirmPassword } = this.form.value;

    // Here you would typically call a service method to update the password
    // For example:
    // this.authService.updatePassword(newPassword).subscribe(
    //   () => {
    //     // Handle successful password update
    //   },
    //   error => {
    //     this.errorMessage = error.message;
    //   }
    // );
  }
}