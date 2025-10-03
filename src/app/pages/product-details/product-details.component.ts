import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Product, Review } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(productId);

    if (!this.product) {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.location.back();
  }

  addToCart(): void {
    if (this.product) {
      console.log(
        `Adicionado ao carrinho: ${this.product.name}, Tamanho: ${this.selectedSize}, Quantidade: ${this.quantity}`
      );
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

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars: string[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }

    if (hasHalfStar) {
      stars.push('half');
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }

    return stars;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
