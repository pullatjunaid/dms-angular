import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://127.0.0.1:8000/api';

  login(data: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  doSignup() {
    return this.http.post(`${this.baseUrl}/register-user`, {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: 'admin123',
      password_confirmation: 'admin123',
    });
  }

  logout() {
    return this.http.get(`${this.baseUrl}/logout`);
  }
}
