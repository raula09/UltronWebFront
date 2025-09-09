import { Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { TokenService } from '../../services/token.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() products: Product[] | null = null;
  @Input() selfLoad = false;

  loading = true;
  private sub!: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
   
    this.sub = this.productService.products$.subscribe(products => {
      this.products = products;
      this.loading = false;
    });

    if (this.selfLoad) {
      this.loadProducts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && !this.selfLoad) {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  private loadProducts(): void {
    this.loading = true;
    this.productService.getProducts();
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
      next: () => this.toastr.success('Added to cart'),
      error: e => this.toastr.error(e?.error || 'Failed to add')
    });
  }
}
