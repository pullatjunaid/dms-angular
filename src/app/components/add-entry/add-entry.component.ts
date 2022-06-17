import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryModel } from 'src/app/core/models/entry';
import { DestinationService } from 'src/app/core/services/destination/destination.service';
import { EntriesService } from 'src/app/core/services/entries/entries.service';
import { customTosters } from 'src/app/core/utils/toaster';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss'],
})
export class AddEntryComponent implements OnInit {
  destinationList: [] = [];
  entryForm: FormGroup;
  entryFormError = '';
  submitted = false;
  today = new Date();
  latestEntryDetails = {};
  newEntryId: string = '';
  loadingSave: boolean = false;
  constructor(
    private customToster: customTosters,
    private destinationService: DestinationService,
    private dialogRef: MatDialogRef<AddEntryComponent>,
    private entryService: EntriesService,
    @Inject(MAT_DIALOG_DATA) public data: EntryModel
  ) {}

  ngOnInit(): void {
    this.entryForm = new FormGroup({
      fromDate: new FormControl(
        formatDate(
          this.data?.from_date ? this.data.from_date : this.today,
          'yyyy-MM-dd',
          'en-US'
        ),
        [Validators.required]
      ),
      toDate: new FormControl(
        formatDate(
          this.data?.to_date ? this.data.to_date : this.today,
          'yyyy-MM-dd',
          'en-US'
        ),
        [Validators.required]
      ),
      fromWhom: new FormControl(
        this.data?.from_whom?.id ? this.data.from_whom.id : '',
        [Validators.required]
      ),
      toWhom: new FormControl(
        this.data?.to_whom?.id ? this.data.to_whom.id : '',
        [Validators.required]
      ),
      subject: new FormControl(this.data?.subject ? this.data.subject : '', [
        Validators.required,
      ]),
    });

    this.fetchDestinationList();
    this.getLatestEntry();
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.entryForm.controls;
  }

  get fcFromWhom() {
    return this.entryForm.get('fromWhom');
  }

  onSubmitEntry(): void {
    this.submitted = true;
    if (!this.entryForm.valid) {
      return;
    }

    let reqData = {
      from_date: this.fc.fromDate.value,
      from_whom: this.fc.fromWhom.value,
      subject: this.fc.subject.value,
      to_date: this.fc.toDate.value,
      to_whom: this.fc.toWhom.value,
    };
    this.loadingSave = true;
    if (this.data?.id) {
      this.loadingSave = false;
      this.entryService.updateEntry(reqData, this.data.id).subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close(true);
          this.customToster.simpleToaster('Entry updated');
        },
        (err) => {
          this.loadingSave = false;
        }
      );
    } else {
      this.loadingSave = false;
      this.entryService.saveEntry(reqData).subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close(true);
          this.customToster.simpleToaster('New entry added');
        },
        (err) => {
          this.loadingSave = false;
        }
      );
    }
  }

  onFromDateChange(): void {
    this.entryForm.controls['toDate'].setValue('');
  }

  private fetchDestinationList() {
    this.destinationService.getDestinationList().subscribe((res: any) => {
      this.destinationList = res.data;
    });
  }

  getLatestEntry(): void {
    this.entryService.getLastEntry().subscribe(
      (res: any) => {
        this.latestEntryDetails = res;
        if (res.id) {
          this.newEntryId = `PU/SET/DCS/22-23/${res.id + 1}`;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
