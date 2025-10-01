export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  fullDescription?: string;
  specifications?: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
}
