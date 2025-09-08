import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { tap as rxjsTap } from 'rxjs/operators';

const API_BASE_URL = 'http://localhost:5122';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public ProductsByCategory: any;
  public products: any;

  private apiUrl = `${API_BASE_URL}/products/all`;
  private cartApiUrl = `${API_BASE_URL}/api/Cart`;

  constructor(private http: HttpClient) {}

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/products/${productId}`);
  }

  getFilteredProducts(categoryId: string | null, brand: string | null) {
    let url = `${API_BASE_URL}/api/Product/Search?page_size=50&page_index=1`;
    if (categoryId) url += `&category_id=${categoryId}`;
    if (brand) url += `&brand=${brand}`;

    this.http.get<any>(url).subscribe(
      (data) => { this.products = data.products; },
      (error) => { console.log(error); }
    );
  }

  getProductByBrand(brand: string) {
    const url = `${API_BASE_URL}/api/Product/Search?page_size=50&page_index=1&brand=${brand}`;
    return this.http.get<any>(url).subscribe(
      (data) => { this.products = data.products; },
      (error) => { console.log(error); }
    );
  }

  getProductByCategory(categoryId: string) {
    return this.http.get<any>(
      `${API_BASE_URL}/api/Product/Search?page_size=50&page_index=1&category_id=${categoryId}`
    );
  }

  getProducts(page_size?: number, page_index?: number): Observable<any> {
    let url = this.apiUrl;
    if (page_size !== undefined && page_index !== undefined) {
      url += `?page_size=${page_size}&page_index=${page_index}`;
    }
    return this.http.get<any>(url).pipe(rxjsTap((response) => console.log('API Response:', response)));
  }

}
