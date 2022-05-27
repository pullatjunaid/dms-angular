import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddAppUserComponent } from 'src/app/components/add-app-user/add-app-user.component';
import { UserModel } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user-service.service';

@Component({
  selector: 'app-app-users-list',
  templateUrl: './app-users-list.component.html',
  styleUrls: ['./app-users-list.component.scss'],
})
export class AppUsersListComponent implements OnInit {
  filterForm: FormGroup;
  dataSource: MatTableDataSource<UserModel>;
  displayedColumns: string[] = ['slNo', 'name', 'email', 'actions'];
  isLoadingFetchAppUsers: boolean = false;
  dataLength: number = 0;
  pageNumber: number = 1;
  perPage: number = 10;
  isPaginatorInitialized: boolean = false;

  // sort
  sortColumn: string = '';
  sortDirection: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      searchKey: new FormControl('', []),
    });
    this.fetchAppUsersList();
  }

  get ff(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
  }

  ngAfterViewInit() {}

  public handlePage(e: any) {
    console.log(e);
    this.pageNumber = e.pageIndex + 1;
    this.perPage = e.pageSize;
    this.fetchAppUsersList();
  }

  applyFilter(ev: Event) {
    this.fetchAppUsersList();
  }

  onClickAddNew(): void {
    let dialogRef = this.dialog.open(AddAppUserComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === true) this.fetchAppUsersList();
    });
  }

  onEditDestination(destination: UserModel): void {
    let dialogRef = this.dialog.open(AddAppUserComponent, {
      disableClose: true,
      data: destination,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) this.fetchAppUsersList();
    });
  }

  sortChange(sort: Sort) {
    console.log(sort);
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.fetchAppUsersList();
  }

  private fetchAppUsersList() {
    this.isLoadingFetchAppUsers = true;
    this.userService
      .getUsersListWithPagination({
        page: this.pageNumber,
        perPage: this.perPage,
        searchKey: this.ff.searchKey.value,
        sortKey: this.sortColumn,
        sortValue: this.sortDirection,
      })
      .subscribe(
        (res: any) => {
          this.isLoadingFetchAppUsers = false;
          this.dataSource = new MatTableDataSource(res.data);
          this.dataLength = res.total;

          if (!this.isPaginatorInitialized) this.initializePaginator();
        },
        (err) => {
          this.isLoadingFetchAppUsers = false;
        }
      );
  }

  private initializePaginator() {
    this.paginator.pageSize = this.perPage;
    this.paginator.pageIndex = this.pageNumber - 1;
    this.isPaginatorInitialized = true;
  }
}