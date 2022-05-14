import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErrorMessage: string = '';
  isLoadingLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authService.doSignup().subscribe((res) => {});
    this.loginForm = new FormGroup({
      username: new FormControl('admin@gmail.com', [Validators.required]),
      password: new FormControl('admin123', [Validators.required]),
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoadingLogin = true;
    this.authService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .subscribe(
        (res: any) => {
          this.isLoadingLogin = false;
          localStorage.setItem('api_token', res?.api_token);
          // this.router.navigate(['/dashboard']);
          window.location.href = '/dashboard';
        },
        (err: any) => {
          this.isLoadingLogin = false;
          this.loginErrorMessage = err.error.errors.message;
        }
      );
  }
}
