import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { routeAnimations } from './route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent {
  loading = true;

  ngOnInit() {
    setTimeout(() => this.loading = false, 1500);
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
