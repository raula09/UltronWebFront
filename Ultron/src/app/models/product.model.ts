export interface Product {
  id: string; // Mongo ObjectId string
  name: string;
  description: string;
  size: string;
  color: string;
  category: string;
  imageUrl?: string | null;
  material: string;
  rating?: number;
  price: number;
  quantity: number;
}