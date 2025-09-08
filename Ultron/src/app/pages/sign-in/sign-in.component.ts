import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/authservice.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private tokens: TokenService,
    private router: Router,
    private toast: ToastrService
  ) {}

  onSubmit() {
    console.log('[SignIn] Submitting login', { email: this.email, password: this.password });

this.auth.login(this.email, this.password).subscribe({
  next: (res) => {
    console.log('[SignIn] Token received:', res.token); // Should include "Bearer "
    this.tokens.setToken(res.token); // store as-is
    this.toast.success('Signed in');
    this.router.navigate(['/']);
  },
  error: (e) => {
    console.error('[SignIn] Login failed', e);
    this.toast.error(e?.error || 'Sign in failed');
  }
});
  }
}
