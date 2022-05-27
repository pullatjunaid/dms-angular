import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbBackupService {
  baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  getDbBackup() {
    return this.http.get(`${this.baseUrl}/backup-db`);
  }
}
