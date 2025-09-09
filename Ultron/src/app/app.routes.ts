import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EmailVerificationComponent } from './components/verify-email/verify-email.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { cartGuard } from './guards/cart.guard';
import { protectedRouteGuard } from './guards/auth.guard';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent, data: { animation: 'HomePage', renderMode: 'client' } },
  { path: 'products', component: ProductsListComponent, data: { animation: 'ProductsPage', renderMode: 'client' } },
  { path: 'product-detail/:id', component: ProductDetailComponent, data: { animation: 'ProductDetailPage', renderMode: 'client' } }, // client-only
  { path: 'cart', component: CartPageComponent, canActivate: [cartGuard], data: { animation: 'CartPage', renderMode: 'client' } },
  { path: 'review', component: ReviewPageComponent, canActivate: [protectedRouteGuard], data: { animation: 'ReviewPage', renderMode: 'client' } },
  { path: 'sign-in', component: SignInComponent, data: { animation: 'SignInPage', renderMode: 'client' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'RegisterPage', renderMode: 'client' } },
  { path: 'verify-email', component: EmailVerificationComponent, data: { animation: 'VerifyEmailPage', renderMode: 'client' } },

  { 
    path: 'profile', 
    loadComponent: () => import('./pages/user-profile/user-profile.component').then(m => m.UserProfileComponent),
    canActivate: [protectedRouteGuard],
    data: { animation: 'ProfilePage', renderMode: 'client' }
  },

  { path: '**', redirectTo: '', data: { renderMode: 'client' } },
];

