import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/authservice.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class EmailVerificationComponent {
  code = '';

  constructor(private auth: AuthService, private tokens: TokenService, private router: Router, private toast: ToastrService) {}

  onSubmit() {
    this.auth.verify(this.code).subscribe({
      next: (res) => { this.tokens.setToken(res.token); this.toast.success('Verification successful'); this.router.navigate(['/verify-email']); },
      error: _ => this.toast.error('Invalid code')
    });
  }
}
