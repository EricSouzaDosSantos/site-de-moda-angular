import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly STORAGE_KEY = 'fashion-store-products';
  private isBrowser: boolean;

  private defaultProducts: Product[] = [
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
      customerReviews: [
        {
          id: 1,
          customerName: 'Maria Silva',
          rating: 5,
          comment:
            'Vestido lindo e muito confortável! O tecido é de ótima qualidade e o caimento é perfeito.',
          date: '2024-09-15',
          verified: true,
        },
        {
          id: 2,
          customerName: 'Ana Santos',
          rating: 4,
          comment:
            'Adorei o vestido, mas achei que poderia ter mais opções de tamanho.',
          date: '2024-09-10',
          verified: true,
        },
        {
          id: 3,
          customerName: 'Julia Costa',
          rating: 5,
          comment: 'Excelente qualidade! Recebi muitos elogios quando usei.',
          date: '2024-09-05',
          verified: false,
        },
      ],
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
      customerReviews: [
        {
          id: 4,
          customerName: 'Carlos Oliveira',
          rating: 4,
          comment: 'Camiseta de boa qualidade, tecido macio e resistente.',
          date: '2024-09-20',
          verified: true,
        },
        {
          id: 5,
          customerName: 'Fernanda Lima',
          rating: 5,
          comment: 'Perfeita! Já comprei várias cores. Recomendo muito!',
          date: '2024-09-18',
          verified: true,
        },
      ],
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
      customerReviews: [
        {
          id: 6,
          customerName: 'Pedro Almeida',
          rating: 5,
          comment:
            'Jaqueta incrível! O estilo vintage é perfeito e a qualidade é excepcional.',
          date: '2024-09-12',
          verified: true,
        },
        {
          id: 7,
          customerName: 'Beatriz Rocha',
          rating: 4,
          comment:
            'Linda jaqueta, mas o preço é um pouco alto. Valeu a pena mesmo assim.',
          date: '2024-09-08',
          verified: false,
        },
      ],
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
      customerReviews: [
        {
          id: 8,
          customerName: 'Sophia Martins',
          rating: 5,
          comment:
            'Bolsa maravilhosa! O couro é de altíssima qualidade e o acabamento é impecável.',
          date: '2024-09-22',
          verified: true,
        },
        {
          id: 9,
          customerName: 'Isabella Ferreira',
          rating: 5,
          comment: 'Produto artesanal único! Superou minhas expectativas.',
          date: '2024-09-14',
          verified: true,
        },
      ],
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // só inicializa/usa localStorage se estivermos no browser
    if (this.isBrowser) {
      this.initializeDefaultProducts();
    }
  }

  private initializeDefaultProducts(): void {
    const existingProducts = this.getProducts();
    if (existingProducts.length === 0) {
      this.saveProducts(this.defaultProducts);
    }
  }

  getProducts(): Product[] {
    if (!this.isBrowser) return [];

    try {
      const products = localStorage.getItem(this.STORAGE_KEY);
      return products ? JSON.parse(products) : [];
    } catch (error) {
      console.error('Erro ao carregar produtos do localStorage:', error);
      return [];
    }
  }

  getProductById(id: number): Product | null {
    const products = this.getProducts();
    return products.find((product) => product.id === id) || null;
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newId = this.generateNewId(products);

    const imageUrl = `https://picsum.photos/400/600?random=${newId}&t=${Date.now()}`;

    const newProduct: Product = {
      ...product,
      id: newId,
      image: imageUrl,
      customerReviews: product.customerReviews || [],
    };

    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  updateProduct(id: number, updatedProduct: Partial<Product>): boolean {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      this.saveProducts(products);
      return true;
    }
    return false;
  }

  deleteProduct(id: number): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter((product) => product.id !== id);

    if (filteredProducts.length !== products.length) {
      this.saveProducts(filteredProducts);
      return true;
    }
    return false;
  }

  deleteMultipleProducts(ids: number[]): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter(
      (product) => !ids.includes(product.id)
    );

    if (filteredProducts.length !== products.length) {
      this.saveProducts(filteredProducts);
      return true;
    }
    return false;
  }

  private saveProducts(products: Product[]): void {
    if (!this.isBrowser) return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Erro ao salvar produtos no localStorage:', error);
    }
  }

  private generateNewId(products: Product[]): number {
    if (products.length === 0) return 1;
    return Math.max(...products.map((p) => p.id)) + 1;
  }

  // Método para buscar produtos com filtros
  searchProducts(searchTerm?: string, category?: string): Product[] {
    const products = this.getProducts();

    if (!searchTerm && !category) {
      return products;
    }

    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !category || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }
}
