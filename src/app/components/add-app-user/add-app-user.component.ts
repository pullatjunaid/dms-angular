import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user-service.service';
import { passwordVisibilityToggle } from 'src/app/core/utils/password-visibility';
import { customTosters } from 'src/app/core/utils/toaster';

@Component({
  selector: 'app-add-app-user',
  templateUrl: './add-app-user.component.html',
  styleUrls: ['./add-app-user.component.scss'],
})
export class AddAppUserComponent implements OnInit {
  addUserForm: FormGroup;
  addUserFormError = {
    email: '',
    password: '',
  };
  submitted = false;
  loadingSave: boolean = false;

  passwordInputType: string = 'password';
  constructor(
    private customToster: customTosters,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddAppUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.addUserForm = new FormGroup({
      name: new FormControl(this.data?.name ? this.data.name : '', [
        Validators.required,
      ]),
      email: new FormControl(this.data?.email ? this.data.email : '', [
        Validators.required,
      ]),
      userType: new FormControl(
        this.data?.user_type ? this.data.user_type : '',
        [Validators.required]
      ),
      // password: new FormControl('', [Validators.required]),
      passwordVisibility: new FormControl(true),
    });

    if (!this.data?.id) {
      this.addUserForm.addControl(
        'password',
        new FormControl('', [Validators.required])
      );
      this.addUserForm.addControl(
        'password_confirmation',
        new FormControl('', [
          Validators.required,
          this.validateAreEqual.bind(this),
        ])
      );
    }
  }
  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.addUserForm.get('password')?.value
      ? null
      : {
          NotEqual: true,
        };
  }
  get fc(): { [key: string]: AbstractControl } {
    return this.addUserForm.controls;
  }

  onSubmitAppUser(): void {
    this.submitted = true;
    if (!this.addUserForm.valid) {
      console.log(this.fc.password_confirmation.errors);
      return;
    }

    this.loadingSave = true;
    if (this.data?.id) {
      let reqData = {
        name: this.fc.name.value,
        email: this.fc.email.value,
        user_type: this.fc.userType.value,
      };
      this.loadingSave = false;
      this.userService.updateAppUser(reqData, this.data.id).subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close(true);
          this.customToster.simpleToaster('User Details updated');
        },
        (err) => {
          this.loadingSave = false;
        }
      );
    } else {
      let reqData = {
        name: this.fc.name.value,
        email: this.fc.email.value,
        user_type: this.fc.userType.value,
        password: this.fc.password.value,
        password_confirmation: this.fc.password.value,
      };
      this.loadingSave = false;
      this.userService.saveUser(reqData).subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close(true);
          this.customToster.simpleToaster('New user added');
        },
        (err) => {
          this.loadingSave = false;
          console.log(err);
          if (err.error?.errors?.email && err.error.errors.email[0]) {
            console.log(err.error.errors.email[0]);
            this.addUserFormError.email = err.error.errors.email[0];
          }
          if (err.error?.errors?.password && err.error.errors.password[0]) {
            console.log(err.error.errors.password[0]);
            this.addUserFormError.password = err.error.errors.password[0];
          }
        }
      );
    }
  }

  onPasswordVisibleCheck(event: MatCheckboxChange) {
    console.log(event);
  }
}
