import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user-service.service';
import { customTosters } from 'src/app/core/utils/toaster';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  resetPasswordFormError = {
    password: '',
    password_confirmation: '',
  };
  submitted = false;
  loadingSave: boolean = false;

  passwordInputType: string = 'password';
  constructor(
    private customToster: customTosters,
    private userService: UserService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        this.validateAreEqual.bind(this),
      ]),
    });
  }

  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.resetPasswordForm?.get('password')?.value
      ? null
      : {
          NotEqual: true,
        };
  }

  get rpf(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  onSubmitResetPassword(): void {
    this.submitted = true;
    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm);
      return;
    }
    this.loadingSave = true;

    let reqData = {
      password: this.rpf.password.value,
      password_confirmation: this.rpf.password_confirmation.value,
    };
    this.loadingSave = false;
    this.userService.resetPassword(reqData, this.data?.id).subscribe(
      (res: any) => {
        console.log(res);
        this.dialogRef.close(true);
        // this.customToster.simpleToaster(res?.message);
      },
      (err) => {
        this.loadingSave = false;
        console.log(err);
        if (err.error?.errors?.password && err.error.errors.password[0]) {
          console.log(err.error.errors.password[0]);
          this.resetPasswordFormError.password = err.error.errors.password[0];
        }
        if (
          err.error?.errors?.password_confirmation &&
          err.error.errors.password_confirmation[0]
        ) {
          console.log(err.error.errors.password_confirmation[0]);
          this.resetPasswordFormError.password_confirmation =
            err.error.errors.password_confirmation[0];
        }
      }
    );
  }
}
