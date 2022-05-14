import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  saveEntry(reqData: any) {
    return this.http.post(`${this.baseUrl}/entries`, reqData);
  }

  updateEntry(reqData: any, id: any) {
    return this.http.put(`${this.baseUrl}/entries/${id}`, reqData);
  }

  getEntriesList({
    page = 1,
    perPage = 10,
    searchKey = '',
    sortKey = '',
    sortValue = '',
  } = {}) {
    return this.http.get(
      `${this.baseUrl}/entries?page=${page}&per_page=${perPage}&searchKey=${searchKey}&sortKey=${sortKey}&sortValue=${sortValue}`
    );
  }

  getLastEntry() {
    return this.http.get(`${this.baseUrl}/last-entry`);
  }
}
