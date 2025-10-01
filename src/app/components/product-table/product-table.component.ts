import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
})
export class ProductTableComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Vestido Floral Elegante',
      price: 89.9,
      category: 'Vestuário',
      description: 'Vestido floral com 100% algodão',
      image: 'https://picsum.photos/400/600?random=1',
      fullDescription:
        'Vestido floral elegante confeccionado em 100% algodão de alta qualidade. Perfeito para ocasiões especiais e uso casual. Design moderno com estampa floral delicada.',
      specifications: [
        '100% Algodão',
        'Lavagem à máquina',
        'Tamanhos: P, M, G, GG',
      ],
      stock: 15,
      rating: 4.5,
      reviews: 23,
    },
    {
      id: 2,
      name: 'Camiseta Básica Premium',
      price: 59.9,
      category: 'Vestuário',
      description: 'Camiseta básica preta premium',
      image: 'https://picsum.photos/400/600?random=2',
      fullDescription:
        'Camiseta básica preta premium com tecido de alta qualidade. Essential para qualquer guarda-roupa. Corte moderno e confortável.',
      specifications: [
        '95% Algodão, 5% Elastano',
        'Lavagem à máquina',
        'Tamanhos: P, M, G, GG, XG',
      ],
      stock: 25,
      rating: 4.2,
      reviews: 45,
    },
    {
      id: 3,
      name: 'Jaqueta Jeans Vintage',
      price: 149.9,
      category: 'Vestuário',
      description: 'Jaqueta jeans com estilo vintage',
      image: 'https://picsum.photos/400/600?random=3',
      fullDescription:
        'Jaqueta jeans vintage com lavagem especial e detalhes únicos. Combina perfeitamente com qualquer look casual.',
      specifications: [
        '100% Algodão Denim',
        'Lavagem especial',
        'Tamanhos: P, M, G, GG',
      ],
      stock: 8,
      rating: 4.8,
      reviews: 12,
    },
    {
      id: 4,
      name: 'Bolsa de Couro Artesanal',
      price: 199.9,
      category: 'Acessórios',
      description: 'Bolsa de couro genuíno artesanal',
      image: 'https://picsum.photos/400/600?random=4',
      fullDescription:
        'Bolsa artesanal confeccionada em couro genuíno de alta qualidade. Peça única com acabamento artesanal e design exclusivo.',
      specifications: [
        'Couro Genuíno',
        'Forro em tecido',
        'Dimensões: 30x25x10cm',
      ],
      stock: 5,
      rating: 4.9,
      reviews: 8,
    },
  ];

  constructor(private router: Router) {}

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
