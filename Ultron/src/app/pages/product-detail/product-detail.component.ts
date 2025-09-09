import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
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
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.productService.getProductById(id).subscribe({
      next: (p: Product) => {
        this.product = p;
        this.selectedImage = p.imageUrl || p.galleryImages?.[0] || null;
    
      },
      error: () => this.toastr.error('Failed to load product')
    });
  }

  selectImage(imgUrl: string) {
    this.selectedImage = imgUrl;
  }

  addToCartFunc(productId: string, quantity: number) {
    if (!this.tokenService.getTokenFromLocalStorage()) {
      this.toastr.error('Please sign in first');
      return;
    }
    this.cartService.add(productId, quantity).subscribe({
      next: () => this.toastr.success('Added to cart'),
      error: () => this.toastr.error('Failed to add')
    });
  }

  buyNow() {
  if (!this.product) return;
  if (!this.tokenService.getTokenFromLocalStorage()) {
    this.toastr.error('Please sign in first');
    return;
  }

  this.cartService.add(this.product.id, 1).subscribe({
    next: () => {
     
      this.cartService.checkout().subscribe({
        next: (res: any) => {
          this.toastr.success('Checkout successful');

          const purchasedIds = res.purchasedItems.map((i: any) => i.productId).join(',');
          this.router.navigate(['/review'], { queryParams: { products: purchasedIds } });
        },
        error: () => this.toastr.error('Checkout failed')
      });
    },
    error: () => this.toastr.error('Failed to add product')
  });
}
}
