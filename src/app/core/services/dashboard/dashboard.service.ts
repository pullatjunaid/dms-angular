import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  loadDashboardData() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
}
