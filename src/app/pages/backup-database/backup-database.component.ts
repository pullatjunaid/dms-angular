import { Component, OnInit } from '@angular/core';
import { DbBackupService } from 'src/app/core/services/dbBackup/db-backup.service';

@Component({
  selector: 'app-backup-database',
  templateUrl: './backup-database.component.html',
  styleUrls: ['./backup-database.component.scss'],
})
export class BackupDatabaseComponent implements OnInit {
  loadingBackup: boolean = false;
  constructor(private dbBackupService: DbBackupService) {}

  ngOnInit(): void {}

  onClickBackupNow(): void {
    this.loadingBackup = true;
    this.dbBackupService.getDbBackup().subscribe(
      (res) => {
        this.loadingBackup = false;
      },
      (err) => {
        this.loadingBackup = false;
      }
    );
  }
}
