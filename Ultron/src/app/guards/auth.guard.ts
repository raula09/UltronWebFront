import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const protectedRouteGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.getTokenFromLocalStorage()) {
    return true; // <-- User is logged in, ALLOW access
  }

  // User is not logged in, redirect to login page
  router.navigate(['/login']);
  return false;
};