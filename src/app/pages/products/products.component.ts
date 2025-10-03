import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ProductTableComponent,
    AdminHeaderComponent,
    ProductModalComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  isModalOpen = false;
  selectedProduct: Product | null = null;
  isEditMode = false;
  filterText = '';

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  onCreateProduct(): void {
    this.selectedProduct = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  onEditProduct(product: Product): void {
    this.selectedProduct = product;
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  onDeleteSelected(): void {
    console.log('Excluir produtos selecionados');
  }

  onSelectAll(isSelected: boolean): void {
    console.log('Selecionar todos:', isSelected);
  }

  onFilterChange(filterText: string): void {
    this.filterText = filterText;
    console.log('Filtro aplicado:', filterText);
  }

  onModalClose(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
    this.isEditMode = false;
  }

  onProductSave(product: Product): void {
    this.loadProducts();
    this.onModalClose();

    console.log(
      this.isEditMode ? 'Produto atualizado:' : 'Produto criado:',
      product
    );
  }
}
