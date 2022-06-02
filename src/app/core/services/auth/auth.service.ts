import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://127.0.0.1:8000/api';
  public isLoggedIn = !!localStorage.getItem('api_token');

  doSignup() {
    return this.http.post(`${this.baseUrl}/register-user`, {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: 'admin123',
      password_confirmation: 'admin123',
    });
  }

  getAccessToken() {
    return localStorage.getItem('api_token');
  }

  isAdmin() {
    let userDetails;
    userDetails = localStorage.getItem('userDetails');
    const parsedData = JSON.parse(userDetails ? userDetails : '');
    if (parsedData?.user_type === 'administrator') return true;
    else return false;
  }

  login(data: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  logout() {
    return this.http.get(`${this.baseUrl}/logout`);
  }
}
