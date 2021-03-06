import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddDestinationComponent } from 'src/app/components/add-destination/add-destination.component';
import { AddEntryComponent } from 'src/app/components/add-entry/add-entry.component';
import { DestinationModel } from 'src/app/core/models/destination';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DestinationService } from 'src/app/core/services/destination/destination.service';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.scss'],
})
export class DestinationListComponent implements OnInit {
  filterForm: FormGroup;
  dataSource: MatTableDataSource<DestinationModel>;
  displayedColumns: string[] = [
    'slNo',
    'title',
    'description',
    'shortname',
    'created_at',
  ];
  isLoadingFetchDestinations: boolean = false;
  dataLength: number = 0;
  pageNumber: number = 1;
  perPage: number = 10;
  isPaginatorInitialized: boolean = false;

  // sort
  sortColumn: string = '';
  sortDirection: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private destinationService: DestinationService,
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.hasPermission(['destination.edit']))
      this.displayedColumns.push('actions');
    this.filterForm = new FormGroup({
      searchKey: new FormControl('', []),
    });
    this.fetchDestinationList();
  }

  get ff(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
  }

  ngAfterViewInit() {}

  public handlePage(e: any) {
    console.log(e);
    this.pageNumber = e.pageIndex + 1;
    this.perPage = e.pageSize;
    this.fetchDestinationList();
  }

  applyFilter(ev: Event) {
    this.fetchDestinationList();
  }

  onClickAddNew(): void {
    let dialogRef = this.dialog.open(AddDestinationComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.fetchDestinationList();
    });
  }

  onEditDestination(destination: DestinationModel): void {
    console.log(destination);
    let dialogRef = this.dialog.open(AddDestinationComponent, {
      disableClose: true,
      data: destination,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) this.fetchDestinationList();
    });
  }

  sortChange(sort: Sort) {
    console.log(sort);
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.fetchDestinationList();
  }

  private fetchDestinationList() {
    this.isLoadingFetchDestinations = true;
    this.destinationService
      .getDestinationListWithPagination({
        page: this.pageNumber,
        perPage: this.perPage,
        searchKey: this.ff.searchKey.value,
        sortKey: this.sortColumn,
        sortValue: this.sortDirection,
      })
      .subscribe(
        (res: any) => {
          this.isLoadingFetchDestinations = false;
          this.dataSource = new MatTableDataSource(res.data);
          this.dataLength = res.total;

          if (!this.isPaginatorInitialized) this.initializePaginator();
        },
        (err) => {
          this.isLoadingFetchDestinations = false;
        }
      );
  }

  private initializePaginator() {
    this.paginator.pageSize = this.perPage;
    this.paginator.pageIndex = this.pageNumber - 1;
    this.isPaginatorInitialized = true;
  }
}
