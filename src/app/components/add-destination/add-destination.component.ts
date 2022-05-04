import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DestinationService } from 'src/app/core/services/destination/destination.service';

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
    private dialogRef: MatDialogRef<AddDestinationComponent>
  ) {}

  ngOnInit(): void {
    this.addDestinationForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
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
    this.destinationService.savevDestination(reqData).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(true);
    });
  }
}
