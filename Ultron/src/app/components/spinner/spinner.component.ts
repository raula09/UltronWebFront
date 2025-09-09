import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule], 
  template: `
    <div *ngIf="show" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0.6);
      z-index: 9999;
    }
    .spinner {
      border: 6px solid #f3f3f3;
      border-top: 6px solid #fff;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  `]
})
export class SpinnerComponent {
  @Input() show = false;
}
