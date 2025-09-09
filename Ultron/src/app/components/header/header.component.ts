import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/authservice.service';
import { ProductService } from '../../services/product.service';

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
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.sub = this.tokenService.isLoggedIn$.subscribe(state => {
      this.isLoggedIn = state;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  searchFunc(keywords: string) {
    const trimmed = keywords.trim();

    if (!trimmed) {
      // Empty input → return all products
      this.productService.getProducts();
    } else {
      // Search by keyword
      this.productService.searchProducts(trimmed);
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.tokenService.removeTokenFromLocalStorage();
        this.router.navigate(['/sign-in']);
      },
      error: () => {
        this.tokenService.removeTokenFromLocalStorage();
        this.router.navigate(['/sign-in']);
      },
    });
  }

  debugClick(buttonName: string) {
    console.log('[Header] Button clicked:', buttonName);
  }
}
