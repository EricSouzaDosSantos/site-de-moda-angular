import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-modal',
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() product: Product | null = null;
  @Input() isEditMode: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Product>();

  @ViewChild(ProductFormComponent) productForm!: ProductFormComponent;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen && this.productForm) {
      if (this.isEditMode && this.product) {
        this.productForm.loadProduct(this.product);
      } else {
        this.productForm.resetForm();
      }
    }
  }

  closeModal(): void {
    this.onClose.emit();
  }

  onFormSave(product: Product): void {
    this.onSave.emit(product);
    this.closeModal();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Editar Produto' : 'Cadastrar Novo Produto';
  }
}
