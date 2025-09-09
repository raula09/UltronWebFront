import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { ReviewPayload } from '../../models/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ReviewPageComponent implements OnInit {
  reviews: ReviewPayload[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
     private router: Router
  ) {}

  ngOnInit(): void {
    const productsParam = this.route.snapshot.queryParamMap.get('products') || '';
    const productIds = productsParam.split(',').map(id => id.trim()).filter(id => id);

    if (!productIds.length) {
      this.toastr.error('No products to review');
      return;
    }

    this.reviews = productIds.map(id => ({ productId: id, rating: 5 }));
  }

  submitReviews() {
  let completed = 0;
  this.reviews.forEach(r => {
    this.productService.submitReview(r).subscribe({
      next: () => {
        this.toastr.success(`Review submitted for product ${r.productId}`);
        completed++;

  
        if (completed === this.reviews.length) {
          this.router.navigate(['/']); 
        }
      },
      error: err => {
        console.error('Error response:', err);
        this.toastr.error(`Failed to submit review for ${r.productId}`);
      }
    });
  });
}

}
