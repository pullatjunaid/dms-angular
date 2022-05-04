import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddDestinationComponent } from 'src/app/components/add-destination/add-destination.component';
import { AddEntryComponent } from 'src/app/components/add-entry/add-entry.component';
import { DestinationModel } from 'src/app/core/models/destination';
import { DestinationService } from 'src/app/core/services/destination/destination.service';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.scss'],
})
export class DestinationListComponent implements OnInit {
  dataSource: MatTableDataSource<DestinationModel>;
  displayedColumns: string[] = ['slNo', 'title', 'created_at', 'description'];

  dataLength: number = 0;
  pageNumber: number = 1;
  perPage: number = 10;
  isPaginatorInitialized: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private destinationService: DestinationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.submitDestinationForm();
    this.fetchDestinationList();
  }

  ngAfterViewInit() {}

  submitDestinationForm(): void {
    let reqData = {
      title: 'Vice Chancelor',
    };
    this.destinationService.savevDestination(reqData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public handlePage(e: any) {
    console.log(e);
    this.pageNumber = e.pageIndex + 1;
    this.perPage = e.pageSize;
    this.fetchDestinationList();
  }

  onClickAddNew(): void {
    let dialogRef = this.dialog.open(AddDestinationComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  private fetchDestinationList() {
    this.destinationService
      .getDestinationList(this.pageNumber, this.perPage)
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataLength = res.total;

        if (!this.isPaginatorInitialized) this.initializePaginator();
      });
  }

  private initializePaginator() {
    this.paginator.pageSize = this.perPage;
    this.paginator.pageIndex = this.pageNumber;
    this.isPaginatorInitialized = true;
  }
}
