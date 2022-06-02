import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryModel } from 'src/app/core/models/entry';

@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.component.html',
  styleUrls: ['./view-entry.component.scss'],
})
export class ViewEntryComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: EntryModel) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onPrint() {
    var printContent = `<div
    style="padding: 20px; height: 100vh; width: 794px; border: 1px solid black"
  >
    <div style="width: 100%; height: 150px">
      <div style="width: 25%; float: left; text-align: center">
        <img
          src="assets/img/PU_Logo-white-150x150.png"
          style="width: 130px; max-width: 100%"
        />
      </div>
      <div style="width: 50%; float: left; text-align: center">
        <h2>PONDICHERRY UNIVERSITY</h2>
        <span style="text-transform: capitalize"
        >Department of computer science</span
      >
      </div>
      <div style="width: 25%; float: left"></div>
    </div>
    <div style="padding-top: 20px">
      <div style="margin-bottom: 15px"><b>REF. ID:</b> ${this.data.ref_id}</div>
      <div style="margin-bottom: 15px">
        <b>Date:</b>  ${formatDate(
          this.data?.from_date,
          'dd-MMM-yyyy',
          'en-US'
        )} - ${formatDate(this.data?.to_date, 'dd-MMM-yyyy', 'en-US')}
      </div>
      <div style="margin-bottom: 15px"><b>From:</b> ${
        this.data.from_whom.title
      }</div>
      <div style="margin-bottom: 15px">
        <b>To:</b> ${this.data.to_whom.title}
      </div>
      <div style="margin-bottom: 15px; font-size: 0.9em; line-height: 22px">
        <b style="font-size: 1em">Subject:</b>
        <br />
        <br />
        ${this.data.subject}
      </div>
    </div>
  </div>
  `;
    const WindowPrt = window.open(
      '',
      '',
      'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0'
    );
    WindowPrt?.document.write(printContent);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
  }
}
// https://my.stripo.email/cabinet/#/template-editor/?emailId=3663540&projectId=636430&templateId=935298&type=BASE_TEMPLATE&copyCount=1&templateProjectId=470969
