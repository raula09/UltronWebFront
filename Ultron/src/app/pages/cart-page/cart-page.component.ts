import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  userProducts: (Product & { quantity: number })[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private products: ProductService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    this.cartService.get().subscribe({
      next: (cart) => {
        if (!cart.items?.length) {
          this.userProducts = [];
          this.total = 0;
          return;
        }

        Promise.all(cart.items.map(async ci => {
          const p = await this.products.getProductById(ci.productId).toPromise();
          return { ...(p as Product), quantity: ci.quantity };
        })).then(list => {
          this.userProducts = list;
          this.calculateTotal();
        });
      },
      error: () => this.toastr.error('Failed to load cart')
    });
  }

  increase(item: any) {
    item.quantity++;
    this.updateQuantity(item);
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    } else {
      item.quantity = 0;
      this.updateQuantity(item);
    }
  }

  private updateQuantity(item: any) {
    this.cartService.add(item.id, item.quantity).subscribe({
      next: () => this.calculateTotal(),
      error: () => this.toastr.error('Failed to update quantity')
    });
  }

  remove(item: any) {
    this.cartService.add(item.id, 0).subscribe({
      next: () => this.loadCart(),
      error: () => this.toastr.error('Failed to remove item')
    });
  }

  clearCart() {
    this.cartService.clear().subscribe({
      next: () => {
        this.userProducts = [];
        this.total = 0;
      },
      error: () => this.toastr.error('Failed to clear cart')
    });
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: (res: any) => {
        this.toastr.success('Checkout successful');
        const purchasedIds = res.purchasedItems.map((i: any) => i.productId).join(',');
        this.router.navigate(['/review'], { queryParams: { products: purchasedIds } });
        this.userProducts = [];
        this.total = 0;
      },
      error: () => this.toastr.error('Checkout failed')
    });
  }

  private calculateTotal() {
    this.total = this.userProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }
}
