import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartDto, CartItemDto } from '../models/cart.model';

const API_BASE_URL = 'http://localhost:5122';

@Injectable({ providedIn: 'root' })
export class CartService {
  private base = API_BASE_URL;

  constructor(private http: HttpClient) {}

  /** Add an item to the cart */
  add(productId: string, quantity: number) {
    const body: CartItemDto = { productId, quantity };
    return this.http.post<{ message: string; cart: CartDto }>(
      `${this.base}/api/Cart/add`,
      body
      
    );
  }

  /** Get the current cart */
  get() {
    return this.http.get<CartDto>(`${this.base}/api/Cart`);
  }

  /** Checkout the cart */
  checkout() {
    return this.http.post<{ message: string; purchasedItems: any[] }>(
      `${this.base}/api/Cart/checkout`,
      {}
    );
  }

  /** Clear the cart */
  clear() {
    return this.http.delete<{ message: string }>(`${this.base}/api/Cart`);
  }
}
