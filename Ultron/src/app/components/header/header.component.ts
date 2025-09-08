import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/authservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  loading = true;
  isMenuOpen = false;
  keywords = '';
  private sub!: Subscription;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('[Header] ngOnInit: subscribing to login state');
    this.sub = this.tokenService.isLoggedIn$.subscribe((state) => {
      this.isLoggedIn = state;
      this.loading = false;
      console.log('[Header] Login state:', state);
    });
  }

  ngOnDestroy(): void {
    console.log('[Header] ngOnDestroy');
    this.sub.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('[Header] Menu toggled, isMenuOpen:', this.isMenuOpen);
  }

searchFunc(keywords: string) {
  const trimmed = keywords.trim();
  if (trimmed.length === 0) return;

  // Navigate to landing page with search query
  this.router.navigate(['/'], { queryParams: { q: trimmed } });
}


  logout() {
    console.log('[Header] Logout clicked');
    this.authService.logout().subscribe({
      next: () => {
        console.log('[Header] Logout success, clearing token');
        this.tokenService.removeTokenFromLocalStorage();
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        console.error('[Header] Logout error', err);
        this.tokenService.removeTokenFromLocalStorage();
        this.router.navigate(['/sign-in']);
      },
    });
  }

  debugClick(buttonName: string) {
    console.log('[Header] Button clicked:', buttonName);
  }
}
