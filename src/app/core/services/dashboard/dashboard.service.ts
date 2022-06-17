import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  loadDashboardData() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
}
