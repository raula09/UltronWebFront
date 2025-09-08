import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const cartGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getTokenFromLocalStorage();
  if (!token) { router.navigate(['/']); return false; }
  return true;
};