import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private tokenKey = 'accessToken';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private hasToken(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(this.tokenKey);
  }

  getTokenFromLocalStorage(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      this._isLoggedIn$.next(true);
    }
  }

  removeTokenFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      this._isLoggedIn$.next(false);
    }
  }

  getUserId(): string | null {
    const token = this.getTokenFromLocalStorage();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return (
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null
      );
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getTokenFromLocalStorage();
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp; // in seconds
      if (!exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return true;
    }
  }
}
