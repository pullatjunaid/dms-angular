import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  saveDestination(reqData: any) {
    return this.http.post(`${this.baseUrl}/destination`, reqData);
  }

  updateDestination(reqData: any, id: any) {
    return this.http.put(`${this.baseUrl}/destination/${id}`, reqData);
  }

  getDestinationListWithPagination({
    page = 1,
    perPage = 10,
    searchKey = '',
    sortKey = '',
    sortValue = '',
  } = {}) {
    return this.http.get(
      `${this.baseUrl}/destination?page=${page}&per_page=${perPage}&searchKey=${searchKey}&sortKey=${sortKey}&sortValue=${sortValue}`
    );
  }

  getDestinationList() {
    return this.http.get(`${this.baseUrl}/destination`);
  }
}
