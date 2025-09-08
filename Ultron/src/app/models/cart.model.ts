export interface CartItemDto {
  productId: string;
  quantity: number;
}

export interface CartDto {
  userId: string;
  items: CartItemDto[];
}