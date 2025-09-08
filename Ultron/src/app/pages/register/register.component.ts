import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/authservice.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  phoneNumber = '';

  constructor(private auth: AuthService, private toast: ToastrService, private router: Router) {}

  registerFunc() {
    if (!this.username || !this.email || !this.password || !this.phoneNumber) {
      this.toast.error('Please fill in all fields');
      return;
    }

    this.auth.register(this.username, this.email, this.phoneNumber, this.password)
      .subscribe({
        next: () => {
          this.toast.success('Registration successful! Please verify your email.');
          this.router.navigate(['/verify-email']);
        },
        error: (e) => this.toast.error(e?.error || 'Registration failed')
      });
  }
}
