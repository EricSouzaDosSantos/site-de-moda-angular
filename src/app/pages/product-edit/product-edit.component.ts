import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  product: Product | null = null;
  isEditMode: boolean = false;
  isLoading: boolean = true;

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
    const routeParams = this.route.snapshot.paramMap;
    const productId = routeParams.get('id');

    if (productId === 'new') {
      this.isEditMode = false;
      this.product = null;
      this.isLoading = false;
    } else if (productId) {
      this.isEditMode = true;
      const id = Number(productId);
      this.loadProduct(id);
    } else {
      this.router.navigate(['/admin/products']);
    }
  }

  private loadProduct(id: number): void {
    setTimeout(() => {
      this.product = this.products.find((p) => p.id === id) || null;
      this.isLoading = false;

      if (!this.product) {
        alert('Produto não encontrado');
        this.router.navigate(['/admin/products']);
      }
    }, 500);
  }

  onProductSave(product: Product): void {
    if (this.isEditMode) {
      console.log('Atualizando produto:', product);

      const index = this.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.products[index] = { ...product };
        alert('Produto atualizado com sucesso');
      }
    } else {
      console.log('Criando novo prodto:', product);

      const newProduct: Product = {
        ...product,
        id: Math.max(...this.products.map((p) => p.id)) + 1,
      };

      this.products.push(newProduct);
      alert('Produto criado com sucesso');
    }

    this.router.navigate(['/admin/products']);
  }

  onCancel(): void {
    if (
      confirm(
        'Deseja realmente cancelr? As alterações não salvas serão peridas.'
      )
    ) {
      this.router.navigate(['/admin/products']);
    }
  }
}
