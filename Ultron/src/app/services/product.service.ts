import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Product, Review, ReviewPayload } from '../models/product.model';

const API_BASE_URL = 'http://localhost:5122';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private apiUrl = `${API_BASE_URL}/products/all`;
  private reviewApiUrl = `${API_BASE_URL}/api/Reviews`;

  constructor(private http: HttpClient) {}

  getProducts(): void {
    this.http.get<any>(this.apiUrl).pipe(
      tap(res => console.log('API Response:', res)),
      map(res => res.products || res)
    ).subscribe(products => this.productsSubject.next(products));
  }

  // Search products
  searchProducts(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.http.get<any>(this.apiUrl).pipe(
      map(res => (res.products || res).filter((p: Product) => p.name.toLowerCase().includes(lowerQuery)))
    ).subscribe(products => this.productsSubject.next(products));
  }
  getProductById(productId: string) {
    return this.http.get<Product>(`${API_BASE_URL}/products/Id/${productId}`);
  }

  getProductReviews(productId: string) {
    return this.http.get<Review[]>(`${this.reviewApiUrl}/${productId}`);
  }

  submitReview(review: ReviewPayload) {
    const payload = {
      productId: review.productId,
      rating: review.rating
    };
    return this.http.post(this.reviewApiUrl, payload);
  }
}
