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
    console.log('hfdfdk');
    this.loadingBackup = true;
    this.dbBackupService.getDbBackup().subscribe(
      (res: any) => {
        this.download(res?.data?.backupFileName, res?.data?.backupdata);
        this.loadingBackup = false;
      },
      (err) => {
        console.log(err);
        this.loadingBackup = false;
      }
    );
  }

  private download(filename: any, text: any) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
