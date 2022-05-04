import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  savevDestination(reqData: any) {
    return this.http.post(`${this.baseUrl}/destination`, reqData);
  }

  getDestinationList(page: number, perPage: number) {
    return this.http.get(
      `${this.baseUrl}/destination?page=${page}&per_page=${perPage}`
    );
  }
}
