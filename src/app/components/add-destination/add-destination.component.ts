import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DestinationModel } from 'src/app/core/models/destination';
import { DestinationService } from 'src/app/core/services/destination/destination.service';
import { customTosters } from 'src/app/core/utils/toaster';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.scss'],
})
export class AddDestinationComponent implements OnInit {
  addDestinationForm: FormGroup;
  today = new Date();
  addDestinationError = '';
  submitted = false;
  constructor(
    private destinationService: DestinationService,
    private dialogRef: MatDialogRef<AddDestinationComponent>,
    private customToster: customTosters,
    @Inject(MAT_DIALOG_DATA) public data: DestinationModel
  ) {}

  ngOnInit(): void {
    this.addDestinationForm = new FormGroup({
      title: new FormControl(this.data?.title ? this.data.title : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.data?.description ? this.data.description : '',
        []
      ),
    });
  }

  ngOnDestroy() {
    console.log('hikk');
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.addDestinationForm.controls;
  }

  onSubmitDestination(): void {
    this.submitted = true;
    if (!this.addDestinationForm.valid) {
      return;
    }

    let reqData = {
      title: this.fc.title.value,
      description: this.fc.description.value,
    };
    if (this.data?.id) {
      this.destinationService
        .updateDestination(reqData, this.data?.id)
        .subscribe(
          (res) => {
            this.customToster.simpleToaster('Destination updated successfully');
            this.dialogRef.close(true);
          },
          (err) => {
            this.addDestinationError = '';
            if (err.error?.errors) {
              Object.keys(err.error.errors).forEach((key: any, value: any) => {
                this.addDestinationError += '' + err.error.errors[key];
              });
            }
          }
        );
    } else {
      this.destinationService.saveDestination(reqData).subscribe(
        (res) => {
          this.customToster.simpleToaster('Destination created successfully');
          this.dialogRef.close(true);
        },
        (err) => {
          this.addDestinationError = '';
          if (err.error?.errors) {
            Object.keys(err.error.errors).forEach((key: any, value: any) => {
              this.addDestinationError += '' + err.error.errors[key];
            });
          }
        }
      );
    }
  }
}
