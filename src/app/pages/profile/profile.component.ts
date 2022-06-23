import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { customTosters } from 'src/app/core/utils/toaster';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails: any;
  constructor(public dialog: MatDialog, private customToster: customTosters) {}

  ngOnInit(): void {
    const userDtls = localStorage.getItem('userDetails');
    if (userDtls) this.userDetails = JSON.parse(userDtls);
  }

  onChangePassword() {
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      disableClose: true,
      data: this.userDetails,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true)
        this.customToster.simpleToaster(
          'Account password has been changed successfully!'
        );
    });
  }
}
