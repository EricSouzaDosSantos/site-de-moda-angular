export interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

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
  customerReviews?: Review[];
}
