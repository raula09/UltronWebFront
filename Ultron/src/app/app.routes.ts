import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EmailVerificationComponent } from './components/verify-email/verify-email.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { cartGuard } from './guards/cart.guard';
import {  protectedRouteGuard } from './guards/auth.guard';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'cart', component: CartPageComponent, canActivate: [cartGuard] },
{ path: 'products', component: ProductsListComponent },
  // Public pages
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: 'verify-email', component: EmailVerificationComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  // Protected pages


  { path: '**', redirectTo: '' },
];
