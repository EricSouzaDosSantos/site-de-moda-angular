import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { heroEye } from '@ng-icons/heroicons/outline';
import { mynaEditOne } from '@ng-icons/mynaui/outline';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule, NgIcon],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
  providers: [provideIcons({ heroEye, mynaEditOne })],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() filterText: string = '';
  @Input() isAdminMode: boolean = false;
  @Output() onEditProduct = new EventEmitter<Product>();

  filteredProducts: Product[] = [];
  selectedProducts: Set<number> = new Set();

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] || changes['filterText']) {
      this.applyFilter();
    }
  }

  private loadProducts(): void {
    const productsToUse =
      this.products.length > 0
        ? this.products
        : this.productService.getProducts();
    this.filteredProducts = productsToUse;
    this.applyFilter();
  }

  private applyFilter(): void {
    const productsToFilter =
      this.products.length > 0
        ? this.products
        : this.productService.getProducts();

    if (!this.filterText) {
      this.filteredProducts = productsToFilter;
      return;
    }

    const [searchTerm, category] = this.filterText.split('|');

    this.filteredProducts = this.productService.searchProducts(
      searchTerm,
      category
    );
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  editProduct(product: Product, event: Event): void {
    event.stopPropagation();
    this.onEditProduct.emit(product);
  }

  toggleProductSelection(productId: number): void {
    if (this.selectedProducts.has(productId)) {
      this.selectedProducts.delete(productId);
    } else {
      this.selectedProducts.add(productId);
    }
  }

  isProductSelected(productId: number): boolean {
    return this.selectedProducts.has(productId);
  }
}
