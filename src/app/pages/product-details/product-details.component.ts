import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  selectedSize: string = '';
  quantity: number = 1;

  // Simular dados de produtos (em uma aplicação real, isso viria de um serviço)
  private products: Product[] = [
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find((p) => p.id === productId) || null;

    if (!this.product) {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  addToCart(): void {
    if (this.product) {
      console.log(
        `Adicionado ao carrinho: ${this.product.name}, Tamanho: ${this.selectedSize}, Quantidade: ${this.quantity}`
      );
      // Aqui você implementaria a lógica para adicionar ao carrinho
      alert(`${this.product.name} adicionado ao carrinho!`);
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock!) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
