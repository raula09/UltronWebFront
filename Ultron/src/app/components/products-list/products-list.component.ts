import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @Input() products: Product[] = []; 

  loading = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (!this.products || this.products.length === 0) {
      this.loadProducts();
    } else {
      this.loading = false;
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products || res; 
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error(err?.error || 'Failed to load');
        this.loading = false;
      }
    });
  }

  viewProduct(productId: string) {
    this.router.navigate(['/product-detail', productId]);
  }

  addToCartFunc(productId: string, quantity: number) {
    const token = this.tokenService.getTokenFromLocalStorage();

    if (!token) {
      this.toastr.error('Please sign in first');
      return;
    }

    this.cartService.add(productId, quantity).subscribe({
      next: (res) => {
        this.toastr.success('Added to cart');
      },
      error: (e) => {
        this.toastr.error(e?.error || 'Failed to add');
      }
    });
  }
}
