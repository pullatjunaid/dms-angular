import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EntriesService } from 'src/app/core/services/entries/entries.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryComponent } from 'src/app/components/add-entry/add-entry.component';
import { MatSort, Sort } from '@angular/material/sort';
import { customTosters } from 'src/app/core/utils/toaster';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EntryModel } from 'src/app/core/models/entry';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ViewEntryComponent } from 'src/app/components/view-entry/view-entry.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
})
export class EntriesComponent implements OnInit {
  searchForm: FormGroup;
  filterForm: FormGroup;
  dataSource: MatTableDataSource<EntryModel>;
  displayedColumns: string[] = [
    'slNo',
    'ref_id',
    'from_whom',
    'to_whom',
    'created_at',
    // 'subject',
    'actions',
  ];
  isLoadingFetchEntries: boolean = false;
  isLoadingDeleteEntry: boolean = false;
  dataLength: number = 0;
  pageNumber: number = 1;
  perPage: number = 10;
  isPaginatorInitialized: boolean = false;
  today = new Date();
  dateFilterFrom = '';
  dateFilterTo = '';

  // sort
  sortColumn: string = '';
  sortDirection: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private entryService: EntriesService,
    public dialog: MatDialog,
    private customToaster: customTosters,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchKey: new FormControl('', []),
    });
    // formatDate(this.today, 'yyyy-MM-dd', 'en-US'),
    this.filterForm = new FormGroup({
      date_start: new FormControl([]),
      date_end: new FormControl([]),
    });

    this.fetchEntriesList();
  }

  get ff(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
  }
  get sf(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  ngAfterViewInit() {}

  onClickAddNew(): void {
    let dialogRef = this.dialog.open(AddEntryComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.fetchEntriesList();
    });
  }

  applyFilter(ev: Event) {
    this.fetchEntriesList();
  }

  onDeleteEntry(entryData?: EntryModel): void {
    this.isLoadingFetchEntries = true;
    this.entryService.deleteEntry(entryData?.id).subscribe(
      (res: any) => {
        this.fetchEntriesList();
      },
      (err) => {
        this.isLoadingFetchEntries = false;
      }
    );
  }
  onEditEntry(entryData: EntryModel): void {
    console.log(entryData);
    let dialogRef = this.dialog.open(AddEntryComponent, {
      disableClose: true,
      data: entryData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === true) this.fetchEntriesList();
    });
  }
  onViewEntry(entryData?: EntryModel): void {
    let dialogRef = this.dialog.open(ViewEntryComponent, {
      data: entryData,
      backdropClass: 'view-entry-modal',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  sortChange(sort: Sort) {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.fetchEntriesList();
  }

  onSubmitDateFilter() {
    this.dateFilterFrom = this.ff.date_start.value;
    this.dateFilterTo = this.ff.date_end.value;
    this.fetchEntriesList();
  }

  private fetchEntriesList() {
    this.isLoadingFetchEntries = true;
    this.entryService
      .getEntriesList({
        page: this.pageNumber,
        perPage: this.perPage,
        searchKey: this.sf.searchKey.value,
        sortKey: this.sortColumn,
        sortValue: this.sortDirection,
        dateFilterFrom: this.dateFilterFrom,
        dateFilterTo: this.dateFilterTo,
      })
      .subscribe(
        (res: any) => {
          this.isLoadingFetchEntries = false;
          this.dataSource = new MatTableDataSource(res.data);
          this.dataLength = res.total;
          this.addRows();
          if (!this.isPaginatorInitialized) this.initializePaginator();
        },
        (err) => {
          this.isLoadingFetchEntries = false;
        }
      );
  }

  onClickClearFilter() {
    this.dateFilterFrom = '';
    this.dateFilterTo = '';
    this.filterForm.reset();
    this.fetchEntriesList();
  }

  public handlePage(e: any) {
    this.pageNumber = e.pageIndex + 1;
    this.perPage = e.pageSize;
    this.fetchEntriesList();
  }

  private initializePaginator() {
    this.paginator.pageSize = this.perPage;
    this.paginator.pageIndex = this.pageNumber;
    this.isPaginatorInitialized = true;
    // length: 17
    // pageIndex: 1
    // pageSize: 10
    // previousPageIndex: 0

    // this.dataSource.paginator = this.paginator;
  }

  onPrint() {
    var printContent = `<div
    style="padding: 20px;   width: 794px;  "
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
      <span><b>School of Engineering & Technology</b></span>
      <div style="height: 8px"></div>
      <span><b>Department of Computer Science</b></span>
      </div>
      <div style="width: 25%; float: left"></div>
    </div>
    <div style="padding-top: 20px">
      <div style="margin-bottom: 5px;text-align:center;font-weight:bold;font-size: 0.8em;">
      ${
        this.dateFilterFrom
          ? 'Dispatch Register for the period from ' +
            formatDate(this.dateFilterFrom, 'dd-MMM-yyyy', 'en-US') +
            ' to ' +
            formatDate(this.dateFilterTo, 'dd-MMM-yyyy', 'en-US')
          : 'Dispatch Register'
      }
         
      </div>
      <div style="margin-bottom: 15px;font-size: 0.9em">
        Report Date: ${formatDate(new Date(), 'dd/MM/yyyy  hh:mm  a', 'en-US')}
      </div>
  
      <div style="margin-bottom: 15px; font-size: 0.9em; line-height: 22px">
        <table
        id="table"
          style="
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          "
        >
          <tr style="border-bottom: 2px solid black; border-top: 2px solid black">
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              Sl. No.
            </th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              Ref. ID
            </th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              From
            </th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              To
            </th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              Date
            </th>
          </tr>
         
         ${this.addRows()}
        </table>
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

  addRows() {
    let trs = '';
    this.dataSource.filteredData.forEach((element, index) => {
      trs += `
      <tr>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
      ${index + 1}
     </td>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
       ${element?.id}
      </td>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
      ${element?.from_whom?.shortname}
      </td>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
      ${element?.to_whom?.shortname}
      </td>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
      ${formatDate(element?.created_at, 'dd MMM', 'en-US')}
      </td>
    </tr>
      `;
    });
    return trs;
  }
}
