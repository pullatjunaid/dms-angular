import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { EntriesService } from 'src/app/core/services/entries/entries.service';

export interface Entry {
  ref_id: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loadingDashboardData: boolean = false;
  dashboardData: any;

  dataSource: MatTableDataSource<Entry>;
  displayedColumns: string[] = [
    'slNo',
    'ref_id',
    'from_whom',
    'to_whom',
    'created_at',
  ];

  dataLength: number = 0;
  constructor(
    private dashboardService: DashboardService,
    private entryService: EntriesService
  ) {}

  ngOnInit(): void {
    this.fetchDashboardData();
    this.fetchEntriesList();
    this.onClickBackupnow();
  }

  onClickBackupnow() {}

  private fetchEntriesList() {
    this.entryService
      .getEntriesList({
        page: 1,
        perPage: 10,
      })
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataLength = res.total;
      });
  }

  private fetchDashboardData(): void {
    this.loadingDashboardData = true;
    this.dashboardService.loadDashboardData().subscribe(
      (res: any) => {
        this.loadingDashboardData = false;
        this.dashboardData = res.data;
        console.log(res);
      },
      (err) => {
        this.loadingDashboardData = false;
        console.log(err);
      }
    );
  }
}
