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

export interface Entry {
  ref_id: string;
}
@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
})
export class EntriesComponent implements OnInit {
  filterForm: FormGroup;
  dataSource: MatTableDataSource<Entry>;
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
  dataLength: number = 0;
  pageNumber: number = 1;
  perPage: number = 10;
  isPaginatorInitialized: boolean = false;

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
    this.filterForm = new FormGroup({
      searchKey: new FormControl('', []),
    });

    this.fetchEntriesList();
  }

  get ff(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
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

  sortChange(sort: Sort) {
    console.log(sort);
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.fetchEntriesList();
  }

  private fetchEntriesList() {
    this.isLoadingFetchEntries = true;
    this.entryService
      .getEntriesList({
        page: this.pageNumber,
        perPage: this.perPage,
        searchKey: this.ff.searchKey.value,
        sortKey: this.sortColumn,
        sortValue: this.sortDirection,
      })
      .subscribe(
        (res: any) => {
          this.isLoadingFetchEntries = false;
          this.dataSource = new MatTableDataSource(res.data);
          this.dataLength = res.total;

          if (!this.isPaginatorInitialized) this.initializePaginator();
        },
        (err) => {
          this.isLoadingFetchEntries = false;
        }
      );
  }

  public handlePage(e: any) {
    console.log(e);
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
}
