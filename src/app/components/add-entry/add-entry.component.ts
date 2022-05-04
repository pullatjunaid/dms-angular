import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntriesService } from 'src/app/core/services/entries/entries.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss'],
})
export class AddEntryComponent implements OnInit {
  entryForm: FormGroup;
  today = new Date();
  entryFormError = '';
  submitted = false;
  constructor(private entryService: EntriesService) {}

  ngOnInit(): void {
    this.entryForm = new FormGroup({
      fromDate: new FormControl(formatDate(this.today, 'yyyy-MM-dd', 'en-US'), [
        Validators.required,
      ]),
      toDate: new FormControl(formatDate(this.today, 'yyyy-MM-dd', 'en-US'), [
        Validators.required,
      ]),
      fromWhom: new FormControl('', [Validators.required]),
      toWhom: new FormControl('', [Validators.required]),
      subject: new FormControl('', []),
    });
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
    this.entryService.savevEntry(reqData).subscribe((res) => {
      console.log(res);
    });
  }
}
