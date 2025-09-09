import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/authservice.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  orders: any[] = [];
  loading = true;
  showOrders = false; 

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getTokenFromLocalStorage();
    if (!token) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user = res.user;
       this.orders = (res.orders || []).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        this.loading = false;
      },
      error: () => {
        this.router.navigate(['/sign-in']);
      }
    });
  }

  toggleOrders() {
    this.showOrders = !this.showOrders;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.tokenService.removeTokenFromLocalStorage();
        this.router.navigate(['/sign-in']);
      },
      error: () => {
        this.tokenService.removeTokenFromLocalStorage();
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
