import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/authservice.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private tokenService: TokenService, private authService: AuthService) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.tokenService.getTokenFromLocalStorage();
  console.log('[AuthInterceptor] Token:', token);

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      withCredentials: true 
    });
  }

  return next.handle(authReq).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401 && token) {
     
        return this.handle401Error(authReq, next);
      }
      return throwError(() => err);
    })
  );
}

  private addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (!token) return req;
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` }, withCredentials: true });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap(res => {
          this.isRefreshing = false;
          this.tokenService.setToken(res.token);
          this.refreshTokenSubject.next(res.token);
          return next.handle(this.addToken(req, res.token));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.tokenService.removeTokenFromLocalStorage();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => next.handle(this.addToken(req, token)))
      );
    }
  }
}
