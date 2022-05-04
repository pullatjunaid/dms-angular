import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EntriesService } from 'src/app/core/services/entries/entries.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryComponent } from 'src/app/components/add-entry/add-entry.component';
import { MatSort } from '@angular/material/sort';

export interface Entry {
  ref_id: string;
}
@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
})
export class EntriesComponent implements OnInit {
  dataSource: MatTableDataSource<Entry>;
  displayedColumns: string[] = [
    'slNo',
    'ref_id',
    'from_whom',
    'to_whom',
    'created_at',
  ];

  dataLength: number = 0;
  pageNumber: number = 1;
  perPage: number = 10;
  isPaginatorInitialized: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private entryService: EntriesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchEntriesList();
  }

  ngAfterViewInit() {}

  fetchEntriesList() {
    this.entryService
      .getEntriesList(this.pageNumber, this.perPage)
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataLength = res.total;

        if (!this.isPaginatorInitialized) this.initializePaginator();
      });
  }

  onClickAddNew(): void {
    this.dialog.open(AddEntryComponent, {
      disableClose: true,
    });
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
