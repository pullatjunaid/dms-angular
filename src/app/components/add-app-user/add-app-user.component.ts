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
  };
  submitted = false;
  loadingSave: boolean = false;

  passwordInputType: string = 'text';
  constructor(
    private customToster: customTosters,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddAppUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {}

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      name: new FormControl(this.data?.name ? this.data.name : '', [
        Validators.required,
      ]),
      email: new FormControl(this.data?.email ? this.data.email : '', [
        Validators.required,
      ]),
      userType: new FormControl(
        this.data?.user_type ? this.data.user_type : 'app_user',
        [Validators.required]
      ),
      password: new FormControl('', [Validators.required]),
      passwordVisibility: new FormControl(true),
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.addUserForm.controls;
  }

  onSubmitAppUser(): void {
    this.submitted = true;
    if (!this.addUserForm.valid) {
      console.log(this.fc.email.errors);
      return;
    }

    let reqData = {
      name: this.fc.name.value,
      email: this.fc.email.value,
      user_type: this.fc.userType.value,
      password: this.fc.password.value,
      password_confirmation: this.fc.password.value,
    };
    this.loadingSave = true;
    if (this.data?.id) {
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
          if (err.error?.errors?.email[0]) {
            console.log(err.error.errors.email[0]);
            this.addUserFormError.email = err.error.errors.email[0];
          }
        }
      );
    }
  }

  onPasswordVisibleCheck(event: MatCheckboxChange) {
    console.log(event);
  }
}
