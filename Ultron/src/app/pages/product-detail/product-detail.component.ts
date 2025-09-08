import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.productService.getProductById(id).subscribe({ next: p => { this.product = p;  this.selectedImage = p.mainImageUrl; }, error: _ => this.toastr.error('Failed to load product') });
  }

  addToCartFunc(productId: string, quantity: number) {
    if (!this.tokenService.getTokenFromLocalStorage()) { this.toastr.error('Please sign in first'); return; }
    this.cartService.add(productId, quantity).subscribe({ next: _ => this.toastr.success('Added to cart'), error: _ => this.toastr.error('Failed to add') });
  }
}