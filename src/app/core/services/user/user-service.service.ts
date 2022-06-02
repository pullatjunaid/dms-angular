import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  getUsersListWithPagination({
    page = 1,
    perPage = 10,
    searchKey = '',
    sortKey = '',
    sortValue = '',
  } = {}) {
    return this.http.get(
      `${this.baseUrl}/app-users?page=${page}&per_page=${perPage}&searchKey=${searchKey}&sortKey=${sortKey}&sortValue=${sortValue}`
    );
  }

  resetPassword(reqData: any, id: any) {
    return this.http.put(
      `${this.baseUrl}/app-users-reset-password/${id}`,
      reqData
    );
  }

  saveUser(reqData: any) {
    return this.http.post(`${this.baseUrl}/app-users`, reqData);
  }

  updateAppUser(reqData: any, id: any) {
    return this.http.put(`${this.baseUrl}/app-users/${id}`, reqData);
  }
}
