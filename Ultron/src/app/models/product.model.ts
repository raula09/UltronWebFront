export interface Product {
  id: string;
  name: string;
  description: string;
  size: string;
  color: string;
  category: string;
  imageUrl?: string | null;
  galleryImages?: string[];  
  material: string;
  rating?: number;
  price: number;
  quantity: number;
    reviews?: Review[];
}
export interface Review {
  id?: string;         
  productId: string;
  rating: number;     
  userName?: string;   
  createdAt?: string | Date; 
}
export interface ReviewPayload {
  productId: string;
  rating: number; 
}