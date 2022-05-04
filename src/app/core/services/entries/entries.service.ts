import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  savevEntry(reqData: any) {
    return this.http.post(`${this.baseUrl}/entries`, reqData);
  }

  getEntriesList(page: number, perPage: number) {
    return this.http.get(
      `${this.baseUrl}/entries?page=${page}&per_page=${perPage}`
    );
  }
}
