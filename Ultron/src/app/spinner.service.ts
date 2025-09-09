import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({ providedIn: 'root' })
export class GlobalSpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  show() {
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }
}
