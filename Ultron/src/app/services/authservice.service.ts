import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, VerifyResponse } from '../models/auth.model';

const API_BASE_URL = 'http://localhost:5122';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = API_BASE_URL;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);
    return this.http.post<LoginResponse>(
      `${this.base}/account/login`,
      body,
      { withCredentials: true }
    );
  }

  register(username: string, email: string, phoneNumber: string, password: string) {
    const body = new FormData();
    body.append('username', username);
    body.append('email', email);
    body.append('phoneNumber', phoneNumber);
    body.append('password', password);
    return this.http.post<{ message: string }>(
      `${this.base}/account/register`,
      body
    );
  }

  verify(code: string) {
    const body = new FormData();
    body.append('code', code);
    return this.http.post<VerifyResponse>(
      `${this.base}/account/verify`,
      body,
      { withCredentials: true }
    );
  }

  refresh() {
  return this.http.post<{ token: string }>(
    `${this.base}/account/refresh`,
    {},
    { withCredentials: true }
  );
}

  logout() {
    return this.http.post<{ message: string }>(
      `${this.base}/account/logout`,
      {},
      { withCredentials: true }
    );
  }

  requestPasswordReset(email: string) {
    const body = new FormData();
    body.append('email', email);
    return this.http.post<{ message: string }>(
      `${this.base}/account/password-reset-request`,
      body
    );
  }

  resetPassword(code: string, newPassword: string) {
    const body = new FormData();
    body.append('code', code);
    body.append('newPassword', newPassword);
    return this.http.post<{ message: string }>(
      `${this.base}/account/password-reset`,
      body
    );
  }
}
